"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sleep = exports.parseNumber = exports.notNull = exports.getIdAt = exports.percentageToDecimalOdd = exports.generateRandomSuffix = exports.fetchPage = void 0;
var cheerio = __importStar(require("cheerio"));
var crypto_1 = require("crypto");
var fetchPage = function (url, loadPage) { return __awaiter(void 0, void 0, void 0, function () {
    var root, _a, _b, html;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = cheerio).load;
                return [4 /*yield*/, loadPage(url)];
            case 1:
                root = _b.apply(_a, [_c.sent()]);
                html = root.html();
                if (html.includes('error code:') ||
                    html.includes('Sorry, you have been blocked') ||
                    html.includes('Checking your browser before accessing') ||
                    html.includes('Enable JavaScript and cookies to continue')) {
                    throw new Error('Access denied | www.hltv.org used Cloudflare to restrict access');
                }
                return [2 /*return*/, root];
        }
    });
}); };
exports.fetchPage = fetchPage;
var generateRandomSuffix = function () {
    return (0, crypto_1.randomUUID)();
};
exports.generateRandomSuffix = generateRandomSuffix;
var percentageToDecimalOdd = function (odd) {
    return parseFloat(((1 / odd) * 100).toFixed(2));
};
exports.percentageToDecimalOdd = percentageToDecimalOdd;
function getIdAt(index, href) {
    switch (arguments.length) {
        case 1:
            return function (href) { return getIdAt(index, href); };
        default:
            return (0, exports.parseNumber)(href.split('/')[index]);
    }
}
exports.getIdAt = getIdAt;
var notNull = function (x) { return x !== null; };
exports.notNull = notNull;
var parseNumber = function (str) {
    if (!str) {
        return undefined;
    }
    var num = Number(str);
    return Number.isNaN(num) ? undefined : num;
};
exports.parseNumber = parseNumber;
var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.sleep = sleep;
