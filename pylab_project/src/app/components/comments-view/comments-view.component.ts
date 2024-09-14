import { Component } from '@angular/core';
import { CodeService } from '../../services/code.service';
import { FileService } from '../../services/file.service';
@Component({
  selector: 'app-comments-view',
  standalone: true,
  imports: [],
  templateUrl: './comments-view.component.html',
  styleUrl: './comments-view.component.css'
})
export class CommentsViewComponent {
  private links: { [key: string]: string } = {
    'if': 'https://www.w3schools.com/python/python_conditions.asp',
  };
  structure: string = '';
  link: string = '';
  constructor(private codeService: CodeService, private fileService: FileService) { }

  ngOnInit(): void {
    this.codeService.comment.subscribe((value: string) => {
      this.structure = value;
      this.link = this.links[value];
    });
  }
}
