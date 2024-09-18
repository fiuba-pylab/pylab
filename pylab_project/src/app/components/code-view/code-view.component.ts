import { Component, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit, AfterViewInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as monaco from 'monaco-editor';
import { CodeService } from '../../services/code.service';
import { Coordinator } from '../../classes/coordinator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

const LANGUAGE = 'python';
@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss'],
  imports:[MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, MatIcon, MatButtonModule, MatMenuModule, ],
  standalone: true
})
export class CodeViewComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() code: string = '';
  @Input() inputs: any = []
  highlightLine: number = 0;
  forms:any = []
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;
  private coordinator: any = null;

  velocities = [0.5, 1, 2];
  velocity = 1;
  mode = 'manual';
  isRunning: boolean = false;
  isPaused: boolean = false;
  isFinished: boolean = false; // TODO
  intervalId: any = null;
  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  constructor(private codeService: CodeService, private dialog: MatDialog) { }

  ngOnInit():void{
    if(!this.inputs) return;
    for(let select of this.inputs){
      this.forms.push({name:select.name, form:new FormControl('')})
    }
  }

  ngAfterViewInit(): void { 
    this.initEditor();
    this.codeService.highlightLine.subscribe(async (value)=> {
      this.highlightLine = Number(value);
      this.updateDecorations();
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor) {
      if (changes['code']) {
        this.codeService.setLength(this.code.length);
        this.coordinator = new Coordinator(this.codeService, this.code);
        this.editor.setValue(this.code);
        this.updateDecorations();
      }
    }
  }

  private initEditor(): void {
    this.editor = monaco.editor.create(document.getElementById('editor-container')!, {
      value: this.code,
      theme: 'vs-dark',
      language: LANGUAGE,
      readOnly: true,
      tabSize: 4,
      insertSpaces: false,
      minimap: { enabled: false }
    });
    
    this.decorationsCollection = this.editor.createDecorationsCollection();
  }

  private updateDecorations(): void {
    if (this.editor && this.decorationsCollection) {          
      const newDecorations = this.highlightLine !== null ? [{
        range: new monaco.Range(this.highlightLine, 1, this.highlightLine, 1),
        options: {
          isWholeLine: true,
          inlineClassName: 'selected-line'
        }
      }] : [];
      this.decorationsCollection.clear()      
      this.decorationsCollection.set(newDecorations)
    }    
  }

  nextLine() {
    if (this.decorationsCollection && this.coordinator) {
      this.coordinator.execute();
    }    
  }

  previousLine() {
    if (this.decorationsCollection && this.coordinator) {
      this.coordinator.execute(true);
    }
  }

  setVelocity(level: any) {
    this.velocity = level;
  }

  play(){
    if (this.isPaused) {
      this.isPaused = false;
    } else if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        if (!this.isPaused) {
          this.nextLine();
        }
      }, 1000/this.velocity); 
    }
  }

  pause(){
    this.isPaused = true;
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
