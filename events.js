const {
  starsToSymbols,
  handleFileReadError,
  extractAllSummaries,
  areEventsEqual,
} = require("./utils")
const { HLTV } = require("hltv")
const ics = require("ics")

/**
 * 创建一个事件对象，代表一场赛事
 * @param {Object} match 包含赛事基本信息的对象
 *        - team1: 包含队伍1信息的对象，必须有name属性
 *        - team2: 包含队伍2信息的对象，必须有name属性
 *        - date: 赛事日期的时间戳（毫秒），可选
 *        - stars: 赛事星级，可选
 *        - format: 赛事赛制，可选
 *        - event: 包含赛事名称的对象，可选
 * @returns {Object|null} 返回一个包含开始时间、标题和描述的事件对象，如果缺少必要信息则返回null
 */
function createEvent(match) {
  if (!match.team1 || !match.team1.name || !match.team2 || !match.team2.name) {
    console.error(`[${new Date().getTime()}] 缺少必要的队伍名称信息`, match.id)
    return null // 或者 return undefined，取决于你的业务逻辑需求
  }
  const timestamp = match.date || 0

  const team1Name = match.team1.name
  const team2Name = match.team2.name
  const stars = match.stars || 0
  let duration
  if (match.format === "bo1") {
    duration = { hours: 1 }
  } else if (match.format === "bo3") {
    duration = { hours: 3 }
  } else if (match.format === "bo5") {
    duration = { hours: 5 }
  } else {
    duration = 0
  }

  // 构建基础的 eventTitle
  let eventTitle = `${team1Name} vs ${team2Name}`

  // 如果存在结果信息，修改 eventTitle 并构建描述
  if (Object.prototype.hasOwnProperty.call(match, "result")) {
    const result1 = match.result.team1
    const result2 = match.result.team2
    eventTitle = `${team1Name} ${result1}:${result2} ${team2Name}`
    const eventDescription = `HLTV: ${starsToSymbols(stars)}\nHLTV: ${match.stars}星推荐\n赛制: ${match.format}\n`
    return {
      start: timestamp,
      title: eventTitle,
      description: eventDescription,
    }
  }

  const eventDescription = `HLTV: ${starsToSymbols(stars)}\nHLTV: ${match.stars}星推荐\n赛制: ${match.format}\n赛事：${match.event.name}`
  return {
    start: timestamp,
    duration,
    title: eventTitle,
    description: eventDescription,
  }
}

/**
 * 将比赛数据转换为ICS文件
 * @param {Array} matches - 包含比赛数据的数组
 * @param results
 * @param {string} icsFileName - ICS文件名
 */
async function processMatchesData(
  matches,
  results,
  icsFileName = "matches_calendar.ics",
) {
  let oldIcsContent
  const fs = require("fs").promises // Node.js 中引入fs模块并使用promises API
  console.log(`[${new Date().getTime()}] 正在读取旧日历文件...`)
  try {
    oldIcsContent = await fs.readFile(icsFileName, "utf8")
  } catch (error) {
    handleFileReadError(error, icsFileName)
    return // 避免后续执行
  }
  console.log(`[${new Date().getTime()}] 正在提取旧日历文件标题...`)
  const oldEvents = extractAllSummaries(oldIcsContent)

  const calResults = results.map((result) => createEvent(result))

  console.log(`[${new Date().getTime()}] 正在创建新事件列表...`)
  // calEvents存储createEvent函数返回的每个事件对象
  for (const match of matches) {
    // 比赛是否为进行中
    if (match.live) {
      try {
        const { date } = await HLTV.getMatch({ id: match.id })
        match.date = date
        const event = createEvent(match)
        if (event) {
          calResults.push(event)
        }
      } catch (error) {
        console.error(
          `Error fetching live match data for match ID ${match.id}:`,
          error,
        )
      }
    } else {
      const event = createEvent(match)
      if (event) {
        calResults.push(event)
      }
    }
  }

  // // 使用数组存储events
  // const calEvents = matches
  //   .filter((match) => !match.live)
  //   .map((match) => createEvent(match))
  //   .filter(Boolean)
  // calResults.push(...calEvents)

  console.log(`[${new Date().getTime()}] 正在比较旧事件和新事件列表...`)
  // 检查新旧事件列表长度及每个事件标题是否相同，若相同则认为日历文件未发生变化，跳过更新
  if (
    oldEvents.length === calResults.length &&
    areEventsEqual(oldEvents, calResults)
  ) {
    console.log(`[${new Date().getTime()}] 日历文件没有变化，跳过更新！`)
    return
  }
  try {
    const { error, value } = ics.createEvents(calResults)

    if (error) {
      console.error("Failed to create events:", error) // 简化错误输出，保留基本的错误信息展示
      return
    }

    console.log("Events created successfully:")
    console.log(value)

    // 将events数组写入ICS文件
    await fs.writeFile(icsFileName, value)
    console.log(`[${new Date().getTime()}] 日历文件创建成功！`)
  } catch (exception) {
    console.error(`Error during event creation or file writing: ${exception}`)
  }
}

module.exports = { processMatchesData }
