'use strict';

 function game(arr) {
     const hangul = '영일이삼사오육칠팔구십';
     const read = arr.map( (num) => {

        if(num>10) {
            if(parseInt(num/10) === 1) {
                if((num%10) % 3 === 0) return '짝';
                return hangul[10] + hangul[num%10];
            }

            if(parseInt(num/10) % 3 === 0) {
                if(num%10 % 3 === 0 && num%10 !== 0) return '짝짝';
                return '짝';
            }

            return hangul[parseInt(num/10)] + hangul[10] + hangul[num%10];
        }

         if(num % 3 === 0) {
             return '짝';
             
         }

         return hangul[num];
     });
     return read.join(',');
}
