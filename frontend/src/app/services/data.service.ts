import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost/RAITE_GC_1/backend/"

  private subject = new Subject<any>()

  sendUpdate(message: string) {
    this.subject.next({ text: message })
  }

  getUpdate(): Observable<any> {
    return this.subject.asObservable()
  }

  sendFileRequest(method: any, formData: FormData) {
    return <any>(
      this.http.post(this.baseUrl + method, formData)
    )
  }

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.baseUrl + method, btoa(JSON.stringify(data)))
    )
  }
}
