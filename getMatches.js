const { HLTV } = require('hltv')

// 哥本哈根major的id
// const eventId = [7258,7148]
//
// HLTV.getMatches({eventIds:eventId}).then((matches) => {
//   // console.log(matches);
//   console.log(JSON.stringify(matches));
// })

const { getEventIdsByType } = require('./getEventIdsByType');

// 获取事件ID
// getEventIdsByType().then(eventIds => {
//     HLTV.getMatches({eventIds: eventIds}).then(matches => {
//         console.log(JSON.stringify(matches));
//     });
// });

// 假设这是在一个异步函数中
async function getMatches() {
  try {
    const eventIds = await getEventIdsByType('Major');
    const matches = await HLTV.getMatches({ eventIds: eventIds });
    console.log(JSON.stringify(matches));
  } catch (error) {
    console.error(error);
  }
}

getMatches().catch(error => {
  console.error("Unhandled error in getMatches:", error);
});
