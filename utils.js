/**
 * 将星级评价转换为星号符号字符串。
 * @param {number} stars - 代表星级评价的数字，范围应为非负整数。
 * @returns {string} 返回一个由星号("★")重复组成的字符串，长度等于输入的星级评价数。
 */
function starsToSymbols(stars) {
  return "★".repeat(stars)
}

function extractAllSummaries(icsContent) {
  const summaries = []
  for (const line of icsContent.split("\n")) {
    if (line.startsWith("SUMMARY:")) {
      const summary = line.slice("SUMMARY:".length).trim()
      summaries.push(summary)
    }
  }
  return summaries
}

// 提取错误处理逻辑到单独函数，提高代码可读性
function handleFileReadError(error, icsFileName) {
  if (error.code === "ENOENT") {
    console.warn(`File not found: ${icsFileName}`)
  } else if (error.code === "EACCES") {
    console.error(`Permission denied: ${icsFileName}`)
  } else {
    console.error(
      `An error occurred while reading the file: ${icsFileName}. Error: ${error.message}`,
    )
  }
}

// 比较两个事件列表是否相等的函数，提高性能效率
function areEventsEqual(oldEvents, newEvents) {
  if (oldEvents.length !== newEvents.length) return false

  // 优化比较逻辑，避免不必要的索引查找
  return oldEvents.every(
    (oldEvent, index) => oldEvent === newEvents[index].title,
  )
}

// 获取数据直到10次
async function getDataUntilMaxTimes(func) {
  const maxAttempts = 10
  const delay = 20
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      console.log(
        `[${new Date().getTime()}] ${func} 正在尝试 第${attempt + 1}次:`,
      )
      const dataResults = await func()
      console.log("dataResults", dataResults)
      if (dataResults && dataResults.length > 0) {
        return dataResults
      } else {
        console.log(
          `[${new Date().getTime()}] 尝试 ${attempt + 1}: No data returned, retrying...`,
        )
      }
    } catch (e) {
      if (e instanceof SyntaxError && e.name === "JSONDecodeError") {
        console.error("Error decoding JSON: ", e.message)
      } else if (e instanceof Error) {
        console.error(`Attempt ${attempt + 1} failed due to: ${e.message}`)
      } else {
        console.error(`Unexpected error during Attempt ${attempt + 1}: ${e}`)
      }
      if (attempt < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000))
      }
    }
  }
}

module.exports = {
  starsToSymbols,
  extractAllSummaries,
  handleFileReadError,
  areEventsEqual,
  getDataUntilMaxTimes,
}
