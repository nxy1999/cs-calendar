// JavaScript 中没有内置的datetime模块，需要引入第三方库如moment.js或者dayjs来处理日期时间
const moment = require('moment-timezone'); // 假设我们使用的是moment-timezone库
const {writeFileSync} = require('fs')
const ics = require('ics')

const { getMatches } = require('./getMatches.js');
const { getEventIdsByType } = require('./getEventIdsByType.js');
const fs = require("fs");
const {EventType} = require("hltv/lib/shared/EventType");

/**
 * 将星级评价转换为星号符号字符串。
 * @param {number} stars - 代表星级评价的数字，范围应为非负整数。
 * @returns {string} 返回一个由星号("★")重复组成的字符串，长度等于输入的星级评价数。
 */
function starsToSymbols(stars) {
    return '★'.repeat(stars);
}

function extractAllSummaries(icsContent) {
    const summaries = [];
    for (const line of icsContent.split('\n')) {
        if (line.startsWith("SUMMARY:")) {
            const summary = line.slice("SUMMARY:".length).trim();
            summaries.push(summary);
        }
    }
    return summaries;
}


/**
 * 异步获取比赛数据
 * @param {string} eventType 事件类型，用于筛选比赛
 * @returns {Promise<Array>} 返回一个比赛数据的数组
 */
async function fetchMatchesData(eventType) {
    try {
         // 获取事件ID
        const eventIds = await getEventIdsByType(eventType);
        const matches = await getMatches(eventIds)
        // console.log(matches);
        return matches;
    }
    catch (e) {
        // 优化错误处理，打印更详细的错误信息
        console.error(`An error occurred during fetching matches data: ${e.message}`);
        // 确保错误被抛出，以便调用者可以处理
        throw e;
    }
}

/**
 * 创建一个事件对象，代表一场赛事
 * @param {Object} match 包含赛事基本信息的对象
 *        - team1: 包含队伍1信息的对象，必须有name属性
 *        - team2: 包含队伍2信息的对象，必须有name属性
 *        - date: 赛事日期的时间戳（毫秒），可选
 *        - stars: 赛事星级，可选
 *        - format: 赛事赛制，可选
 *        - event: 包含赛事名称的对象，可选
 * @param {String} timezone 事件所在时区
 * @returns {Object|null} 返回一个包含开始时间、标题和描述的事件对象，如果缺少必要信息则返回null
 */
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

/**
 * 将比赛数据转换为ICS文件
 * @param {Array} matches - 包含比赛数据的数组
 * @param {string} icsFileName - ICS文件名
 * @param {string} timezone - 时区
 */
async function processMatchesData(matches, icsFileName = 'matches_calendar.ics', timezone = 'Asia/Shanghai') {
    let oldIcsContent;
    const fs = require('fs').promises; // Node.js 中引入fs模块并使用promises API
    try {
        oldIcsContent = await fs.readFile(icsFileName, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') { // 文件未找到错误
            console.warn(`File not found: ${icsFileName}`);
            oldIcsContent = null;
        } else if (error.code === 'EACCES') { // 文件权限错误
            console.error(`Permission denied: ${icsFileName}`);
            throw error; // 可以考虑处理方式更为优雅
        } else {
            console.error(`An error occurred while reading the file: ${icsFileName}. Error: ${error.message}`);
            throw error; // 其他错误则重新抛出
        }
    }

    const oldEvents = extractAllSummaries(oldIcsContent);
    // console.log(oldEvents)

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
    // const caltitle = calEvents.map(e => e.title)
    // console.log(caltitle)
    // if (oldEvents === calEvents.map(e => e.title)){
    //     console.log("日历文件没有变化，跳过更新！");
    //     return;
    // }
    if (oldEvents.length === calEvents.length && oldEvents.every((value, index) => value === calEvents[index].title)) {
        console.log("日历文件没有变化，跳过更新！");
        return;
    }

    const {error, value} = ics.createEvents(calEvents)
    if (error) {
        console.log(error)
        return
    }
    try {
        // 将events数组写入ICS文件
        writeFileSync(icsFileName, value);
        console.log("日历文件创建成功！");
    } catch (e) {
        console.error(`Error writing to ${icsFileName}: ${e}`);
    }
}

/**
 * 主函数，用于异步获取特定事件类型的比赛数据。
 * @param {string} eventType - 事件类型标识，用于指定要获取比赛数据的类型。
 * @returns {Promise<any>} - 返回一个Promise，成功时解析为比赛数据的JSON对象，失败时则不会返回任何内容。
 */
async function main(eventType) {
    const maxAttempts = 10;
    const delay = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            console.log(`正在尝试 第${attempt + 1}次:`);
            const matchesJson = await fetchMatchesData(eventType);
            // console.log(matchesJson)
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

/**
 * 主函数异步执行流程
 * 无参数
 * 无明确返回值，但依赖于外部函数的返回值来决定流程的推进
 */
(async () => {
    try {
        // 测试数据
        // const matchesData = JSON.parse([...]); // 这里应放入与Python中类似的JSON字符串
        const eventType = EventType.InternationalLAN; // 测试eventType
        const matchesData = await main(eventType);
        if (matchesData) {
            await processMatchesData(matchesData);
        }
    } catch (e) {
        console.error("An unexpected error occurred:", e);
    }
})();
