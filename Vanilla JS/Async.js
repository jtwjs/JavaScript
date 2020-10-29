/* Callback Hell
function getRandomNumber(min = 0, callback) {
    const seconds = Math.random() * 100;
    setTimeout( () => {
        callback(Math.floor(Math.random() * 10 + min));
    },seconds)
}

function showSumOfRandomNumbers() {
    const numbers = [];
    let sum = 0;
    getRandomNumber(0, (num1) => {
        sum += num1;
        numbers.push(num1);
        getRandomNumber(sum, (num2) => {
            sum += num2;
            numbers.push(num2);
            getRandomNumber(sum, (num3) => {
                sum += num3;
                numbers.push(num3);
                getRandomNumber(sum, (num4) => {
                    sum += num4;
                    numbers.push(num4);
                    getRandomNumber(sum, (num5) => {
                        sum += num5;
                        numbers.push(num5);
                      const app = document.getElementById('app');
                      app.innerHTML = `<div>Numbers: <strong>${numbers.join(",")}</strong></div>
                      <div>Sum: <strong>${sum}</strong></div>`  
                    });
                });
            })  ;
        });
        });
    }
*/

/*function showSumOfRandomNumbers() {
    const numbers = [];
    let sum = 0;

    for (let i=0; i<5; i++) {

    }
    getRandomNumber(0)
    .then((num) => {
        sum += num;
        numbers.push(num);
        return getRandomNumber(sum);
    })
    .then((num) => {
        sum += num;
        numbers.push(num);
        return getRandomNumber(sum);
    })
    .then((num) => {
        sum += num;
        numbers.push(num);
        return getRandomNumber(sum);
    })
    .then((num) => {
        sum += num;
        numbers.push(num);
        return getRandomNumber(sum);
    })
    .then((num) => {
        sum += num;
        numbers.push(num);
        const app = document.getElementById('app');
        app.innerHTML = `<div>Numbers: <strong>${numbers.join(",")}</strong></div>
        <div>Sum: <strong>${sum}</strong></div>`  
    })

}*/
 function getRandomNumber(min = 0) {
    const seconds = Math.random() * 100;
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const value = Math.floor(Math.random() * 10 + min);
                resolve(value);
        },seconds)

    });
}

async function fail() {
    throw new Error('항상 실패');
}

async function showSumOfRandomNumbers() {
    /*await키워드는 async 함수 내부에서만 사용가능*/ 
 const numbers = [];
 let sum = 0;

 try{
    for(let i=0; i<5; i++ ) {
        /*getRandomNumber는 async함수여야 하지만 Promise반환하기만 하면 되서 같은값이라 문제없음*/ 
        const num = await getRandomNumber(sum);
        if(num > 20) await fail();
    sum += num;
    numbers.push(num);    
    }
 } catch(e) {
     console.log(e);
 }

  const app = document.getElementById('app');
  app.innerHTML = `<div>Numbers: <strong>${numbers.join(",")}</strong></div>
  <div>Sum: <strong>${sum}</strong></div>`    
}


showSumOfRandomNumbers();
