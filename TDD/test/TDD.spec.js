
describe('province', () => {
    let asia;
    beforeEach(() => {/*각각의 테스트 바로 전에 실행되어 
        asia를 초기화하기때문에 모든 테스트가 자신만의 새로운
        asia를 사용하게 된다.*/
        asia = new Province(sampleProvinceData());
    })
    it('shortfall', () => {
        expect(asia.shortfall).toBe(5);
    });
    it('profit', () => {
        expect(asia.profit).toBe(230);
    });
    it('change production', () => {
        asia.producers[0].production = 20;
        expect(asia.shortfall).toBe(-6);
        expect(asia.profit).toBe(292);
    });
    it('zero demand', () => {//수요가 없다.
        asia.demand = 0;
        expect(asia.shortfall).toBe(-25);
        expect(asia.profit).toBe(0);
    });
    it('negative demand', () => { //수요가 마이너스다
        asia.demand = -1;
        expect(asia.shortfall).toBe(-26);
        expect(asia.profit).toBe(-10);
    });
    it('empty string demand', () => {
        asia.demand = '';
        expect(asia.shorfall).NaN;
        expect(asia.profit).NaN;
    })
});

describe('no producers', () => { //생성자가 없다.
    let noProducers;
    beforeEach(() => {
        const data = {
            name: 'No producers',
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    });
    it('shortfall', () => {
        expect(noProducers.shortfall).toBe(30);
    });
    it('profit', () => {
        expect(noProducers.profit).toBe(0);
    });
});

//생성자 수 필드에 문자열을 대입한다
describe('string for producers', () => {
    it('', () => {
        const data = {
            name: "String producers",
            producers: '',
            demand: 30,
            price: 20
        };
        const prov = new Province(data);
        expect(prov.shortfall).toBe(30);
    })

})