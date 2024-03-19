"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromText = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["Major"] = "MAJOR";
    EventType["InternationalLAN"] = "INTLLAN";
    EventType["RegionalLAN"] = "REGIONALLAN";
    EventType["LocalLAN"] = "LOCALLAN";
    EventType["Online"] = "ONLINE";
    EventType["Other"] = "OTHER";
})(EventType || (exports.EventType = EventType = {}));
var fromText = function (str) {
    switch (str) {
        case 'Online':
            return EventType.Online;
        case 'Intl. LAN':
            return EventType.InternationalLAN;
        case 'Local LAN':
            return EventType.LocalLAN;
        case 'Reg. LAN':
            return EventType.RegionalLAN;
        case 'Major':
            return EventType.Major;
        case 'Other':
            return EventType.Other;
    }
};
exports.fromText = fromText;
