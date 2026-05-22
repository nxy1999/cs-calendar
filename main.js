const { EventType } = require("hltv/lib/shared/EventType")
const { fetchAndProcessData } = require("./fetchData")

const { processMatchesData } = require("./events")
const { getEventIdsByType } = require("./getEventIdsByType")

/**
 * 主函数异步执行流程
 * 无参数
 * 无明确返回值，但依赖于外部函数的返回值来决定流程的推进
 */
async function mainExecution(eventType) {
    const eventIds = await getEventIdsByType(eventType)
    // if (!eventIds || eventIds.length === 0) {
    //   throw new Error("未找到事件ID")
    // }
    // 如果可以并行处理，使用Promise.all；否则保持串行
    const [matchesData, resultsData = []] = await Promise.all([
        fetchAndProcessData(eventIds, "getMatchesByEvents"),
        fetchAndProcessData(eventIds, "getResults"),
    ])
    console.log(`[${new Date().getTime()}] 获取比赛数据成功`)
    // const resultsData = await main(eventType, getResults)
    if (matchesData) {
        await processMatchesData(matchesData, resultsData)
    }
}

mainExecution([EventType.InternationalLAN, EventType.Major]).catch((e) => {
    console.error("mainExecution error occurred:", e)
})
