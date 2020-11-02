class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
}

exports.createStatementData = function(invoices, plays) {
    const result = {};
    result.customer = invoices[0].customer;
    result.performances = invoices[0].perfomances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function totalAmount(data) {
        return data.performances
            .reduce( (total, p) => total += p.amount,0);
    }
    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total += p.volumeCredits, 0);
    }
    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance)); //공연료 계산기 생성
        const result = Object.assign({}, aPerformance);//얕은복사 실행
        result.play = calculator.play;
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type)
        // 희극 관객 5명마다 추가 포인트를 제공한다
        result += Math.floor(aPerformance.audience / 5);
        return result;
    }
    function amountFor(aPerformance) {
        let result = 0;
        switch(aPerformance.play.type) {
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
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }
        return result; //함수 안에서 값이 바뀌는 변수 반환
    }
    
    function playFor(aPerformance) {
        return plays[aPerformance.playId];
    }
}

