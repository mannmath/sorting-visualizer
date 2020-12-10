import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SortingAlgorithmsService } from '../sorting-algorithms.service';

// how many elements should be drawn in the array
// changes with respect to the view-port width
var length_of_array = Math.round(0.05344070278 * window.innerWidth);
// the unit from which height of array elements will start
const START_HEIGHT_OF_ARRAY_ELEM = 10;
// the capping height of array elements
const MAX_HEIGHT_OF_ARRAY_ELEM = 75;
// initial color of elements
const INITIAL_COLOR = 'turquoise';
// color when comparing two elements
const COMPARISON_COLOR = 'red';
// color when two elements are swapped after comparison
const SWAP_COLOR = 'green';
// color when the position of an element in finalized
const FINALIZED_POSITION_COLOR = 'violet';

@Component({
  selector: 'app-visualizer-component',
  templateUrl: './visualizer-component.component.html',
  styleUrls: ['./visualizer-component.component.css'],
})
export class VisualizerComponentComponent implements OnInit {
  _targetArray = [];
  constructor(
    public breakpointObserver: BreakpointObserver,
    private animator: SortingAlgorithmsService
  ) {}

  public setTargetArray(array: any[]) {
    this._targetArray = array;
  }
  public getTargetArray(): any[] {
    return this._targetArray;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    var widthInPixels: number = event.target.innerWidth;
    length_of_array = Math.round(0.05344070278 * widthInPixels);
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
    const array: any[] = [50, 10, 80, 20, 40];
    // const array: any[] = [];
    // for (let index = 0; index < LENGTH_OF_ARRAY; index++) {
    //   const element = getRandomizedHeight(
    //     START_HEIGHT_OF_ARRAY_ELEM,
    //     MAX_HEIGHT_OF_ARRAY_ELEM
    //   );
    //   array.push(element);
    // }
    // reverse is done because our visualizer is 180 rotated.
    array.reverse();
    this.setTargetArray(array);
  }

  public performBubbleSort(): void {
    let animations: any[] = this.animator.getbubbleSortAnimations(
      this._targetArray
    );
    for (const animation of animations) {
      // first highlight the currently compared elements
      for (const index of animation.compared) {
        this.findAndColorElement(index, COMPARISON_COLOR);
      }
      if (animation.swapped) {
        for (const index of Object.keys(animation.post_compare)) {
          console.log(animation.post_compare[parseInt(index)]);
          setTimeout(() => {
            this.findAndReHeightElement(
              parseInt(index),
              animation.post_compare[parseInt(index)]
            );
          }, 1000);
        }
      }
    }
  }

  private findAndColorElement(index: number, target_color: string) {
    let targetDiv = <HTMLDivElement>document.getElementById(index.toString());
    if (targetDiv != null) {
      targetDiv.style.backgroundColor = target_color;
    }
  }

  private findAndReHeightElement(index: number, target_height: number) {
    let targetDiv = <HTMLDivElement>document.getElementById(index.toString());
    if (targetDiv != null) {
      targetDiv.style.height = target_height.toString() + 'vh';
    }
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
