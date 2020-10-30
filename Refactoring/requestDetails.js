const plays = {
    hamlet: {
        name: "Hamlet",
        type: "tragedy"
    },
    asLike: {
        name: "As You Like It",
        type: "comedy"
    },
    othello: {
        name: "Othello",
        type: "tragedy"
    }
}

const invoices = [
    {
        customer: "BigCo",
        perfomances: [
            {
                playId: "hamlet",
                audience: 55
            },
            {
                playId: "asLike",
                audience: 35
            },
            {
                playId: "othello",
                audience: 40
            },
        ]
    }
]


function amountFor(perf, play) {
    let result = 0; //thisAmount -> result 명확한 이름으로 변경
    switch(play.type) {
        case "tragedy": //비극
            thisAmount = 40000;
            if(perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
        break;
        case "comedy": //희극
            thisAmount = 30000;
            if(perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default: 
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result; //함수 안에서 값이 바뀌는 변수 반환
}

function statement(invoices, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoices[0].customer})\n`;
    const format = new Intl.NumberFormat("en-US",
                        {style: "currency", currency: "USD",
                    minimumFractionDigit: 2}).format;
    for (let perf of invoices[0].perfomances) {
        const play = plays[perf.playId];
        let thisAmount = amountFor(perf, play);

        //포인트를 적립한다
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역을 출력한다
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립포인트: ${volumeCredits}점\n`;
    return result;
}



console.log(statement(invoices,plays));