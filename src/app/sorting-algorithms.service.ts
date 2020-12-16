import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingAlgorithmsService {
  constructor() {}

  public getbubbleSortAnimations([]: any) {
    var animation = [];

    for (let index = 0; index < animation.length; index++) {
      // const element = array[index];
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
