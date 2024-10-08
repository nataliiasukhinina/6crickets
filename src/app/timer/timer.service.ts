import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Deadline {
  secondsLeft: number;
}

@Injectable()
export class TimerService {

  constructor(private http: HttpClient) {}

  // How http request would have been created
  getSecondsLeft(): Observable<Deadline> {
    return this.http.get<Deadline>('/api/deadline');
  }

  // Using mock to get the seconds left until deadline
  getSecondsLeftMock(): Observable<Deadline> {
    return of({ secondsLeft: 20000});
  }
}
