const { HLTV } = require("@awakcon1234/hltv")
// 暂时没用
/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns {Promise<import("./endpoints/getMatches").MatchPreview[]>} 不返回任何内容
 */
async function getMatchesStats() {
     https://www.hltv.org/stats/matches?startDate=2024-04-15&endDate=2024-05-15&matchType=BigEvents
   / 上个月的结果和BigEvents
   ty {
        / 获取事件ID
    // const eventIds = await getEventIdsByType(EventType.InternationalLAN);
       /取所有事件的比赛信息
     cont matches = await HLTV.getMatchesStats({
        starate: "2024-04-15",
        endDe: "2024-05-15",
         matype: "BigEvents",
        
        ole.log(JSON.stringify(matches))
        rn matches
    catch (error) {
        ole.error("获取事件ID或比赛结果时发生错误:", error)
  }
}
// 测试代码
// const { getEventIdsByType } = require("./getEventIdsByType.js")
const { MatchType } = require("@awakcon1234/hltv/lib/shared/MatchType")

getMatchesStats(MatchType.BigEvents)
  .then((matchesStats) => console.log(matchesStats))
  .catch((error) =>
    console.error("getMatchesStat函数中发生未处理的错误:", error),
  )

module.exports = { getMatchesStats }
