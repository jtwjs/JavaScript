'use strict';

 function game(arr) {
     const hangul = '영일이삼사오육칠팔구십';
     const read = arr.map( (num) => {

        //  if(num > 10)  {
        //      return hangul[parseInt(num/10)] + hangul[num%10];
        //  }

         if(num % 3 === 0) {
             return '짝';
             
         }

         return hangul[num];
     });
     return read.join(',');
}
