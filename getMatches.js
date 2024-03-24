const { HLTV } = require('hltv')

const { getEventIdsByType } = require('./getEventIdsByType.js');

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

// 因为是执行整个脚本的输出，所以必须有
getMatches().catch(error => {
  console.error("Unhandled error in getMatches:", error);
});
