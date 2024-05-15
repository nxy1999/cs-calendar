const { HLTV } = require("hltv")

/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns {Promise<import("./endpoints/getMatches").MatchPreview[]>} 不返回任何内容
 */
async function getMatchStats() {
  try {
    // // 获取事件ID
    // const eventIds = await getEventIdsByType(EventType.InternationalLAN);
    // 获取所有事件的比赛信息
    const matches = await HLTV.getMatchesStats({
      startDate: "2024-04-15",
      endDate: "2024-05-15",
      matchType: "BigEvents",
    })
    console.log(JSON.stringify(matches))
    return matches
  } catch (error) {
    console.error("获取事件ID或比赛结果时发生错误:", error)
  }
}
// 测试代码
// const { getEventIdsByType } = require("./getEventIdsByType.js")
const { MatchType } = require("hltv/lib/shared/MatchType")

getMatchStats(MatchType.BigEvents)
  .then((matchesStats) => console.log(matchesStats))
  .catch((error) =>
    console.error("getMatchesStat函数中发生未处理的错误:", error),
  )

module.exports = { getMatchStats }
