import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  standalone: true
})
export class CodeViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() code: string = '';
  @Input() language: string = 'python';
  @Input() highlightLine: number | null = null;
  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;

  constructor() { }

  ngAfterViewInit(): void {    
    this.initEditor();
  }

  private initEditor(): void {
    this.editor = monaco.editor.create(document.getElementById('editor-container')!, {
      value: this.code,
      theme: 'vs-dark',
      language: this.language,
      readOnly: true,
      minimap: { enabled: false }
    });

    this.decorationsCollection = this.editor.createDecorationsCollection();
    console.log("decor init: "+this.decorationsCollection);
    
    this.updateDecorations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor && changes['highlightLine']) {
      console.log("entro a change");
      
      if (this.decorationsCollection) {
        this.updateDecorations();
      }
    }
  }

  private updateDecorations(): void {
    if (this.editor && this.decorationsCollection) {
      console.log("entro a update");
      console.log("code: "+this.highlightLine);
      
      const newDecorations = this.highlightLine !== null ? [{
        range: new monaco.Range(this.highlightLine, 1, this.highlightLine, 1),
        options: {
          isWholeLine: true,
          inlineClassName: 'selected-line'
        }
      }] : [];
      console.log(newDecorations);
      this.decorationsCollection.clear()
      this.decorationsCollection.set(newDecorations)
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
