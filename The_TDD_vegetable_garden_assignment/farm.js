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
    return result * plant.numCrops;
};

const getYieldForCrop = (plant, environmentFactors) => {
    const cropYield = plant.crop.yield * plant.numCrops;
    if(!environmentFactors){
        return cropYield;
    } else {
        return applyMultipleEnvironmentFactors(plant, environmentFactors) + cropYield;
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
            result += (getYieldForCrop(crops)) * crops.salePrice;
        });
        return result;
    } else {
        let result = 0;
        input.crops.forEach((crops) => {
            result += (getYieldForCrop(crops, environmentFactors)) * crops.salePrice;
        });
        return result;
    };
};

const getProfitForCrop  = (input, environmentFactors) => {
    const cost = getCostForCrop(input);
    if(!environmentFactors){
        const revenue = getRevenueForCrop(input);
        return revenue - cost;
    } else {
        const revenue = getRevenueForCrop(input, environmentFactors);
        return revenue - cost;
    };
};

const getTotalProfit = (input, environmentFactors) => {
    const totalCost = getCostForCrop(input);
    if(!environmentFactors){
        const revenue = getRevenueForCrop(input);
        return revenue - totalCost
    } else {
        const revenue = getRevenueForCrop(input, environmentFactors);
        return revenue - totalCost
    };
};

module.exports = {
getYieldForPlant,
getYieldForCrop,
getTotalYield,
getCostForCrop,
getRevenueForCrop,
getProfitForCrop,
getTotalProfit };