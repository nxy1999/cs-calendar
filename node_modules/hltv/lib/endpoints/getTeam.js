"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeam = exports.TeamPlayerType = void 0;
var scraper_1 = require("../scraper");
var utils_1 = require("../utils");
var TeamPlayerType;
(function (TeamPlayerType) {
    TeamPlayerType["Coach"] = "Coach";
    TeamPlayerType["Starter"] = "Starter";
    TeamPlayerType["Substitute"] = "Substitute";
    TeamPlayerType["Benched"] = "Benched";
})(TeamPlayerType || (exports.TeamPlayerType = TeamPlayerType = {}));
var getTeam = function (config) {
    return function (_a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var $, _b, name, logoSrc, logo, facebook, twitter, instagram, rank, players, rankingDevelopment, rankings, country, news;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = scraper_1.HLTVScraper;
                        return [4 /*yield*/, (0, utils_1.fetchPage)("https://www.hltv.org/team/".concat(id, "/").concat((0, utils_1.generateRandomSuffix)()), config.loadPage)];
                    case 1:
                        $ = _b.apply(void 0, [_d.sent()]);
                        name = $('.profile-team-name').text();
                        logoSrc = $('.teamlogo').attr('src');
                        logo = logoSrc.includes('placeholder.svg') ? undefined : logoSrc;
                        facebook = $('.facebook').parent().attr('href');
                        twitter = $('.twitter').parent().attr('href');
                        instagram = $('.instagram').parent().attr('href');
                        rank = (0, utils_1.parseNumber)($('.profile-team-stat .right').first().text().replace('#', ''));
                        players = (_c = $('.players-table tbody tr')
                            .toArray()
                            .map(function (el) { return ({
                            name: el
                                .find('.playersBox-playernick-image .playersBox-playernick .text-ellipsis')
                                .text(),
                            id: el
                                .find('.playersBox-playernick-image')
                                .attrThen('href', (0, utils_1.getIdAt)(2)),
                            timeOnTeam: el.find('td').eq(2).trimText(),
                            mapsPlayed: el.find('td').eq(3).numFromText(),
                            type: getPlayerType(el.find('.player-status').text())
                        }); }))
                            .concat.apply(_c, ($('.coach-table').exists()
                            ? [
                                {
                                    id: $('.coach-table .playersBox-playernick-image').attrThen('href', (0, utils_1.getIdAt)(2)),
                                    name: $('.coach-table .playersBox-playernick-image .playersBox-playernick .text-ellipsis').text(),
                                    timeOnTeam: $('.coach-table tbody tr')
                                        .first()
                                        .find('td')
                                        .eq(1)
                                        .trimText(),
                                    mapsPlayed: $('.coach-table tbody tr')
                                        .first()
                                        .find('td')
                                        .eq(2)
                                        .numFromText(),
                                    type: TeamPlayerType.Coach
                                }
                            ]
                            : []));
                        try {
                            rankings = JSON.parse($('.graph').attr('data-fusionchart-config'));
                            rankingDevelopment = rankings.dataSource.dataset[0].data.map(function (x) {
                                return (0, utils_1.parseNumber)(x.value);
                            });
                        }
                        catch (_e) {
                            rankingDevelopment = [];
                        }
                        country = {
                            name: $('.team-country .flag').attr('alt'),
                            code: $('.team-country .flag').attrThen('src', function (x) { var _a; return (_a = x.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; })
                        };
                        news = $('#newsBox a')
                            .toArray()
                            .map(function (el) { return ({
                            name: el.contents().eq(1).text(),
                            link: el.attr('href')
                        }); });
                        return [2 /*return*/, {
                                id: id,
                                name: name,
                                logo: logo,
                                facebook: facebook,
                                twitter: twitter,
                                instagram: instagram,
                                country: country,
                                rank: rank,
                                players: players,
                                rankingDevelopment: rankingDevelopment,
                                news: news
                            }];
                }
            });
        });
    };
};
exports.getTeam = getTeam;
function getPlayerType(text) {
    if (text === 'STARTER') {
        return TeamPlayerType.Starter;
    }
    if (text === 'BENCHED') {
        return TeamPlayerType.Benched;
    }
    if (text === 'SUBSTITUTE') {
        return TeamPlayerType.Substitute;
    }
}
