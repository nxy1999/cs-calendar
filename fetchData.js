const { HLTV } = require("hltv")
const { getMatchesByEvents } = require("./getMatchesByEvents")
/**
 * 异步获取比赛数据或比赛结果
 * @param eventIds
 * @param func
 * @returns {Promise<Array>} 返回一个比赛数据的数组
 */
async function fetchMatchesData(eventIds, func) {
    let result
    switch (func) {
        case "getResults":
            result = await HLTV.getResults({ eventIds })
            break
        case "getMatchesByEvents":
            result = await getMatchesByEvents(eventIds)
            break
        default:
            throw new Error("Invalid function")
    }
    return result
}

/**
 * 主函数，用于异步获取特定事件类型的比赛数据。
 * @param eventIds
 * @param funcName
 * @returns {Promise<any>} - 返回一个Promise，成功时解析为比赛数据的JSON对象，失败时则不会返回任何内容。
 */
async function fetchAndProcessData(eventIds, funcName) {
    const maxAttempts = 10
    const delay = 20

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            console.log(
                `[${new Date().getTime()}] ${funcName} 正在尝试 第${attempt + 1}次:`,
            )
            const matchesResultsJson = await fetchMatchesData(
                eventIds,
                funcName,
            )
            // console.log(matchesJson)
            if (matchesResultsJson) {
                return matchesResultsJson
            } else {
                await new Promise((resolve) =>
                    setTimeout(resolve, delay * 1000),
                )
                console.log(
                    `[${new Date().getTime()}] 尝试 ${attempt + 1}: No data returned, retrying...`,
                )
            }
        } catch (e) {
            if (e instanceof SyntaxError && e.name === "JSONDecodeError") {
                console.error("Error decoding JSON: ", e.message)
            } else if (e instanceof Error) {
                console.error(
                    `Attempt ${attempt + 1} failed due to: ${e.message}`,
                )
            } else {
                console.error(
                    `Unexpected error during Attempt ${attempt + 1}: ${e}`,
                )
            }
            if (attempt < maxAttempts - 1) {
                await new Promise((resolve) =>
                    setTimeout(resolve, delay * 1000),
                )
            }
        }
    }

    console.log("获取比赛数据失败")
    // process.exit(1)
    return Promise.reject(new Error("获取比赛数据失败"))
}
module.exports = { fetchAndProcessData }
