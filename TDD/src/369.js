'use strict';

class NotNumberError extends Error {
    constructor() {
      super('숫자가 아닌 값이 포함되어 있습니다.');
      this.name = 'NotNumberError';
    }
  }

class NotArrayError extends Error {
    constructor() {
      super('배열이 아닙니다.');
      this.name = 'NotArrayError';
    }
  }

 function game(arr) {
    if (!Array.isArray(arr)) {
        throw new NotArrayError();
      }
    
      if (arr.some((num) => typeof num !== 'number')) {
        throw new NotNumberError();
      }

     return arr
        .map( (num) => {
            const str = String(num).replace(/[^369]/g, '');
            if(/[369]/.test(str)) {
                return '짝'.repeat(str.length);
            }

         return num;
     })
      .join(',');
}
