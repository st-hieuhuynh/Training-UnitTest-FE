import { describe, expect, test } from '@jest/globals';
import { isArrIncrease } from './data';

describe('test function isArrayIncrease', () => {
  test('array null', () => {
    expect(isArrIncrease([])).toBeTruthy();
  });
  test('array with element value decrease', () => {
    expect(isArrIncrease([5, 4, 3, 2, 1])).toBeFalsy();
  });
  test('array with elements arranged large and small alternately ', () => {
    expect(isArrIncrease([2, 3, 6, 5])).toBeFalsy();
  });
  test('array only one elements', () => {
    expect(isArrIncrease([1])).toBeTruthy();
  });
  test('array of elements with the same value', () => {
    expect(isArrIncrease([2, 2, 2, 2])).toBeTruthy();
  });
  test('array have one elements same value', () => {
    expect(isArrIncrease([1, 2, 2, 3, 4, 4, 5])).toBeTruthy();
  });
  test('array with element value increase', () => {
    expect(isArrIncrease([1, 2, 3, 4, 5])).toBeTruthy();
  });
});
