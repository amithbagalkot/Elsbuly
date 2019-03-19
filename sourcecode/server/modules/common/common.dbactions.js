const db = require("../../models");
const util = require("../../util/util.js");

async function getRegion(regionCode){
    var command = `CALL bs_region_get(${util.formatQueryData(regionCode)})`;
    var region = await db.sequelize.query(command);
    return region;
}

async function getCountry(countryCode, regionCode){
    var command = `CALL bs_country_get(${util.formatQueryData(countryCode)},${util.formatQueryData(regionCode)})`;
    var country = await db.sequelize.query(command);
    return country;
}

async function getSegment(segmentCode,countryCode, regionCode){
    var command = `CALL bs_segment_get(${util.formatQueryData(segmentCode)},${util.formatQueryData(countryCode)},${util.formatQueryData(regionCode)})`;
    var segment = await db.sequelize.query(command);
    return segment;
}

async function getExchange(exchangeCode,countryCode, regionCode){
    var command = `CALL bs_exchange_get(${util.formatQueryData(exchangeCode)},${util.formatQueryData(countryCode)},${util.formatQueryData(regionCode)})`;
    var exchange = await db.sequelize.query(command);
    return exchange;
}

async function getInstrument(instrumentCode,countryCode, regionCode){
    var command = `CALL bs_instrument_get(${util.formatQueryData(instrumentCode)},${util.formatQueryData(countryCode)},${util.formatQueryData(regionCode)})`;
    var instrument = await db.sequelize.query(command);
    return instrument;
}

async function getScript(scriptCode,exchangeCode,countryCode,regionCode){
    var command = `CALL bs_script_get(${util.formatQueryData(scriptCode)},${util.formatQueryData(exchangeCode)},${util.formatQueryData(countryCode)},${util.formatQueryData(regionCode)})`;
    var scripts = await db.sequelize.query(command);
    return scripts;
}

var masterDataDbAction = {
    getRegion,
    getCountry,
    getSegment,
    getExchange,
    getInstrument,
    getScript
}

module.exports = masterDataDbAction;
