# 按 Shift+F10 执行或将其替换为您的代码。
# 按 双击 Shift 在所有地方搜索类、文件、工具窗口、操作和设置。

import subprocess
import json
import pytz
from ics import Calendar, Event
from datetime import datetime


# import datetime

# 星级推荐转换为星星符号
def stars_to_symbols(stars):
    star_symbol = '★'
    return star_symbol * stars


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':
    # 调用 Node.js 脚本获取比赛数据
    node_script = "node getMatchResults.js"
    result = subprocess.run(node_script, shell=True, capture_output=True, text=True)

    matches_json = result.stdout
    print(matches_json)
    # matches_data = {}
    try:
        matches_data = json.loads(matches_json)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        print("日历文件创建失败！")
        raise SystemExit

    # 测试数据
    # matches_data = [
    #     {"id": 2370597, "stars": 1, "team1": {"name": "ENCE", "id": 4869}, "team2": {"name": "Imperial", "id": 9455},
    #      "format": "bo1", "event": {"id": 7258, "name": "PGL CS2 Major Copenhagen 2024 Opening Stage"}, "live": True},
    #     {"id": 2370744, "stars": 0, "team1": {"name": "Arrow", "id": 12764},
    #      "team2": {"name": "SNOGARD Dragons", "id": 4598}, "format": "bo3",
    #      "event": {"id": 7743, "name": "Fragster League Season 5 Finals"}, "live": True},
    #     {"id": 2370558, "date": 1710684000000, "stars": 0, "team1": {"name": "SINNERS", "id": 10577},
    #      "team2": {"name": "UNiTY", "id": 12267}, "format": "bo3",
    #      "event": {"id": 7726, "name": "Tipsport Winter Cup 2024 Finals"}, "live": False},
    #     {"id": 2370558, "date": 1710684000000, "stars": 0, "format": "bo3", "event": {"id": 7726, "name": "Tipsport Winter Cup 2024 Finals"}, "live": False}
    # ]

    # 批量修改
    for item in matches_data:
        if 'live' in item and item['live'] == 'true':
            item['live'] = True
        if item['live'] == 'false':
            item['live'] = False

    # 创建日历事件
    cal = Calendar()

    for match in matches_data:
        print("match", match)
        event = Event()

        # 比赛还没开始
        if not match['live']:
            try:
                timestamp_ms = match['date']
                timestamp = timestamp_ms / 1000
                # 东八区时间
                eastern_eight = pytz.timezone('Asia/Shanghai')
                begin_time = datetime.fromtimestamp(timestamp, eastern_eight)
                event.begin = begin_time
            except KeyError as e:
                print(f"Error: Missing date information for match {match['date']}")
        else:
            continue

        try:
            team1_name = match['team1']['name']
            team2_name = match['team2']['name']
            event_name = f"{team1_name} vs {team2_name}"
            event.name = event_name
        except KeyError as e:
            print(f"Error: Missing team information for match {match['id']}")
            continue

        # 添加描述信息
        stars = match.get('stars', 0)  # 获取星级推荐数量，默认为 0
        star_symbols = stars_to_symbols(stars)
        # "stars": 1, "team1": {"name": "ENCE", "id": 4869}, "team2": {"name": "Imperial", "id": 9455},
        # "format": "bo1", "event": {"id": 7258, "name": "PGL CS2 Major Copenhagen 2024 Opening Stage"}, "live": True},
        event_description = f"HLTV: {star_symbols}\n" \
                            f"HLTV: {match['stars']}星推荐\n" \
                            f"赛制: {match['format']}\n" \
                            f"赛事：{match['event']['name']}"
        event.description = event_description

        cal.events.add(event)

    # 将日历写入.ics文件
    # with open('matches_calendar.ics', 'w', encoding='gbk') as f:
    #     f.write(cal.decode('utf-8').encode('gbk'))

    with open('matches_calendar.ics', 'w', encoding='utf8') as f:
        f.writelines(cal)

    print("日历文件创建成功！")
