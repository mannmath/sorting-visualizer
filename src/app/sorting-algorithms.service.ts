import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingAlgorithmsService {
  constructor() {}

  public getbubbleSortAnimations(input: any[]) {
    // reverse is done to balance out the earlier reverse.
    input.reverse();
    var animation = [];
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
        animation.push(animation_object);
      }
      if (!isSwapped) {
        break;
      }
    }
    return animation;
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
