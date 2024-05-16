const { HLTV } = require("hltv")

/**
 * 异步获取指定比赛的详细信息。
 * @param {number} id - 比赛的唯一标识符。
 * @returns {Promise} 如果成功，返回比赛的详细信息；如果失败，抛出错误。
 */
async function getMatch(id) {
  try {
    return await HLTV.getMatch({ id })
  } catch (error) {
    console.error("获取事件ID或比赛信息时发生错误:", error)
  }
}
// 测试代码
getMatch(2372149)
  .then((match) => console.log(match))
  .catch((error) => console.error("getMatches函数中发生未处理的错误:", error))

module.exports = { getMatch }
