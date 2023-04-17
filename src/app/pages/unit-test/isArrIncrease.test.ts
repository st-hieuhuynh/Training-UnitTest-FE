import { describe, expect, test } from '@jest/globals';
import { isArrIncrease } from './data';

describe('test function isArrayIncrease', () => {

  describe('input is not a array', () => {
    test('input is null', () => {
      expect(isArrIncrease(null)).toBe(false);
    });
    test('input is undefined', () => {
      expect(isArrIncrease(undefined)).toBe(false);
    });
    test('input is NaN', () => {
      expect(isArrIncrease(NaN)).toBe(false);
    });
    test('input is number', () => {
      expect(isArrIncrease(1)).toBe(false);
    });
    test('input is string', () => {
      expect(isArrIncrease('1')).toBe(false);
    });
    test('input is boolean', () => {
      expect(isArrIncrease(true)).toBe(false);
    });
    test('input is object', () => {
      expect(isArrIncrease({})).toBe(false);
    });
    test('input is function', () => {
      expect(isArrIncrease(() => {})).toBe(false);
    });
  });

  describe('input is array with non-number items', () => {
    test('input is empty array', () => {
      expect(isArrIncrease([])).toBe(false);
    });
    test('input have null item', () => {
      expect(isArrIncrease([1, null, 7, 9, 11])).toBe(false);
    });
    test('input have undefined item', () => {
      expect(isArrIncrease([1, undefined, 7, 9, 11])).toBe(false);
    });
    test('input have NaN item', () => {
      expect(isArrIncrease([1, NaN, 7, 9, 11])).toBe(false);
    });
    test('input have string item', () => {
      expect(isArrIncrease([1, 'abc', 7, 9, 11])).toBe(false);
    });
    test('input have number as string item', () => {
      expect(isArrIncrease([1, '7', 9, 10, 99])).toBe(false);
    });
    test('input have boolean true item', () => {
      expect(isArrIncrease([1, true, 5, 7, 9])).toBe(false);
    });
    test('input have boolean false item', () => {
      expect(isArrIncrease([1, false, 5, 7, 9])).toBe(false);
    });
    test('input have object item', () => {
      expect(isArrIncrease([1, {}, 7, 9, 11])).toBe(false);
    });
    test('input have function item', () => {
      expect(isArrIncrease([1, () => {}, 7, 9, 11])).toBe(false);
    });
    test('input have array item', () => {
      expect(isArrIncrease([1, [], 7, 9, 11])).toBe(false);
    });
    test('input have object and function item', () => {
      expect(isArrIncrease([1, {}, () => {}, 7, 9, 11])).toBe(false);
    });
  });

  describe('input is number array', () => {
    test('input is negative increase number', () => {
      expect(isArrIncrease([-5, -3, -2, -1])).toBe(true);
    });
    test('input is negative decrease number', () => {
      expect(isArrIncrease([-1, -2, -3, -5])).toBe(false);
    });
    test('input is positive increase number', () => {
      expect(isArrIncrease([1, 2, 3, 5])).toBe(true);
    });
    test('input is positive decrease number', () => {
      expect(isArrIncrease([5, 3, 2, 1])).toBe(false);
    });
    test('input is float increase number', () => {
      expect(isArrIncrease([0.5, 3.5, 4.9, 5.1, 5.1000001])).toBe(true);
    });
    test('input is float decrease number', () => {
      expect(isArrIncrease([5.1000001, 5.1, 3.5, 3, 2.5])).toBe(false);
    });
    test('input is have mixed increase number', () => {
      expect(isArrIncrease([-0.5, 3, 5, 5.1, 5.1000001])).toBe(true);
    });
    test('input is have mixed decrease number', () => {
      expect(isArrIncrease([5.1000001, 5.1, 3.5, 3, 2.5])).toBe(false);
    });
  });
});
