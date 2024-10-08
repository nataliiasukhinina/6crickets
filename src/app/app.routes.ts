import { Routes } from '@angular/router';
import { TimerComponent } from './timer/timer.component';
import { SoftwareCameraComponent } from './software-camera/software-camera.component';

export const routes: Routes = [
  { path: 'timer', component: TimerComponent },
  { path: 'software-camera', component: SoftwareCameraComponent },
];
