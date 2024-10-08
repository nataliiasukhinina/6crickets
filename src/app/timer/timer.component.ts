import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from './timer.service';
import { interval, map, mergeMap, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  providers: [ TimerService ]
})
export class TimerComponent implements OnInit, OnDestroy {

  currentSecondsLeft!: number;
  private unsubscriber = new Subject();

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
  this.timerService.getSecondsLeftMock().pipe(
    // Uncubscribe when component is destroyed
    takeUntil(this.unsubscriber),
    // Cancel first subscription with switchMap: the deadline is already received and it is not going to change
    switchMap(response =>
      // Create a new observable that will update currentSeconds each second
      interval(1000)
      .pipe(
        map(currentSecond => response.secondsLeft - currentSecond)
      )
    )
  ).subscribe(currentSeconds => {
    // Subscribe to update currentSecondsLeft
    this.currentSecondsLeft = currentSeconds;
  });
    
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

}
