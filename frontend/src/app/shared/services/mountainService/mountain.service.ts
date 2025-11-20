import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Mountain, MountainPayload } from '../../Models/mountain.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MountainService {

  private baseUrl = `${environment.apiUrl}/mountains`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mountain[]> {
    return this.http.get<Mountain[]>(this.baseUrl);
  }

  getById(id: number): Observable<Mountain> {
    return this.http.get<Mountain>(`${this.baseUrl}/${id}`);
  }

  create(payload: MountainPayload): Observable<Mountain> {
    return this.http.post<Mountain>(this.baseUrl, payload);
  }

  update(id: number, payload: MountainPayload): Observable<Mountain> {
    return this.http.put<Mountain>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
