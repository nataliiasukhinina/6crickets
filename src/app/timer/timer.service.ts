import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TimerService {

  constructor(private http: HttpClient) {}

  getSecondsLeft(): Observable<number> {
    return this.http.get<number>('/api/deadline');
  }

  getSecondsLeftMock(): Observable<number> {
    return of(20000);
  }
}
