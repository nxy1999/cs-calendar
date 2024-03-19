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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HLTVScraper = void 0;
var cheerio = __importStar(require("cheerio"));
var utils_1 = require("./utils");
var attachMethods = function (root) {
    var obj = {
        length: root.length,
        find: function (selector) {
            return attachMethods(root.find(selector));
        },
        attr: function (attr) {
            return root.attr(attr);
        },
        attrThen: function (attr, then) {
            return then(root.attr(attr));
        },
        text: function () {
            return root.text();
        },
        textThen: function (then) {
            return then(root.text());
        },
        first: function () {
            return attachMethods(root.first());
        },
        last: function () {
            return attachMethods(root.last());
        },
        data: function (name) {
            return root.data(name);
        },
        trimText: function () {
            return root.text().trim() || undefined;
        },
        numFromAttr: function (attr) {
            return (0, utils_1.parseNumber)(root.attr(attr));
        },
        numFromText: function () {
            return (0, utils_1.parseNumber)(root.text());
        },
        lines: function () {
            return root.text().split('\n');
        },
        exists: function () {
            return root.length !== 0;
        },
        toArray: function () {
            return root.toArray().map(cheerio.default).map(attachMethods);
        },
        prev: function (selector) {
            return attachMethods(root.prev(selector));
        },
        next: function (selector) {
            return attachMethods(root.next(selector));
        },
        eq: function (index) {
            return attachMethods(root.eq(index));
        },
        children: function (selector) {
            return attachMethods(root.children(selector));
        },
        parent: function () {
            return attachMethods(root.parent());
        },
        contents: function () {
            return attachMethods(root.contents());
        },
        filter: function (func) {
            return attachMethods(root.filter(function (i, el) { return func(i, attachMethods(cheerio.default(el))); }));
        },
        index: function () {
            return root.index();
        }
    };
    return obj;
};
var HLTVScraper = function (root) {
    var selector = function (selector) {
        return attachMethods(root(selector));
    };
    Object.assign(selector, root);
    return selector;
};
exports.HLTVScraper = HLTVScraper;
