import * as _ from 'lodash'; //lodash 라이브러리

const original = { a : {b: 2}};

let copy = _.cloneDeep(original);
copy.a.b = 100;
console.log(original.a.b);