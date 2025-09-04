import { operations } from "./operations.js";

function sum(...num: number[]): number {
  return num.reduce((acc, cur) => acc + cur, 0);
}

function average(...num: number[]): number {
  return sum(...num) / num.length;
}

function multiplication(...num: number[]): number {
  return num.reduce((acc, cur) => acc * cur, 1);
}

let array = [1, 2, 3, 4, 5, 45];

// console.log(...array) //1 2 3 4 5
console.log(sum(...array));
console.log(average(...array));
console.log(multiplication(...array));
