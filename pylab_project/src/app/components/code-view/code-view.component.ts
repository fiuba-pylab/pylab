import { Component, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as monaco from 'monaco-editor';
import { CodeService } from '../../services/code.service';
import { Coordinator } from '../../classes/coordinator';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.scss'],
  imports:[MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, MatIcon],
  standalone: true
})
export class CodeViewComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {

  @Input() code: string = '';
  @Input() language: string = 'python';
  @Input() inputs:any = []
  @Input() highlightLine: number = 0;
  @Output() variablesChanged = new EventEmitter<any>();
  forms:any = []
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;
  private coordinator: any = null;

  constructor(private codeService: CodeService) { }

  ngAfterViewInit(): void { 
    this.initEditor();
    this.codeService.highlightLine.subscribe(async (value)=> {
      this.highlightLine = Number(value);
      this.updateDecorations();
    });
  }

  ngOnInit():void{
    for(let select of this.inputs){
      this.forms.push({name:select.name, form:new FormControl('')})
    }
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
      language: this.language,
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
    if (this.decorationsCollection) {
      this.coordinator.execute();
    }    
  }

  previousLine() {
    if (this.highlightLine == 1) {
      return
    }

    if (this.highlightLine !== null) {
      this.highlightLine = this.highlightLine - 1;
    }
    if (this.decorationsCollection) {
      this.updateDecorations();
      this.coordinator.execute();
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
