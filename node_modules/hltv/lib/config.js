"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.defaultLoadPage = void 0;
var https_1 = require("https");
var got_scraping_1 = require("got-scraping");
var defaultLoadPage = function (httpAgent) { return function (url) {
    return (0, got_scraping_1.gotScraping)({ url: url, agent: { http: httpAgent, https: httpAgent } }).then(function (res) { return res.body; });
}; };
exports.defaultLoadPage = defaultLoadPage;
var defaultAgent = new https_1.Agent();
exports.defaultConfig = {
    httpAgent: defaultAgent,
    loadPage: (0, exports.defaultLoadPage)(defaultAgent)
};
