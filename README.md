>**⚠️警告： 由于上游API不再维护，日程功能已失效，现在只能查看比分**

# cs-calendar
CS赛事日历，ICS格式，可供IPhone、Google Calendar、Outlook等客户端订阅

## 使用方法
日历app导入

推荐使用网址进行订阅，不推荐使用ics文件导入（不能更新）



## 订阅地址
- **Gitee 订阅地址（推荐使用，国内上网）**：https://gitee.com/nie-momo/cs-calendar/raw/master/matches_calendar.ics
- GitHub 订阅地址（科学上网）：https://github.com/nxy1999/cs-calendar/raw/master/matches_calendar.ics
- GitHub 仓库地址：https://raw.githubusercontent.com/nxy1999/cs-calendar/master/matches_calendar.ics


## 已经实现的部分
- [x] 比赛添加标题以及时间
- [x] 添加备注
- [x] 谷歌日历导入后备注出现乱码
- [x] 每个小时更新一次日历信息
- [x] API 不稳定， hltv 有反爬，通过多次获取已解决
- [x] 时区问题
- [x] 如果获取到的数据没有更改，日历文件也不修改
- [x] github iOS端手动更新问题
- [x] 过滤International LAN赛事
- [x] 换用js语法，抛弃Python
- [x] 已经结束的比赛获取比分

## 目前还没有实现的内容
- [ ] 支持订阅某个队伍的所有比赛

## 未来可能会添加的内容
- [ ] 比赛添加提醒

## 感谢
https://github.com/gigobyte/HLTV

https://github.com/adamgibbons/ics
