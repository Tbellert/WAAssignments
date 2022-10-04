const getYieldForPlant = plant => {
    return plant.yield;
};

const getYieldForCrop = (plant) => {
    const cropYield = plant.crop.yield;
    const numberCrops = plant.numCrops;
    return (cropYield * numberCrops);
};

const getTotalYield = plant => {
};

module.exports = getYieldForPlant, getYieldForCrop, getTotalYield;




//crop

// factor
// sun
// +% influence on yield

// wind
// -% influence on yield

// temperature
// -% influence on yield


// costs
// number of plants * sowing cost per plant


// "crop" is a collection of plants of the same species, so for example a field of corn.
// "costs" is the cost of sowing one plant.
// "yield" is the yield of one plant or one crop (in kilograms).
// "sale price" is the selling price of a type of fruit or vegetable per kilo.
// "revenue" is the turnover or income of one kilo of fruit or vegetables.
// "profits" is profit, so that is revenue - costs.
// "factor" in this context is an environmental factor that influences the yield.

// Therefore:
// crop + factor = yield
// yield * sale price = revenue
// revenue - costs = profits