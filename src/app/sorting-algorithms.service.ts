import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingAlgorithmsService {
  constructor() {}
  animations = [];

  public performSort(input: any[], sortType: string): any[] {
    this.animations = [];
    input.reverse();
    switch (sortType) {
      case 'bubble':
        this.getBubbleSortAnimations(input);
        break;

      case 'merge':
        this.getMergeSortAnimations(input);
        break;

      default:
        break;
    }
    return this.animations;
  }

  public getBubbleSortAnimations(input: any[]) {
    // reverse is done to balance out the earlier reverse.
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

  public getMergeSortAnimations(input: any[]) {
    input.reverse();
    // var animation = [];
    this.mergeSort(input, 0, input.length - 1);
    console.log(this.animations);
  }

  private mergeSort(input: any[], left: number, right: number) {
    if (right <= left) {
      return;
    }
    let middle = Math.floor((left + right) / 2);
    this.mergeSort(input, left, middle);
    this.mergeSort(input, middle + 1, right);

    let leftSubArr = input.slice(left, middle + 1),
      rightSubArr = input.slice(middle + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftSubArr.length && j < rightSubArr.length) {
      // console.log('compare ' + leftSubArr[i] + ' with ' + rightSubArr[j]);
      console.log('compare ' + (left + i) + ' with ' + (middle + 1 + j));
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + j];
      if (leftSubArr[i] <= rightSubArr[j]) {
        console.log('at index: ' + k + ' added : ' + leftSubArr[i]);
        // animation_object['post_compare'][k] = leftSubArr[i];
        input[k] = leftSubArr[i];
        i++;
      } else {
        console.log('at index: ' + k + ' added : ' + rightSubArr[j]);
        animation_object['swapped'] = true;
        animation_object['post_compare'] = {};
        animation_object['post_compare'][k] = rightSubArr[j];
        input[k] = rightSubArr[j];
        j++;
      }
      this.animations.push(animation_object);
      k++;
    }

    while (i < leftSubArr.length) {
      console.log(
        'at index: ' + k + ' just value added from left : ' + leftSubArr[i]
      );
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + j];
      animation_object['swapped'] = true;
      animation_object['post_compare'] = {};
      animation_object['post_compare'][k] = leftSubArr[i];
      input[k] = leftSubArr[i];
      this.animations.push(animation_object);
      i++;
      k++;
    }

    while (j < rightSubArr.length) {
      console.log(
        'at index: ' + k + ' just value added from right : ' + rightSubArr[j]
      );
      let animation_object = {};
      animation_object['compared'] = [left + i, middle + j];
      animation_object['swapped'] = true;
      animation_object['post_compare'] = {};
      animation_object['post_compare'][k] = rightSubArr[j];
      input[k] = rightSubArr[j];
      this.animations.push(animation_object);
      j++;
      k++;
    }
  }
}

// // first layer
// animation.push({
//   compared: [0, 1],
//   post_compare: { 0: 10, 1: 50 },
//   swapped: true,
// });
// animation.push({
//   compared: [1, 2],
//   post_compare: { 1: 50, 2: 80 },
//   swapped: false,
// });
// animation.push({
//   compared: [2, 3],
//   post_compare: { 2: 20, 3: 80 },
//   swapped: true,
// });
// animation.push({
//   compared: [3, 4],
//   post_compare: { 3: 40, 4: 80 },
//   swapped: true,
//   finalized: 4,
// });

// // second layer
// animation.push({
//   compared: [0, 1],
//   post_compare: { 0: 10, 1: 50 },
//   swapped: false,
// });
// animation.push({
//   compared: [1, 2],
//   post_compare: { 1: 20, 2: 50 },
//   swapped: true,
// });
// animation.push({
//   compared: [2, 3],
//   post_compare: { 2: 40, 3: 50 },
//   swapped: true,
//   finalized: 3,
// });

// // third layer
// animation.push({
//   compared: [0, 1],
//   post_compare: { 0: 10, 1: 20 },
//   swapped: false,
// });
// animation.push({
//   compared: [1, 2],
//   post_compare: { 1: 20, 2: 40 },
//   swapped: false,
//   finalized: 2,
// });
