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
    takeUntil(this.unsubscriber),
    switchMap(secondsLeft =>
      interval(1000)
      .pipe(
        map(currentSecond => secondsLeft - currentSecond)
      )
    )
  ).subscribe(currentSeconds => {
    this.currentSecondsLeft = currentSeconds;
  });
    
  }

    ngOnDestroy() {
    this.unsubscriber.complete();
  }

}
