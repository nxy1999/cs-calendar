// JavaScript 中没有内置的datetime模块，需要引入第三方库如moment.js或者dayjs来处理日期时间
const moment = require('moment-timezone'); // 假设我们使用的是moment-timezone库
const {writeFileSync} = require('fs')
const ics = require('ics')

const { getMatches } = require('./getMatches.js');
const fs = require("fs");

function starsToSymbols(stars) {
    return '★'.repeat(stars);
}

async function fetchMatchesData() {
    try {
        const matches = await getMatches()
        console.log(matches);
        return matches;
    }
    catch (e) {
        // 优化错误处理，打印更详细的错误信息
        console.error(`An error occurred during fetching matches data: ${e.message}`);
        // 确保错误被抛出，以便调用者可以处理
        throw e;
    }
}

function createEvent(match, timezone) {
    if (!match.team1 || !match.team1.name || !match.team2 || !match.team2.name) {
        console.error('缺少必要的队伍名称信息');
        return null; // 或者 return undefined，取决于你的业务逻辑需求
    }
    let timestamp = match.date || 0;
    const beginTime = moment.unix(timestamp / 1000).tz(timezone);

    const team1Name = match.team1.name;
    const team2Name = match.team2.name;
    const eventTitle = `${team1Name} vs ${team2Name}`;
    const stars = match.stars || 0;
    const eventDescription = `HLTV: ${starsToSymbols(stars)}\nHLTV: ${match.stars}星推荐\n赛制: ${match.format}\n赛事：${match.event.name}`;

    return {
        start: beginTime.toISOString(),
        title: eventTitle,
        description: eventDescription,
    };
}

async function processMatchesData(matches, icsFileName = 'matches_calendar.ics', timezone = 'Asia/Shanghai') {
    // 使用数组存储events
    const calEvents = [];

    for (const match of matches) {
        if (match.live) {
            continue;
        }

        const event = createEvent(match, timezone);
        if (event) {
            calEvents.push(event);
        }
    }
    const { error, value } = ics.createEvents(calEvents)
    if (error) {
      console.log(error)
      return
    }
    // 这里假设已有一个处理并写入ICS文件的方法，例如using the ical library
    try {
        // 将events数组写入ICS文件
        await writeFileSync(icsFileName, value);
        console.log("日历文件创建成功！");
    } catch (e) {
        console.error(`Error writing to ${icsFileName}: ${e}`);
    }
}

async function main() {
    const maxAttempts = 10;
    const delay = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            console.log(`正在尝试 第${attempt + 1}次:`);
            const matchesJson = await fetchMatchesData();
            console.log(matchesJson)
            if (!matchesJson) {
                console.log(`尝试 ${attempt + 1}: No data returned, retrying...`);
            } else {
                return matchesJson;
            }
        } catch (e) {
            if (e instanceof SyntaxError && e.name === 'JSONDecodeError') {
                console.error("Error decoding JSON: ", e.message);
            } else if (e instanceof Error) {
                console.error(`Attempt ${attempt + 1} failed due to: ${e.message}`);
            } else {
                console.error(`Unexpected error during Attempt ${attempt + 1}: ${e}`);
            }
        } finally {
            if (attempt < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * 1000));
            }
        }
    }

    console.log("获取比赛数据失败");
    process.exit(1);
}

(async () => {
    try {
        // 测试数据
        // const matchesData = JSON.parse([...]); // 这里应放入与Python中类似的JSON字符串

        const matchesData = await main();
        if (matchesData) {
            await processMatchesData(matchesData);
        }
    } catch (e) {
        console.error("An unexpected error occurred:", e);
    }
})();
