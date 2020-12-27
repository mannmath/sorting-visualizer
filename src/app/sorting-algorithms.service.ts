import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingAlgorithmsService {
  constructor() {}
  animations = [];

  public performSort(input: any[], sortType: string): any[] {
    this.animations = [];
    // reverse is done to balance out the earlier reverse.
    input.reverse();
    switch (sortType) {
      case 'bubble':
        this.getBubbleSortAnimations(input);
        break;

      case 'merge':
        this.getMergeSortAnimations(input);
        break;

      case 'selection':
        this.getSelectionSortAnimations(input);
        break;

      case 'quick':
        this.getQuickSortAnimations(input);
        break;

      default:
        break;
    }
    return this.animations;
  }
  getQuickSortAnimations(input: any[]) {
    this.quickSort(input, 0, input.length - 1);
  }

  quickSort(input: any[], start: number, end: number) {
    if (start >= end) {
      return;
    }
    // In quick sort, we make an index pivot and try to find its position.
    let pivotIndex = this.findPivot(input, start, end);

    this.quickSort(input, start, pivotIndex - 1);
    this.quickSort(input, pivotIndex + 1, end);
  }

  findPivot(input: any[], start: number, end: number) {
    let pivot = input[end];
    let positionPointer = start - 1;
    for (let j = start; j < end; j++) {
      let animation_object = {};
      animation_object['compared'] = [end, j];
      if (input[j] < pivot) {
        positionPointer++;

        // store animations before the actual swap occurs
        animation_object['swapped'] = true;
        animation_object['post_compare'] = {};
        animation_object['post_compare'][positionPointer] = input[j];
        animation_object['post_compare'][j] = input[positionPointer];

        let temp = input[positionPointer];
        input[positionPointer] = input[j];
        input[j] = temp;
      }
      this.animations.push(animation_object);
    }
    // add the animation
    let animation_object = {};
    animation_object['compared'] = [end, positionPointer + 1];
    animation_object['swapped'] = true;
    animation_object['post_compare'] = {};
    animation_object['post_compare'][positionPointer + 1] = input[end];
    animation_object['post_compare'][end] = input[positionPointer + 1];
    animation_object['finalized'] = positionPointer + 1;
    this.animations.push(animation_object);

    // At this point, ptr should be pointing to the actual position of pivot element.
    let temp = input[positionPointer + 1];
    input[positionPointer + 1] = input[end];
    input[end] = temp;

    return positionPointer + 1;
  }

  getSelectionSortAnimations(input: any[]) {
    for (let i = 0; i < input.length; i++) {
      let minIdx = i;
      let minFound = false;
      for (let j = i + 1; j < input.length; j++) {
        let animation_object = {};
        animation_object['compared'] = [minIdx, j];
        if (input[minIdx] > input[j]) {
          minIdx = j;
          minFound = true;
        }
        this.animations.push(animation_object);
      }
      if (minFound) {
        let animation_object = {};
        animation_object['compared'] = [minIdx, i];
        animation_object['swapped'] = true;
        animation_object['post_compare'] = {};
        animation_object['post_compare'][minIdx] = input[i];
        animation_object['post_compare'][i] = input[minIdx];
        let temp = input[minIdx];
        input[minIdx] = input[i];
        input[i] = temp;
        animation_object['finalized'] = i;
        this.animations.push(animation_object);
      }
    }
  }

  private getBubbleSortAnimations(input: any[]) {
    var isSwapped: boolean = false;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length - i - 1; j++) {
        var animation_object = {};
        var compared = false;
        animation_object['compared'] = [j, j + 1];
        if (input[j] > input[j + 1]) {
          isSwapped = compared = true;
          let temp = input[j];
          input[j] = input[j + 1];
          input[j + 1] = temp;
        }
        animation_object['swapped'] = compared;
        if (compared) {
          animation_object['post_compare'] = {};
          animation_object['post_compare'][j] = input[j];
          animation_object['post_compare'][j + 1] = input[j + 1];
        }
        // when j is at its last step, means the next value is already finalized.
        if (j == input.length - i - 2) {
          animation_object['finalized'] = input.length - i - 1;
        }
        this.animations.push(animation_object);
      }
      if (!isSwapped) {
        break;
      }
    }
  }

  private getMergeSortAnimations(input: any[]) {
    this.mergeSort(input, 0, input.length - 1, 0, input.length - 1);
  }

  private mergeSort(
    input: any[],
    left: number,
    right: number,
    initial: number,
    final: number
  ) {
    if (right <= left) {
      return;
    }
    let middle = Math.floor((left + right) / 2);
    this.mergeSort(input, left, middle, initial, final);
    this.mergeSort(input, middle + 1, right, initial, final);

    let leftSubArr = input.slice(left, middle + 1),
      rightSubArr = input.slice(middle + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftSubArr.length && j < rightSubArr.length) {
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + 1 + j];
      animation_object['swapped'] = true;
      animation_object['post_compare'] = {};
      if (leftSubArr[i] <= rightSubArr[j]) {
        animation_object['post_compare'][k] = leftSubArr[i];
        input[k] = leftSubArr[i];
        i++;
      } else {
        animation_object['post_compare'][k] = rightSubArr[j];
        input[k] = rightSubArr[j];
        j++;
      }
      if (left == initial && right == final) {
        animation_object['finalized'] = k;
      }
      this.animations.push(animation_object);
      k++;
    }

    while (i < leftSubArr.length) {
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + 1 + j];
      animation_object['swapped'] = true;
      animation_object['post_compare'] = {};
      animation_object['post_compare'][k] = leftSubArr[i];
      if (left == initial && right == final) {
        animation_object['finalized'] = k;
      }
      input[k] = leftSubArr[i];
      this.animations.push(animation_object);
      i++;
      k++;
    }

    while (j < rightSubArr.length) {
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + 1 + j];
      animation_object['swapped'] = true;
      animation_object['post_compare'] = {};
      animation_object['post_compare'][k] = rightSubArr[j];
      if (left == initial && right == final) {
        animation_object['finalized'] = k;
      }
      input[k] = rightSubArr[j];
      this.animations.push(animation_object);
      j++;
      k++;
    }
  }
}
