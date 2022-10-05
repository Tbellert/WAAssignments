const getYieldForPlant = (plant, environmentFactors) => {
    if(!environmentFactors){
        return plant.yield;
    } else {
        let result = 0;
        Object.keys(environmentFactors).forEach((key) => {
            const environmentKey = environmentFactors[key];
            const plantFactor = plant.factor[key];
            result += (plant.yield / 100) * plantFactor[environmentKey];
        });
        return plant.yield + result;
    };
};

const applyMultipleEnvironmentFactors = (plant, environmentFactors) => {
    let result = 0;
    Object.keys(environmentFactors).forEach((key) => {
        const environmentKey = environmentFactors[key];
        const plantFactor = plant.crop.factor[key];
        result += (plant.crop.yield / 100) * plantFactor[environmentKey];
    });
    return result
};

const getYieldForCrop = (plant, environmentFactors) => {
    const cropYield = plant.crop.yield * plant.numCrops;
    if(!environmentFactors){
        return cropYield;
    } else {
        return applyMultipleEnvironmentFactors(plant, environmentFactors) * plant.numCrops + cropYield;
    };
};

const getTotalYield = (input, environmentFactors) => {
    if (!environmentFactors) {
        let result = 0;
        input.crops.forEach((crops) => {
            result += getYieldForCrop(crops);
        });
        return result;
    } else {
        let result = 0;
        input.crops.forEach((crops) => {
            result += getYieldForCrop(crops, environmentFactors);
        });
        return result;
    };
};

const getCostForCrop = (input) =>{
    let result = 0;
    input.crops.forEach((crops) => {
        result += crops.cost * crops.numCrops;
    });
    return result;
};

const getRevenueForCrop = (input, environmentFactors) =>{
    if (!environmentFactors) {
        let result = 0;
        input.crops.forEach((crops) => {
            result += getTotalYield(input) * crops.salePrice;
        });
        return result;
    } else {
        const totalYield = getTotalYield(input, environmentFactors);
        let totalSales = 0;
        input.crops.forEach((crops) => {
            totalSales += crops.salePrice;
        });
        return totalYield * totalSales;
    };
};

const getProfitForCrop  = (input, environmentFactors) => {
    if(!environmentFactors){
        const revenue = getRevenueForCrop(input);
        const cost = getCostForCrop(input);
        return revenue - cost;
    } else {
        const revenue = getRevenueForCrop(input, environmentFactors);
        const cost = getCostForCrop(input);
        return revenue - cost;
    };
};

const getTotalProfit = (input, environmentFactors) => {
    let result = 0;
    if(!environmentFactors){
        const totalYield = getTotalYield(input);
        console.log(totalYield);
        const totalCost = getCostForCrop(input);
        console.log(totalCost);
        const revenue = getRevenueForCrop(input);
        console.log(revenue);
        console.log (revenue - totalCost);
        return revenue - totalCost
    };

};

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
    { crop: corn, numCrops: 5, cost: 2, salePrice: 3}, // 675 revenue, 10 cost
    { crop: pumpkin, numCrops: 2, cost: 4, salePrice: 6}, // 720 revenue, 8 cost
]; // total 1395 revenue - 18 cost = 1377

getTotalProfit({crops});

module.exports = {
getYieldForPlant,
getYieldForCrop,
getTotalYield,
getCostForCrop,
getRevenueForCrop,
getProfitForCrop,
getTotalProfit };