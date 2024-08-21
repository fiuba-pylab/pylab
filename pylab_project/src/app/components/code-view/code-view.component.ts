import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import * as monaco from 'monaco-editor';
import { StructureFactory } from '../../classes/structure-factory';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  imports: [MatIcon],
  standalone: true
})
export class CodeViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() code: string = '';
  @Input() language: string = 'python';
  @Output() variablesChanged = new EventEmitter<any>();
  private highlightLine: number = 0;
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
    
    this.updateDecorations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editor) {
      if (changes['code']) {
        this.editor.setValue(this.code);
      }
    }
    /* if (this.editor && changes['highlightLine']) {
      if (this.decorationsCollection) {
        this.updateDecorations();
        this.executeCodeUpToLine(this.highlightLine);
      }
    } */
  }

  private executeCodeUpToLine(lineNumber: number): void {
    const codeUpToLine = this.code.split('\n').slice(0, lineNumber).join('\n');
    const variables = this.simulateExecution(codeUpToLine);
    this.variablesChanged.emit(variables);
  }

  simulateExecution(code: string): any {
    const lines = code.split('\n');
    const variables: any = {};
  
    lines.forEach(line => {
      const variableDeclaration = line.match(/(\w+)\s*=\s*(.+)/);
      if (variableDeclaration) {
        const varName = variableDeclaration[1];
        const varValue = variableDeclaration[2];
        try {
          const evalContext = { ...variables }; // Copy current variables to evaluation context
          const evaluatedValue = new Function('context', `with(context) { return ${varValue}; }`)(evalContext);
          variables[varName] = evaluatedValue;
        } catch (e) {
          // Handle any errors in evaluation
          variables[varName] = varValue; // Fallback to the raw value if evaluation fails
        }
      }
    });
  
    return variables;
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
    if (this.highlightLine !== null && this.highlightLine < this.code.length) {
      this.highlightLine = this.highlightLine + 1;
    } else {
      this.highlightLine = 1;
    }
    if (this.decorationsCollection) {
      this.updateDecorations();
      this.executeCodeUpToLine(this.highlightLine);
      this.analizeLine();
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
      this.executeCodeUpToLine(this.highlightLine);
      this.analizeLine();
    }
  }

  analizeLine(){
    const model = this.editor?.getModel(); 
    if (model) {
      const lineContent = model.getLineContent(this.highlightLine);
      const structure = StructureFactory.analize(lineContent);
      
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
