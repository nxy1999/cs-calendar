const { HLTV } = require('hltv')

HLTV.getMatches().then((matches) => {
  // console.log(matches);
  console.log(JSON.stringify(matches));
})