function createPerformanceCalculator(aPerformance, aPlay){
    return new PerformanceCalculator(aPerformance, aPlay);
}

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    get amount(){ //amountFor() 함수의 코드를 계산기 클래스로 복사
        let result = 0;
        switch(this.play.type) {
            case "tragedy": //비극
            result = 40000;
                if(this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
            break;
            case "comedy": //희극
            result = 30000;
                if(this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default: 
                throw new Error(`알 수 없는 장르: ${this.play.type}`);
        }
        return result; //함수 안에서 값이 바뀌는 변수 반환
    }
    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type)
        // 희극 관객 5명마다 추가 포인트를 제공한다
        result += Math.floor(this.performance.audience / 5);
        return result;
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
        const calculator= createPerformanceCalculator(aPerformance,
                                                            playFor(aPerformance));
        // const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance)); //공연료 계산기 생성
        const result = Object.assign({}, aPerformance);//얕은복사 실행
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    
    
    
    function playFor(aPerformance) {
        return plays[aPerformance.playId];
    }
}

