const { HLTV } = require('hltv')

// 哥本哈根major的id
// const eventId = [7258,7148]
//
// HLTV.getMatches({eventIds:eventId}).then((matches) => {
//   // console.log(matches);
//   console.log(JSON.stringify(matches));
// })

const { getEventIdsByType } = require('./getEventIdsByType.js');

// 获取事件ID
// getEventIdsByType().then(eventIds => {
//     HLTV.getMatches({eventIds: eventIds}).then(matches => {
//         console.log(JSON.stringify(matches));
//     });
// });

/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns {Promise<void>}
 */
async function getMatches() {
  try {
    // 获取事件ID
    const eventIds = await getEventIdsByType('Major');
    // 获取所有事件的比赛信息
    const matches = await HLTV.getMatches({ eventIds });
    console.log(JSON.stringify(matches));
  } catch (error) {
    console.error("An error occurred while getting the event IDs or matches:", error);
  }
}

getMatches().catch(error => {
  console.error("Unhandled error in getMatches:", error);
});
