const { result } = require('underscore');
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
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays)); //중간 데이터 생성 함수를 공유
}

function renderHtml(data) {
    let reulst = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for(let perf of data.performances) {
        result +=  `<tr><td>${perf.play.name}</td><td>${perf.audience}석)</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;

    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
                        {style: "currency", currency: "USD",
                    minimumFactionDigits: 2}).format(aNumber/100);
}
console.log(statement(invoices,plays));