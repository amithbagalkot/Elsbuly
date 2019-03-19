var masterDataDbActions = require("./common.dbactions");
var commonService = {};

async function getRegion(regionCode = null){

    return masterDataDbActions.getRegion(regionCode);
}

async function getCountry(countryCode = null, regionCode = null){

    return masterDataDbActions.getCountry(countryCode = null, regionCode = null);
}

async function getSegment(segmentCode = null,countryCode = null, regionCode = null){
    return masterDataDbActions.getSegment(segmentCode,countryCode, regionCode);
}

async function getExchange(exchangeCode = null,countryCode = null, regionCode = null){
    return masterDataDbActions.getExchange(exchangeCode,countryCode, regionCode);
}

async function getInstrument(instrumentCode = null,countryCode = null, regionCode = null){
    return masterDataDbActions.getInstrument(instrumentCode,countryCode, regionCode);
}

async function getScript(scriptCode = null,exchangeCode = null,countryCode = null,regionCode = null){
    return masterDataDbActions.getScript(scriptCode,exchangeCode,countryCode,regionCode);
}

var commonService = {
    getRegion,
    getCountry,
    getSegment,
    getExchange,
    getInstrument,
    getScript
}

module.exports = commonService;
