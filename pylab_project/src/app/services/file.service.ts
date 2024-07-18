import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private filesUrl = 'assets/programas';

  constructor(private http: HttpClient) { }

  getFileNames(folderName: string): Observable<Object> {
    const folderUrl = `${this.filesUrl}/${folderName}`;    
    return this.http.get(folderUrl, { responseType: 'json' });
  }

  readFile(folderName: string, fileName: string): Observable<string> {
    const fileUrl = `${this.filesUrl}/${folderName}/${fileName}`;
    return this.http.get(fileUrl, { responseType: 'text' });
  }
}
