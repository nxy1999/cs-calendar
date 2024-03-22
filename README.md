# cs-calendar
CS赛事日历，ICS格式，可供IPhone、Google Calendar、Outlook等客户端订阅

## 使用方法
推荐使用订阅方法，不推荐使用ics文件导入

## 订阅地址
- GitHub订阅地址（科学上网）：https://github.com/nxy1999/cs-calendar/raw/master/matches_calendar.ics

## 已经实现的部分
- [x] 比赛添加标题以及时间
- [x] 添加备注
- [x] 谷歌日历导入后备注出现乱码
- [x] 每个小时更新一次日历信息
- [x] API 不稳定， hltv 有反爬，通过多次获取已解决
- [x] 时区问题
- [x] 如果获取到的数据没有更改，日历文件也不修改

## 目前还没有实现的内容
- [ ] 自动获取下一次赛事的id？怎么过滤赛事
- [ ] github iOS端手动更新问题

## 未来可能会添加的内容
- [ ] 正在比赛的数据怎么处理？
- [ ] 已经结束的比赛要获取比分吗？

## 感谢
https://github.com/gigobyte/HLTV
