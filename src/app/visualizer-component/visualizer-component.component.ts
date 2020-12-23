import { Component, HostListener, OnInit } from '@angular/core';
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
// control animation speed (in millis)
const ANIMATION_SPEED = 500;

@Component({
  selector: 'app-visualizer-component',
  templateUrl: './visualizer-component.component.html',
  styleUrls: ['./visualizer-component.component.css'],
})
export class VisualizerComponentComponent implements OnInit {
  _targetArray = [];
  _sortInProgress = false;
  _isSorted = false;
  constructor(private animator: SortingAlgorithmsService) {}

  public setTargetArray(array: any[]) {
    this._targetArray = array;
  }
  public getTargetArray(): any[] {
    return this._targetArray;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (!this._sortInProgress) {
      var widthInPixels: number = event.target.innerWidth;
      length_of_array = Math.round(0.05344070278 * widthInPixels);
      this.randomizeAndDrawArray();
    }
  }

  ngOnInit(): void {
    this.randomizeAndDrawArray();
  }

  public randomizeAndDrawArray(): void {
    this._isSorted = false;
    this.disableOrEnableButtonsDuringSort('enable');

    // const array: any[] = [50, 10, 80, 20, 40];
    const array: any[] = [];
    for (let index = 0; index < length_of_array; index++) {
      const element = getRandomizedHeight(
        START_HEIGHT_OF_ARRAY_ELEM,
        MAX_HEIGHT_OF_ARRAY_ELEM
      );
      array.push(element);
    }

    // reverse is done because our visualizer is 180 rotated.
    array.reverse();
    this.setTargetArray(array);
    // some of the bars were still purple after randomizing array.
    for (let index = 0; index < this._targetArray.length; index++) {
      this.findAndColorElement(index, INITIAL_COLOR);
    }
  }

  public performSort(sortType: string): void {
    if (this._isSorted) {
      return;
    }
    this._sortInProgress = true;
    let animations: any[] = this.animator.performSort(
      [...this._targetArray],
      sortType
    );
    this.disableOrEnableButtonsDuringSort('disable');
    let timeMultiplier = 1;
    for (const animation of animations) {
      // first highlight the currently compared elements
      setTimeout(() => {
        for (const index of animation.compared) {
          this.findAndColorElement(index, COMPARISON_COLOR);
        }
      }, ANIMATION_SPEED * timeMultiplier);

      // perform swapping animation only if a swap was done in the first place.
      if (animation.swapped) {
        setTimeout(() => {
          for (const index of Object.keys(animation.post_compare)) {
            this.findAndRescaleElement(
              parseInt(index),
              animation.post_compare[parseInt(index)]
            );
            this.findAndColorElement(parseInt(index), SWAP_COLOR);
          }
        }, ANIMATION_SPEED * timeMultiplier + ANIMATION_SPEED / 2);
      }

      // reset bars to the initial color after swap check
      setTimeout(() => {
        for (const index of animation.compared) {
          this.findAndColorElement(index, INITIAL_COLOR);
        }
        if (animation.swapped) {
          for (const index of Object.keys(animation.post_compare)) {
            this.findAndColorElement(parseInt(index), INITIAL_COLOR);
          }
        }
      }, ANIMATION_SPEED * timeMultiplier + ANIMATION_SPEED / 1.4285);

      // animate finalized element if any
      if (animation.finalized != undefined) {
        setTimeout(() => {
          this.findAndColorElement(
            animation.finalized,
            FINALIZED_POSITION_COLOR
          );
        }, ANIMATION_SPEED * timeMultiplier + ANIMATION_SPEED / 1.4285);
      }
      timeMultiplier += 1;
    }

    // animate remaining indices as finalized, as sorting is now finished.
    setTimeout(() => {
      for (let index = 0; index < this._targetArray.length; index++) {
        this.findAndColorElement(index, FINALIZED_POSITION_COLOR);
      }
      this._isSorted = true;
      this.disableOrEnableButtonsDuringSort('enable');
      this._sortInProgress = false;
    }, ANIMATION_SPEED * timeMultiplier + ANIMATION_SPEED / 1.25);
  }

  private findAndColorElement(index: number, target_color: string) {
    let targetDiv = <HTMLDivElement>document.getElementById(index.toString());
    if (targetDiv != null) {
      targetDiv.style.backgroundColor = target_color;
    }
  }

  private findAndRescaleElement(index: number, target_height: number) {
    let targetDiv = <HTMLDivElement>document.getElementById(index.toString());
    if (targetDiv != null) {
      targetDiv.style.height = target_height.toString() + 'vh';
    }
  }

  private disableOrEnableButtonsDuringSort(action: string) {
    let randomizeButton = <HTMLButtonElement>(
      document.getElementById('randomize-array')
    );
    let mergeSortButton = <HTMLButtonElement>(
      document.getElementById('mergesort-button')
    );
    let bubbleSortButton = <HTMLButtonElement>(
      document.getElementById('bubblesort-button')
    );
    let selectionSortButton = <HTMLButtonElement>(
      document.getElementById('selectionsort-button')
    );
    // TODO: add other buttons here
    if (action == 'disable') {
      randomizeButton.disabled = true;
      mergeSortButton.disabled = true;
      bubbleSortButton.disabled = true;
      selectionSortButton.disabled = true;
    } else {
      if (!this._isSorted) {
        mergeSortButton.disabled = false;
        bubbleSortButton.disabled = false;
        selectionSortButton.disabled = false;
      }
      randomizeButton.disabled = false;
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
