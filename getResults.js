const { HLTV } = require("hltv")

/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns {Promise<import("./endpoints/getMatches").MatchPreview[]>} 不返回任何内容
 */
async function getResults(eventIds) {
  try {
    // // 获取事件ID
    // const eventIds = await getEventIdsByType(EventType.InternationalLAN);
    // 获取所有事件的比赛信息
    const results = await HLTV.getResults({ eventIds })
    console.log("results", results)
    // console.log(JSON.stringify(results))
    return results
  } catch (error) {
    console.error("获取事件ID或比赛结果时发生错误:", error)
  }
}
// 测试代码
const { getEventIdsByType } = require("./getEventIdsByType.js")
const { EventType } = require("hltv/lib/shared/EventType")
getEventIdsByType(EventType.InternationalLAN).then((eventIds) => {
  getResults(eventIds)
    .then((matches) => console.log(matches))
    .catch((error) => console.error("getResults函数中发生未处理的错误:", error))
})

module.exports = { getResults }
