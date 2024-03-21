const { HLTV } = require('hltv')

// 哥本哈根major的id
// const eventId = [7258,7148]
//
// HLTV.getMatches({eventIds:eventId}).then((matches) => {
//   // console.log(matches);
//   console.log(JSON.stringify(matches));
// })

// 构造一个包含'MAJOR'和'INTLLAN'类型的数组
const eventTypes = ['MAJOR'];

// 获取事件ID
HLTV.getEvents({ eventType: eventTypes }).then(res => {
    const eventIds = res.map(event => event.id);

    // 使用获取到的事件ID获取比赛信息
    HLTV.getMatches({eventIds: eventIds}).then(matches => {
        console.log(JSON.stringify(matches));
    });
});
