const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit, } = require("./farm.js");

describe("1 - getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40,
            },
        },
        };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with two environment factors, Sun LOW, Wind LOW", () => {
        const environmentFactors = {
            sun: "low",
            wind: "low"
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Get yield for plant with environment factors, Sun MEDIUM, Wind HIGH", () => {
        const environmentFactors = {
            sun: "medium",
            wind: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(18);
    });
});

describe("2 - getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(300);
    });
    test("Get yield for crop with two environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(390);
    });
});

describe("3 - getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(230);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with multiple crops and two environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(345);
    });
    
});

describe("4 - getCostForCrop", () => {
    test("Calculate cost for a crop", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const crops = [{ crop: corn, numCrops: 10, cost: 2 }];
        expect(getCostForCrop({ crops })).toBe(20);
    });
});

describe("5 - getRevenueForCrop", () => {
    test("Calculate revenue for a crop", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const crops = [{ crop: corn, numCrops: 10, cost: 2, salePrice: 3}];
        expect(getRevenueForCrop({ crops })).toBe(900);
    });

    test("Calculate revenue for a crop with two environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };

        const crops = [{ crop: corn, numCrops: 10, cost: 2, salePrice: 3}];

        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(1350);
    });
});

describe("6 - getProfitforCrop", () => {
    test("Calculate profit for a crop", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const crops = [{ crop: corn, numCrops: 10, cost: 2, salePrice: 3 }];
        expect(getProfitForCrop({ crops })).toBe(880);
    });

    test("Calculate profit for a crop with two environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
            },
        };
        const crops = [{ crop: corn, numCrops: 10, cost: 2, salePrice: 3 }];
        
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        expect(getProfitForCrop({ crops }, environmentFactors)).toBe(1330);
    });
});
describe("7 - getTotalProfit", () => {
    test("Calculate profit for multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
        };
        const crops = [
            { crop: corn, numCrops: 1, cost: 2, salePrice: 3},
            { crop: pumpkin, numCrops: 1, cost: 4, salePrice: 6},
        ];
        expect(getTotalProfit({ crops })).toBe(324);
    });

    test("Calculate profit for multiple crops with three environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
                soil: {
                    clay: -50,
                    silt: -30,
                    loam: 20,
                    sand: 50,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 40,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -40,
                },
                soil: {
                    clay: -50,
                    silt: -30,
                    loam: 20,
                    sand: 50,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5, cost: 2, salePrice: 3}, // 255 yield w. factor, revenue 765
            { crop: pumpkin, numCrops: 2, cost: 4, salePrice: 6}, // 136 yield w. factor, revenue 816
        ];
        const environmentFactors = {
            sun: "high",
            wind: "low",
            soil: "loam",
        };
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(1563);
    });
});