const { HLTV } = require('hltv');

// const eventTypes = 'Major';
//
// myEventType = fromText(eventTypes);
//
// HLTV.getEvents({ eventType: myEventType }).then(res => {
//     // 这里处理只属于Major类型的事件
//     const eventIds = res.map(event => event.id);
//     console.log(eventIds);
// }).catch(error =>{
//     // 处理可能发生的错误
//     console.error(error);
// });
//
//
// function getEventIds() {
//     return HLTV.getEvents().then(res => res.map(event => event.id));
// }
//
// module.exports = { getEventIds };

// 将获取特定类型事件ID的逻辑封装为一个函数
function getEventIdsByType(eventTypeString) {
    // 使用fromText将字符串转换为EventType
    const eventType = eventTypeString;

    if (eventType) {
        return HLTV.getEvents({ eventType }).then(res => {
            // 处理只属于特定类型的事件
            return res.map(event => event.id);
        }).catch(error => {
            // 处理可能发生的错误
            console.error(error);
            return []; // 在发生错误时返回一个空数组
        });
    } else {
        console.error('Invalid event type string:', eventTypeString);
        return Promise.resolve([]); // 返回一个解析为空数组的Promise，保持函数返回类型一致
    }
}

// 使用封装的函数获取特定类型的事件ID
// 测试代码
// getEventIdsByType('Major').then(eventIds => {
//     console.log(eventIds); // 这里处理只属于Major类型的事件的ID
// });

module.exports = { getEventIdsByType };
