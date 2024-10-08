import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareCameraComponent } from './software-camera.component';

describe('SoftwareCameraComponent', () => {
  let component: SoftwareCameraComponent;
  let fixture: ComponentFixture<SoftwareCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareCameraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
