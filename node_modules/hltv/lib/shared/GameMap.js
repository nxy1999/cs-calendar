"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMapFilter = exports.fromMapName = exports.fromMapSlug = exports.GameMap = void 0;
var GameMap;
(function (GameMap) {
    GameMap["TBA"] = "tba";
    GameMap["Train"] = "de_train";
    GameMap["Cobblestone"] = "de_cbble";
    GameMap["Inferno"] = "de_inferno";
    GameMap["Cache"] = "de_cache";
    GameMap["Mirage"] = "de_mirage";
    GameMap["Overpass"] = "de_overpass";
    GameMap["Dust2"] = "de_dust2";
    GameMap["Nuke"] = "de_nuke";
    GameMap["Tuscan"] = "de_tuscan";
    GameMap["Vertigo"] = "de_vertigo";
    GameMap["Season"] = "de_season";
    GameMap["Ancient"] = "de_ancient";
    GameMap["Anubis"] = "de_anubis";
    GameMap["Default"] = "default";
})(GameMap || (exports.GameMap = GameMap = {}));
var fromMapSlug = function (slug) {
    switch (slug) {
        case 'tba':
            return GameMap.TBA;
        case 'trn':
            return GameMap.Train;
        case 'cbl':
            return GameMap.Cobblestone;
        case 'inf':
            return GameMap.Inferno;
        case 'cch':
            return GameMap.Cache;
        case 'mrg':
            return GameMap.Mirage;
        case 'ovp':
            return GameMap.Overpass;
        case 'd2':
            return GameMap.Dust2;
        case 'nuke':
            return GameMap.Nuke;
        case 'tcn':
            return GameMap.Tuscan;
        case 'vtg':
            return GameMap.Vertigo;
        case 'anc':
            return GameMap.Ancient;
        case '-':
            return GameMap.Default;
        default:
            return GameMap.Default;
    }
};
exports.fromMapSlug = fromMapSlug;
var fromMapName = function (name) {
    switch (name) {
        case 'TBA':
            return GameMap.TBA;
        case 'Train':
        case 'Train_se':
            return GameMap.Train;
        case 'Cobblestone':
            return GameMap.Cobblestone;
        case 'Inferno':
        case 'Inferno_se':
            return GameMap.Inferno;
        case 'Cache':
            return GameMap.Cache;
        case 'Mirage':
        case 'Mirage_ce':
            return GameMap.Mirage;
        case 'Overpass':
            return GameMap.Overpass;
        case 'Dust2':
        case 'Dust2_se':
            return GameMap.Dust2;
        case 'Nuke':
        case 'Nuke_se':
            return GameMap.Nuke;
        case 'Tuscan':
            return GameMap.Tuscan;
        case 'Vertigo':
            return GameMap.Vertigo;
        case 'Ancient':
            return GameMap.Ancient;
        case 'Anubis':
            return GameMap.Anubis;
        case 'Default':
            return GameMap.Default;
        default:
            return GameMap.Default;
    }
};
exports.fromMapName = fromMapName;
var toMapFilter = function (map) {
    switch (map) {
        case GameMap.Cache:
            return 'de_cache';
        case GameMap.Cobblestone:
            return 'de_cobblestone';
        case GameMap.Overpass:
            return 'de_overpass';
        case GameMap.Dust2:
            return 'de_dust2';
        case GameMap.Inferno:
            return 'de_inferno';
        case GameMap.Mirage:
            return 'de_mirage';
        case GameMap.Nuke:
            return 'de_nuke';
        case GameMap.Train:
            return 'de_train';
        case GameMap.Tuscan:
            return 'de_tuscan';
        case GameMap.Vertigo:
            return 'de_vertigo';
        case GameMap.Ancient:
            return 'de_ancient';
        case GameMap.Anubis:
            return 'de_anubis';
        case GameMap.Season:
            return 'de_season';
        case GameMap.TBA:
        case GameMap.Default: {
            throw new Error("Invalid map filter - ".concat(map));
        }
    }
};
exports.toMapFilter = toMapFilter;
