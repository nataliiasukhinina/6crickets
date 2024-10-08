import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Specs {
  distanceRange: { 0: number; 1: number };
  lightLevelRange: { 0: number; 1: number };
}

interface HardwareCamera {
  name: string;
  specs: Specs;
}

@Component({
  selector: 'app-software-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-camera.component.html',
  styleUrl: './software-camera.component.scss',
})
export class SoftwareCameraComponent implements OnInit {
  camerasThatWork: HardwareCamera[] = [];
  camerasThatDoNotWork: HardwareCamera[] = [];
  desiredCharacteristics: Specs = {
    distanceRange: [100, 50000],
    lightLevelRange: [7, 15],
  };

  hardwareCameras: HardwareCamera[] = [
    {
      name: 'Camera 1',
      specs: {
        distanceRange: [50, 10000],
        lightLevelRange: [2, 15],
      },
    },
    {
      name: 'Camera 2',
      specs: {
        distanceRange: [70, 60000],
        lightLevelRange: [6, 20],
      },
    },
    {
      name: 'Camera 3',
      specs: {
        distanceRange: [150, 100000],
        lightLevelRange: [10, 25],
      },
    },
    {
      name: 'Camera 4',
      specs: {
        distanceRange: [80, 10000],
        lightLevelRange: [5, 12],
      },
    },
    {
      name: 'Camera 5',
      specs: {
        distanceRange: [50, 70000],
        lightLevelRange: [2, 20],
      },
    },
    {
      name: 'Camera 6',
      specs: {
        distanceRange: [170, 80000],
        lightLevelRange: [9, 17],
      },
    },
  ];

  ngOnInit(): void {
    this.cameraCheck(this.desiredCharacteristics);
  }

  cameraCheck(specs: Specs) {
    for (let hardwareCamera of this.hardwareCameras) {
      if (
        this.areNumbersInRange(
          specs.distanceRange[0],
          specs.distanceRange[1],
          hardwareCamera.specs.distanceRange[0],
          hardwareCamera.specs.distanceRange[1]
        ) &&
        this.areNumbersInRange(
          specs.lightLevelRange[0],
          specs.lightLevelRange[1],
          hardwareCamera.specs.lightLevelRange[0],
          hardwareCamera.specs.lightLevelRange[1]
        )
      ) {
        this.camerasThatWork.push(hardwareCamera);
      } else {
        this.camerasThatDoNotWork.push(hardwareCamera);
      }
    }
  }

  private areNumbersInRange(
    num1: number,
    num2: number,
    min: number,
    max: number
  ): boolean {
    return num1 >= min && num1 <= max && num2 >= min && num2 <= max;
  }
}
