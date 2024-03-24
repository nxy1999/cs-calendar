const { HLTV } = require('hltv')

const { getEventIdsByType } = require('./getEventIdsByType.js');

/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns {Promise<void>} 不返回任何内容
 */
async function getMatches() {
  try {
    // 获取事件ID
    const eventIds = await getEventIdsByType('Major');
    // 获取所有事件的比赛信息
    const matches = await HLTV.getMatches({ eventIds });
    console.log(JSON.stringify(matches));
  } catch (error) {
    console.error("获取事件ID或比赛信息时发生错误:", error);
  }
}

// 因为是执行整个脚本的输出，所以必须有
// 执行getMatches函数，并处理可能发生的未捕获错误
getMatches().catch(error => {
  console.error("getMatches函数中发生未处理的错误:", error);
});
