import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url: string = "https://localhost:7006/api/Product/Upload";

  constructor(private _client: HttpClient) { }

  upload(filesToUpload: File[]): Observable<string> {
    const formData: FormData = new FormData();
    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('files', filesToUpload[i], filesToUpload[i].name);
    }
    return this._client.post(this.url, formData, { responseType: 'text' });
  }
}