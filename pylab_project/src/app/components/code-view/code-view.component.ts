import { Component, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit, inject, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import * as monaco from 'monaco-editor';
import { StructureFactory } from '../../classes/structure-factory';
import { CodeService } from '../../services/code.service';
import { NullStructure } from '../../classes/structure-null';
import { IfStructure } from '../../classes/structure-if';
import { ElseStructure } from '../../classes/structure-else';

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
  private variables: any = {};
  private ifArray:IfStructure[] = []

  constructor(private codeService: CodeService) { }

  ngAfterViewInit(): void {
    this.initEditor();
    this.codeService.highlightLine.subscribe(async (value)=> {
      this.highlightLine = Number(value);
      this.updateDecorations();
    });
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
        this.editor.setValue(this.code);
      }
    }
  }

  private executeCodeUpToLine(lineNumber: number): void {
    const codeUpToLine = this.code.split('\n').slice(0, lineNumber).join('\n');
    //const variables = this.simulateExecution(codeUpToLine);
    //this.variablesChanged.emit(variables);
  }

  // simulateExecution(code: string): any {
  //   const lines = code.split('\n');
  //   const variables: any = {};
  
  //   lines.forEach(line => {
  //     const variableDeclaration = line.match(/(\w+)\s*=\s*(.+)/);
  //     if (variableDeclaration) {
  //       const varName = variableDeclaration[1];
  //       const varValue = variableDeclaration[2];
  //       try {
  //         const evalContext = { ...variables }; // Copy current variables to evaluation context
  //         const evaluatedValue = new Function('context', `with(context) { return ${varValue}; }`)(evalContext);
  //         variables[varName] = evaluatedValue;
  //       } catch (e) {
  //         // Handle any errors in evaluation
  //         variables[varName] = varValue; // Fallback to the raw value if evaluation fails
  //       }
  //     }
  //   });
  
  //   return variables;
  // }
  

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
      const structure = StructureFactory.analize(lineContent, INITIAL_LEVEL, this.codeService, this.variables);
      if (structure instanceof IfStructure) {
        this.ifArray.push(structure)
      }
      if(structure instanceof ElseStructure){
        let foundIf = null
        if(foundIf = this.ifArray.find((ifStruct) =>(ifStruct.level == structure.level && ifStruct.entersElse == false))){
          //se tiene que sacar del array esa estructura
          this.ifArray.splice(this.ifArray.indexOf(foundIf))
          structure.entersElse = false;
          structure.execute();
        }
      }
      if (structure instanceof NullStructure) {
        const variableDeclaration = lineContent.match(/(\w+)\s*=\s*(.+)/);
        if (variableDeclaration) {
          const varName = variableDeclaration[1];
          const varValue = variableDeclaration[2];
          this.variables[varName] = varValue;
        }
      }
      const linesInRange = model.getValueInRange(new monaco.Range(this.highlightLine, 1, this.code.length, 1));
      structure.setScope(linesInRange)
      structure.execute();
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
