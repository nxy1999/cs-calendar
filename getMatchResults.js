const { HLTV } = require('hltv')

// 哥本哈根major的id
const eventId = [7258,7148]

HLTV.getMatches({eventIds:eventId}).then((matches) => {
  // console.log(matches);
  console.log(JSON.stringify(matches));
})