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

function statement(invoices, plays) {
    const statementData = {};
    statementData.customer = invoices[0].customer;
    statementData.perfomances = invoices[0].perfomances;
    return renderPlainText(statementData,plays);
}

function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    for (let perf of invoices[0].perfomances) {
        // 청구 내역을 출력한다
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립포인트: ${totalVolumeCredits()}점\n`;
    return result;
    
    function totalAmount() {
        let result = 0;
        for(let perf of data.perfomances) {
            result += amountFor(perf);
        }
        return result;
    }
    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.perfomances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
                            {style: "currency", currency: "USD",
                        minimumFactionDigits: 2}).format(aNumber/100);
    }
    
    
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type)
        // 희극 관객 5명마다 추가 포인트를 제공한다
        result += Math.floor(aPerformance.audience / 5);
        return result;
}
function playFor(aPerformance) {
    return plays[aPerformance.playId];
}
function amountFor(aPerformance) {
    let result = 0; //thisAmount -> result 명확한 이름으로 변경
    switch(playFor(aPerformance).type) {
        case "tragedy": //비극
            thisAmount = 40000;
            if(aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
        break;
        case "comedy": //희극
            thisAmount = 30000;
            if(aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default: 
            throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result; //함수 안에서 값이 바뀌는 변수 반환
}
    
}










console.log(statement(invoices,plays));