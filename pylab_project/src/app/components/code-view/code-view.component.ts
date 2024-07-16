import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  standalone: true
})
export class CodeViewComponent implements AfterViewInit, OnChanges {
  @Input() code: string = ''; 
  @Input() language: string = 'python'; 
  @Input() highlightLine: number | null = null; 
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.editor = monaco.editor.create(document.getElementById('editor-container')!, {
      value: this.code,
      language: this.language,
      readOnly: true,
      minimap: { enabled: false }
    });

    this.decorationsCollection = this.editor.createDecorationsCollection();
    this.updateDecorations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor && changes['highlightLine']) {
      this.updateDecorations();
    }
  }

  private updateDecorations(): void {
    console.log("code line: "+ this.highlightLine);
    
    if (this.editor && this.decorationsCollection) {
      const newDecorations = this.highlightLine !== null ? [{
        range: new monaco.Range(this.highlightLine, 1, this.highlightLine, 1),
        options: {
          isWholeLine: true,
          className: 'myLineDecoration'
        }
      }] : [];

      this.decorationsCollection.set(newDecorations);    
    }
  }
}
