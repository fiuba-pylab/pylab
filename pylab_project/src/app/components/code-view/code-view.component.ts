import { Component, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, OnInit, inject, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as monaco from 'monaco-editor';
import { StructureFactory } from '../../classes/structure-factory';
import { CodeService } from '../../services/code.service';
import { NullStructure } from '../../classes/structure-null';
import { IfStructure } from '../../classes/structure-if';

const INITIAL_LEVEL = 1;

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css'],
  imports: [MatIcon, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
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
  @Input() inputs:any = []
  forms:any = []

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private decorationsCollection: monaco.editor.IEditorDecorationsCollection | null = null;
  private variables: any = {};
  private ifArray:IfStructure[] = []

  constructor(private codeService: CodeService) { }


  ngOnInit():void{
    if(this.inputs)
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
        this.codeService.setLength(this.code.split('\n').length);
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

    /* if (this.highlightLine !== null) {
      this.highlightLine = this.highlightLine - 1;
    } */
    if (this.decorationsCollection) {
      /* this.updateDecorations();
      this.executeCodeUpToLine(this.highlightLine); */
      this.analizeLine(true);
    }
  }

  analizeLine(isPrevious:boolean = false){
    const model = this.editor?.getModel(); 
    if (model) {
      const lineContent = model.getLineContent(this.highlightLine);
      const structure = StructureFactory.analize(lineContent, INITIAL_LEVEL, this.codeService, this.variables);
      if (structure instanceof IfStructure) {
        let foundIf = null
        
        //si encuentra una estructura if anterior del mismo nivel-> significa que no tiene un else asociado y lo reemplaza en el array 
        if(foundIf= this.ifArray.find((ifStruct) =>(
          ifStruct.level == structure.level && ifStruct.category == 'if' && structure.category == 'if'))){

          this.ifArray.splice(this.ifArray.indexOf(foundIf), 1)
          this.ifArray.push(structure)
        // si es una estructura if o elif -> puede tener un else asociado y lo agrega en el array
        } else if(structure.category == 'if' || structure.category == 'elif') {
          this.ifArray.push(structure)
        }
        
      }
      if(structure instanceof IfStructure && (structure.category == 'else' || ( structure.category == 'elif'))){
        let foundIf = null
        //si hay ifs del mismo nivel en el array significa que pueden estar asociados a este else.
        //si se ejecutó el if asociado -> saltea este else
        if(foundIf = this.ifArray.find((ifStruct) =>(ifStruct.level == structure.level && ifStruct.entersElse == false))){
          //se tiene que sacar del array esa estructura
          this.ifArray.splice(this.ifArray.indexOf(foundIf), 1)
          structure.entersElse = false;
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
      structure.execute(isPrevious);
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
