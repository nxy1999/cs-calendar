const { HLTV } = require("hltv")

// 测试代码
HLTV.getMatch({ id: 2372069 })
  .then((match) => console.log(match))
  .catch((error) => console.error("getMatches函数中发生未处理的错误:", error))
