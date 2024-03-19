"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFullMatchFormat = exports.MatchFormatLocation = exports.MatchFormat = void 0;
var MatchFormat;
(function (MatchFormat) {
    MatchFormat["BO1"] = "bo1";
    MatchFormat["BO3"] = "bo3";
    MatchFormat["BO5"] = "bo5";
    MatchFormat["BO7"] = "bo7";
    MatchFormat["Unknown"] = "unknown";
})(MatchFormat || (exports.MatchFormat = MatchFormat = {}));
var MatchFormatLocation;
(function (MatchFormatLocation) {
    MatchFormatLocation["LAN"] = "LAN";
    MatchFormatLocation["Online"] = "Online";
})(MatchFormatLocation || (exports.MatchFormatLocation = MatchFormatLocation = {}));
var fromFullMatchFormat = function (format) {
    if (format.includes('Best of 1')) {
        return MatchFormat.BO1;
    }
    if (format.includes('Best of 3')) {
        return MatchFormat.BO3;
    }
    if (format.includes('Best of 5')) {
        return MatchFormat.BO5;
    }
    if (format.includes('Best of 7')) {
        return MatchFormat.BO7;
    }
    return MatchFormat.Unknown;
};
exports.fromFullMatchFormat = fromFullMatchFormat;
