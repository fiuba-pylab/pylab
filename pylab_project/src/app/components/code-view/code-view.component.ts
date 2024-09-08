import { Component, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit, inject, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import * as monaco from 'monaco-editor';
import { StructureFactory } from '../../classes/structure-factory';
import { CodeService } from '../../services/code.service';
import { NullStructure } from '../../classes/structure-null';
import { Coordinator } from '../../classes/coordinator';

const INITIAL_LEVEL = 1;

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  imports: [MatIcon],
  providers: [
    CodeService,
  ],
  standalone: true
})
export class CodeViewComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'python';
  @Output() variablesChanged = new EventEmitter<any>();
  private highlightLine: number = 0;
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;
  private coordinator: any = null;

  constructor(private codeService: CodeService) { }

  ngAfterViewInit(): void { 
    this.codeService.highlightLine.subscribe(async (value)=> {
      this.highlightLine = Number(value);
      this.updateDecorations();
    });
    this.initEditor();
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
