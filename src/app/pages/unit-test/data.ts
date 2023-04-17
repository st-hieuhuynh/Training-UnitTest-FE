import { createLogger } from 'redux-logger';

export const isArrIncrease = (arr: any) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return false;
  }
  for (let i = 0; i < arr.length - 1; i++){
    if (typeof arr[i] !== 'number' || Number.isNaN(arr[i])) {
      return false;
    }
    if (arr[i+1] < arr[i]) {
      return false;
    }
  }
  return true;
};
