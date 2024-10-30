import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { Program } from '../../classes/program';
import { Function } from '../../classes/function';
import { lastValueFrom } from 'rxjs';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-function-info',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule, SpinnerComponent],
  templateUrl: './function-info.component.html',
  styleUrl: './function-info.component.scss'
})
export class FunctionInfoComponent implements OnInit {
  functionObject: string = "";
  functionName: string = "";
  loadingInfo: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private fileService: FileService) { }

  async ngOnInit() {
    this.functionName = this.route.snapshot.paramMap.get('function') ?? "";
    await this.LoadInfo();
  }

  async LoadInfo() {
    this.loadingInfo = true;
    try {
        this.functionObject = await lastValueFrom(this.fileService.getInfo(this.functionName));
    } catch (error) {
        console.log('Error loading files:', error);
    } finally {
        this.loadingInfo = false;
    }
}

  async openPythonDocumentation() {

  }
}
