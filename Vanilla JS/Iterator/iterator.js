class FibonacciSequence {
  [Symbol.iterator]() {
    let a = 0,
      b = 1;
    return {
      next() {
        let rval = { value: b, done: false };
        b += a;
        a = rval.value;
        return rval;
      },
    };
  }
}

//for...of루프로 FibonacciSequence 인스턴스를 계산하면 무한 루프에 빠짐
const fib = new FibonacciSequence();
let i = 0;
for (let n of fib) {
  console.log(n);
  if (++i > 9) break;
}
