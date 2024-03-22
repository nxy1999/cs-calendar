// events.js
const { HLTV } = require('hltv');

function getEventIds() {
    return HLTV.getEvents().then(res => res.map(event => event.id));
}

module.exports = { getEventIds };