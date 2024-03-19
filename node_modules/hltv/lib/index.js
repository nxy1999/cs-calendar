"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestOfFilter = exports.MatchType = exports.RankingFilter = exports.MatchFormat = exports.GameMap = exports.GameType = exports.ContentFilter = exports.ResultsMatchType = exports.TeamPlayerType = exports.StreamCategory = exports.ThreadCategory = exports.WinType = exports.MatchFilter = exports.MatchEventType = exports.MatchStatus = exports.HLTV = exports.Hltv = void 0;
var config_1 = require("./config");
var getMatch_1 = require("./endpoints/getMatch");
var connectToScorebot_1 = require("./endpoints/connectToScorebot");
var getMatches_1 = require("./endpoints/getMatches");
var getEvent_1 = require("./endpoints/getEvent");
var getEventByName_1 = require("./endpoints/getEventByName");
var getEvents_1 = require("./endpoints/getEvents");
var getMatchMapStats_1 = require("./endpoints/getMatchMapStats");
var getMatchStats_1 = require("./endpoints/getMatchStats");
var getMatchesStats_1 = require("./endpoints/getMatchesStats");
var getPlayer_1 = require("./endpoints/getPlayer");
var getPlayerByName_1 = require("./endpoints/getPlayerByName");
var getPlayerRanking_1 = require("./endpoints/getPlayerRanking");
var getPlayerStats_1 = require("./endpoints/getPlayerStats");
var getRecentThreads_1 = require("./endpoints/getRecentThreads");
var getStreams_1 = require("./endpoints/getStreams");
var getTeam_1 = require("./endpoints/getTeam");
var getTeamByName_1 = require("./endpoints/getTeamByName");
var getTeamRanking_1 = require("./endpoints/getTeamRanking");
var getTeamStats_1 = require("./endpoints/getTeamStats");
var getPastEvents_1 = require("./endpoints/getPastEvents");
var getResults_1 = require("./endpoints/getResults");
var getNews_1 = require("./endpoints/getNews");
var Hltv = /** @class */ (function () {
    function Hltv(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        this.getMatch = (0, getMatch_1.getMatch)(this.config);
        this.getMatches = (0, getMatches_1.getMatches)(this.config);
        this.getEvent = (0, getEvent_1.getEvent)(this.config);
        this.getEvents = (0, getEvents_1.getEvents)(this.config);
        this.getPastEvents = (0, getPastEvents_1.getPastEvents)(this.config);
        this.getEventByName = (0, getEventByName_1.getEventByName)(this.config);
        this.getMatchMapStats = (0, getMatchMapStats_1.getMatchMapStats)(this.config);
        this.getMatchStats = (0, getMatchStats_1.getMatchStats)(this.config);
        this.getMatchesStats = (0, getMatchesStats_1.getMatchesStats)(this.config);
        this.getPlayer = (0, getPlayer_1.getPlayer)(this.config);
        this.getPlayerByName = (0, getPlayerByName_1.getPlayerByName)(this.config);
        this.getPlayerRanking = (0, getPlayerRanking_1.getPlayerRanking)(this.config);
        this.getPlayerStats = (0, getPlayerStats_1.getPlayerStats)(this.config);
        this.getRecentThreads = (0, getRecentThreads_1.getRecentThreads)(this.config);
        this.getStreams = (0, getStreams_1.getStreams)(this.config);
        this.getTeam = (0, getTeam_1.getTeam)(this.config);
        this.getTeamByName = (0, getTeamByName_1.getTeamByName)(this.config);
        this.getTeamRanking = (0, getTeamRanking_1.getTeamRanking)(this.config);
        this.getTeamStats = (0, getTeamStats_1.getTeamStats)(this.config);
        this.getResults = (0, getResults_1.getResults)(this.config);
        this.getNews = (0, getNews_1.getNews)(this.config);
        this.connectToScorebot = (0, connectToScorebot_1.connectToScorebot)(this.config);
        this.TEAM_PLACEHOLDER_IMAGE = 'https://www.hltv.org/img/static/team/placeholder.svg';
        this.PLAYER_PLACEHOLDER_IMAGE = 'https://static.hltv.org/images/playerprofile/bodyshot/unknown.png';
        if (config.httpAgent && !config.loadPage) {
            config.loadPage = (0, config_1.defaultLoadPage)(config.httpAgent);
        }
        if (!config.httpAgent) {
            config.httpAgent = config_1.defaultConfig.httpAgent;
        }
        if (!config.loadPage) {
            config.loadPage = config_1.defaultConfig.loadPage;
        }
    }
    Hltv.prototype.createInstance = function (config) {
        return new Hltv(config);
    };
    return Hltv;
}());
exports.Hltv = Hltv;
var hltv = new Hltv();
exports.HLTV = hltv;
exports.default = hltv;
var getMatch_2 = require("./endpoints/getMatch");
Object.defineProperty(exports, "MatchStatus", { enumerable: true, get: function () { return getMatch_2.MatchStatus; } });
var getMatches_2 = require("./endpoints/getMatches");
Object.defineProperty(exports, "MatchEventType", { enumerable: true, get: function () { return getMatches_2.MatchEventType; } });
Object.defineProperty(exports, "MatchFilter", { enumerable: true, get: function () { return getMatches_2.MatchFilter; } });
var connectToScorebot_2 = require("./endpoints/connectToScorebot");
Object.defineProperty(exports, "WinType", { enumerable: true, get: function () { return connectToScorebot_2.WinType; } });
var getRecentThreads_2 = require("./endpoints/getRecentThreads");
Object.defineProperty(exports, "ThreadCategory", { enumerable: true, get: function () { return getRecentThreads_2.ThreadCategory; } });
var getStreams_2 = require("./endpoints/getStreams");
Object.defineProperty(exports, "StreamCategory", { enumerable: true, get: function () { return getStreams_2.StreamCategory; } });
var getTeam_2 = require("./endpoints/getTeam");
Object.defineProperty(exports, "TeamPlayerType", { enumerable: true, get: function () { return getTeam_2.TeamPlayerType; } });
var getResults_2 = require("./endpoints/getResults");
Object.defineProperty(exports, "ResultsMatchType", { enumerable: true, get: function () { return getResults_2.ResultsMatchType; } });
Object.defineProperty(exports, "ContentFilter", { enumerable: true, get: function () { return getResults_2.ContentFilter; } });
Object.defineProperty(exports, "GameType", { enumerable: true, get: function () { return getResults_2.GameType; } });
var GameMap_1 = require("./shared/GameMap");
Object.defineProperty(exports, "GameMap", { enumerable: true, get: function () { return GameMap_1.GameMap; } });
var MatchFormat_1 = require("./shared/MatchFormat");
Object.defineProperty(exports, "MatchFormat", { enumerable: true, get: function () { return MatchFormat_1.MatchFormat; } });
var RankingFilter_1 = require("./shared/RankingFilter");
Object.defineProperty(exports, "RankingFilter", { enumerable: true, get: function () { return RankingFilter_1.RankingFilter; } });
var MatchType_1 = require("./shared/MatchType");
Object.defineProperty(exports, "MatchType", { enumerable: true, get: function () { return MatchType_1.MatchType; } });
var BestOfFilter_1 = require("./shared/BestOfFilter");
Object.defineProperty(exports, "BestOfFilter", { enumerable: true, get: function () { return BestOfFilter_1.BestOfFilter; } });
