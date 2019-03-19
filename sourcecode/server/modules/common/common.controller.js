var masterDataService = require("./common.service");
const responseSender = require("../../util/responseSender");
const errorHandler = require("../../util/errorHandler");
async function getRegion(req, res) {
    var regionCode;
    ({ regionCode } = req.query);
    var data = await masterDataService.getRegion(regionCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }

}
async function getCountry(req, res) {
    var countryCode, regionCode;
    ({ countryCode, regionCode } = req.query);
    var data = await masterDataService.getCountry(countryCode, regionCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}
async function getSegment(req, res) {
    var segmentCode, countryCode, regionCode;
    ({ segmentCode, countryCode, regionCode } = req.query);
    var data = await masterDataService.getSegment(segmentCode, countryCode, regionCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}

async function getExchange(req, res) {
    var exchangeCode, countryCode, regionCode;
    ({ exchangeCode, countryCode, regionCode } = req.query);
    var data = await masterDataService.getExchange(exchangeCode, countryCode, regionCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}

async function getInstrument(req, res) {
    var instrumentCode, countryCode, regionCode;
    ({ instrumentCode, countryCode, regionCode } = req.query);
    var data = await masterDataService.getInstrument(instrumentCode, countryCode, regionCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}

async function getScript(req, res) {
    var countryCode, regionCode, exchangeCode, scriptCode;
    ({ countryCode, regionCode, exchangeCode, scriptCode } = req.query);
    var data = await masterDataService.getScript(countryCode, regionCode, exchangeCode, scriptCode);
    if (data) {
        return responseSender(req, res, data);
    }
    else {
        return errorHandler(req, res, { msg: "Unknown error" }, 500);
    }
}

var commonController = {
    getRegion,
    getCountry,
    getSegment,
    getExchange,
    getInstrument,
    getScript
}

module.exports = commonController;
