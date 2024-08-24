import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  imports:[MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
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

  constructor() { }

  ngOnInit():void{
    for(let select of this.inputs){
      this.forms.push({name:select.name, form:new FormControl('')})
    }
  }

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
    if (this.editor && changes['highlightLine']) {
      if (this.decorationsCollection) {
        this.updateDecorations();
        this.executeCodeUpToLine(this.highlightLine);
      }
    }
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

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
