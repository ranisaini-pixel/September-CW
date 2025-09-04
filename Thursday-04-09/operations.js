function sum() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return num.reduce(function (acc, cur) { return acc + cur; }, 0);
}
function average() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return sum.apply(void 0, num) / num.length;
}
function multiplication() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return num.reduce(function (acc, cur) { return acc * cur; }, 1);
}
var array = [1, 2, 3, 4, 5, 45];
// console.log(...array) //1 2 3 4 5
console.log(sum.apply(void 0, array));
console.log(average.apply(void 0, array));
console.log(multiplication.apply(void 0, array));
