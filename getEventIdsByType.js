const { HLTV } = require("hltv")

/**
 * 将获取特定类型事件ID的逻辑封装为一个函数
 * @returns {Promise<Array<number>>} 事件ID的数组
 * @param eventType
 */
async function getEventIdsByType(eventType) {
    if (!eventType) {
        console.error(`Invalid event type string: ${eventType}`)
        return Promise.reject(
            new Error(`Invalid event type string: ${eventType}`),
        )
    }
    try {
        const eventsResponse = await HLTV.getEvents({ eventType })
        // console.log("Events Response:", eventsResponse)
        // 处理只属于featured类型的事件
        const eventIds = eventsResponse
            .filter((event) => event.featured === true)
            .map((event) => event.id)
        console.log("Event IDs:", eventIds)
        return eventIds
    } catch (error) {
        // 处理可能发生的错误
        console.error("Error fetching event IDs by type:", error)
        throw new Error("Failed to fetch event IDs")
    }
}

// 以下为测试代码，展示如何使用getEventIdsByType函数获取特定类型的事件ID
if (require.main === module) {
    // 以下为测试代码，展示如何使用getEventIdsByType函数获取特定类型的事件ID
    // 导入 EventType 枚举
    const { EventType } = require("hltv/lib/shared/EventType")
    // 暂定改为major
    getEventIdsByType(EventType.InternationalLAN)
        .then()
        .catch((error) => console.error("Error:", error))
}

module.exports = { getEventIdsByType }
