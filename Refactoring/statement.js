const currency = require('./createStatementData.js');
const createStatementData = currency.createStatementData;

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
    
    return renderPlainText(createStatementData(invoices, plays));
    
}

function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    for (let perf of data.performances) {
        // 청구 내역을 출력한다
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립포인트: ${data.totalVolumeCredits}점\n`;
    return result;
    
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
                            {style: "currency", currency: "USD",
                        minimumFactionDigits: 2}).format(aNumber/100);
    }

    
}

console.log(statement(invoices,plays));