import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TimerService } from './timer.service';
import {
  catchError,
  EMPTY,
  interval,
  map,
  mergeMap,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  providers: [TimerService],
})
export class TimerComponent implements OnInit, OnDestroy {
  currentSecondsLeft = signal<number>(0);
  private unsubscriber = new Subject();
  loading = false;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.loading = true;
    this.timerService
      .getSecondsLeftMock()
      .pipe(
        // Uncubscribe when component is destroyed
        takeUntil(this.unsubscriber),
        catchError(() => {
          this.loading = false;
          return EMPTY;
        }),
        // Cancel first subscription with switchMap: the deadline is already received and it is not going to change
        switchMap((response) =>
          // Create a new observable that will update currentSeconds each second
          interval(1000).pipe(
            map((currentSecond) => {
              this.loading = false;
              return response.secondsLeft - currentSecond;
            })
          )
        )
      )
      .subscribe((currentSeconds) => {
        // Subscribe to update currentSecondsLeft
        this.currentSecondsLeft.set(currentSeconds);
      });
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }
}
