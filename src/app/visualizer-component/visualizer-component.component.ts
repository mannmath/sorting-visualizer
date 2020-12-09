import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// how many elements should be drawn in the array
var LENGTH_OF_ARRAY = Math.round(0.05344070278 * window.innerWidth);
// the unit from which height of array elements will start
const START_HEIGHT_OF_ARRAY_ELEM = 10;
// the capping height of array elements
const MAX_HEIGHT_OF_ARRAY_ELEM = 75;

@Component({
  selector: 'app-visualizer-component',
  templateUrl: './visualizer-component.component.html',
  styleUrls: ['./visualizer-component.component.css'],
})
export class VisualizerComponentComponent implements OnInit {
  _targetArray = [];
  constructor(public breakpointObserver: BreakpointObserver) {}

  public setTargetArray(array: any[]) {
    this._targetArray = array;
  }
  public getTargetArray(): any[] {
    return this._targetArray;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    var widthInPixels: number = event.target.innerWidth;
    LENGTH_OF_ARRAY = Math.round(0.05344070278 * widthInPixels);
    this.randomizeAndDrawArray();
  }

  ngOnInit(): void {
    // console.log(window.innerWidth);
    // this.breakpointObserver
    //   .observe(['(min-width: 400px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       document.body.style.backgroundColor = 'yellow';
    //     } else {
    //       document.body.style.backgroundColor = 'purple';
    //     }
    //   });
    this.randomizeAndDrawArray();
  }

  public randomizeAndDrawArray(): void {
    const array: any[] = [];
    for (let index = 0; index < LENGTH_OF_ARRAY; index++) {
      const element = getRandomizedHeight(
        START_HEIGHT_OF_ARRAY_ELEM,
        MAX_HEIGHT_OF_ARRAY_ELEM
      );
      array.push(element);
    }
    this.setTargetArray(array);
  }
}

function getRandomizedHeight(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

// function myFunction(x) {
//   if (x.matches) {
//     // If media query matches
//     LENGTH_OF_ARRAY = 50;
//     new VisualizerComponentComponent().randomizeAndDrawArray();
//   }
// }

// var x = window.matchMedia('(max-width: 1010px)');
// myFunction(x); // Call listener function at run time
// x.addListener(myFunction); // Attach listener function on state changes
