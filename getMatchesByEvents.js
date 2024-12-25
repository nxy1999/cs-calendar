const { HLTV } = require("hltv")
// const { getDataUntilMaxTimes } = require("./utils")
// const { getEventIdsByType } = require("./getEventIdsByType")
// const { EventType } = require("hltv/lib/shared/EventType")
/**
 * 获取指定类型的Major事件ID，然后获取这些事件的比赛信息
 * @returns
 */
async function getMatchesByEvents(eventIds) {
    try {
        // // 获取事件ID
        // const eventIds = await getEventIdsByType(EventType.InternationalLAN);
        // 获取所有事件的比赛信息
        // const matches = await getDataUntilMaxTimes(
        //   async () => await HLTV.getMatches({ eventIds }),
        // )
        // console.log("eventIds", eventIds)
        const matches = await HLTV.getMatches({ eventIds })
        console.log("matches", matches)
        // console.log(JSON.stringify(matches))
        console.log("matches[matches.length-1]", matches[matches.length - 1])

        if (matches[0]?.event?.id !== eventIds[0]) {
            const kongEvent = {
                id: 2378117,
                date: undefined,
                stars: 0,
                title: undefined,
                team1: {},
                team2: {},
                format: "bo3",
                event: {},
                live: false,
            }
            return [kongEvent]
        }
        return matches
        // return eventIds.includes(matches[0]?.event?.id) ? matches : []
    } catch (error) {
        console.error("获取事件ID或比赛信息时发生错误:", error)
    }
}

// 测试代码
if (require.main === module) {
    const { getEventIdsByType } = require("./getEventIdsByType.js")
    const { EventType } = require("hltv/lib/shared/EventType")

    getEventIdsByType(EventType.InternationalLAN).then((eventIds) => {
        getMatchesByEvents(eventIds)
            .then((matches) => console.log("matches", matches))
            .catch((error) =>
                console.error("getMatches函数中发生未处理的错误:", error),
            )
    })
}

// getMatchesByEvents([7865])
//     .then((matches) => console.log(matches))
//     .catch((error) => console.error("getMatches函数中发生未处理的错误:", error))

module.exports = { getMatchesByEvents }
