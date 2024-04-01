const { HLTV } = require('hltv')

// 导入 EventType 枚举
const { EventType } = require('hltv/lib/shared/EventType');

/**
 * 将获取特定类型事件ID的逻辑封装为一个函数
 * @returns {Promise<Array<number>>} 事件ID的数组
 * @param eventType
 */
function getEventIdsByType(eventType) {
    // // 显式的输入验证
    // if (!eventTypeStr || typeof eventTypeStr !== 'string') {
    //     console.error('Invalid input: eventTypeStr must be a non-empty string');
    //     return Promise.resolve([]);
    // }
    // const eventType = fromText(eventTypeStr);

    if (!eventType) {
        console.error(`Invalid event type string: ${eventType}`);
        return Promise.reject(new Error(`Invalid event type string: ${eventType}`));
    }

    return HLTV.getEvents({ eventType }).then(res => {
        // 处理只属于特定类型的事件
        return res.map(event => event.id);
    }).catch(error => {
        // 处理可能发生的错误
        console.error('Error fetching event IDs by type:',error);
        throw new Error('Failed to fetch event IDs');
    });
}

// 以下为测试代码，展示如何使用getEventIdsByType函数获取特定类型的事件ID
// 必须注释掉，以免影响功能代码运行

// getEventIdsByType(EventType.InternationalLAN)
//     .then(eventIds => console.log('Event IDs:', eventIds))
//     .catch(error => console.error('Error:', error));

module.exports = { getEventIdsByType };
