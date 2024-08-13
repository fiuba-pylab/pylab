import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-variable-view',
  standalone: true,
  imports: [],
  templateUrl: './variable-view.component.html',
  styleUrl: './variable-view.component.css'
})
export class VariableViewComponent {
  @Input() variables: any = {};
  variableKeys: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variables']) {
      this.variableKeys = Object.keys(this.variables);
    }
  }
}
