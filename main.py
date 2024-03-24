# 按 Shift+F10 执行或将其替换为您的代码。
# 按 双击 Shift 在所有地方搜索类、文件、工具窗口、操作和设置。

import subprocess
import json
import sys
import time

import pytz
from ics import Calendar, Event
from datetime import datetime


# 星级推荐转换为星星符号
def stars_to_symbols(stars):
    return '★' * stars


# 简单提取ICS内容中第一个SUMMARY的值
def extract_first_summary(ics_content):
    for line in ics_content.splitlines():
        if line.startswith("SUMMARY:"):
            return line[len("SUMMARY:"):].strip()
    return None


def fetch_matches_data():
    """调用Node.js脚本获取比赛数据"""
    node_script = "node getMatches.js"
    try:
        result = subprocess.run(node_script, shell=True, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {e.stderr}")
        raise


def main():
    max_attempts = 10
    delay = 1
    for attempt in range(max_attempts):
        try:
            print(f"正在尝试 第{attempt + 1}次: ")
            matches_json = fetch_matches_data()
            if not matches_json.strip():
                print(f"Attempt {attempt + 1}: No data returned, retrying...")
                # 不立即continue，而是在循环末尾统一处理等待
            else:
                matches = json.loads(matches_json)
                return matches
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
        finally:
            time.sleep(delay)
            delay *= 2

    print("获取比赛数据失败")
    raise SystemExit(1)


def process_matches_data(matches):
    """
    # 不需要转换
    # 批量转换'live'字段
    for match in matches_data:
        match['live'] = match.get('live')
        # if 'live' in item and item['live'] == 'true':
        #     item['live'] = True
        # if item['live'] == 'false':
        #     item['live'] = False
    """

    try:
        with open('matches_calendar.ics', 'r', encoding='utf8') as file:
            old_ics_content = file.read()
    except FileNotFoundError:
        old_ics_content = None

    old_first_summary = extract_first_summary(old_ics_content)

    cal = Calendar()

    for match in matches:
        if match['live']:  # 忽略正在进行的比赛
            continue

        try:
            timestamp = match.get('date', 0) / 1000
            begin_time = datetime.fromtimestamp(timestamp, pytz.timezone('Asia/Shanghai'))
            team1_name = match['team1']['name']
            team2_name = match['team2']['name']
            event_name = f"{team1_name} vs {team2_name}"

            if old_first_summary and old_first_summary == event_name:
                print("First SUMMARY unchanged. No update needed.")
                return

            event = Event()
            event.begin = begin_time
            event.name = event_name
            stars = match.get('stars', 0)
            event.description = f"HLTV: {'★' * stars}\nHLTV: {match['stars']}星推荐\n赛制: {match['format']}\n赛事：{match['event']['name']}"
            cal.events.add(event)
        except KeyError as e:
            print(f"Error processing match: {e}")

    with open('matches_calendar.ics', 'w', encoding='utf8') as f:
        f.write(cal.serialize())
    print("日历文件创建成功！")


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':
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
    matches_data = main()

    if matches_data:
        process_matches_data(matches_data)

    # print("成功获取比赛数据：", matches_data)

'''
    # 批量修改
    for item in matches_data:
        # item['live'] = item.get('live') == 'true'
        if 'live' in item and item['live'] == 'true':
            item['live'] = True
        if item['live'] == 'false':
            item['live'] = False

    # 尝试读取现有的ICS文件
    try:
        with open('matches_calendar.ics', 'r', encoding='utf8') as file:
            old_ics_content = file.read()
        old_first_summary = extract_first_summary(old_ics_content)
    except FileNotFoundError:
        old_first_summary = None

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
        else:  # 比赛正在执行
            continue

        try:
            team1_name = match['team1']['name']
            team2_name = match['team2']['name']
            event_name = f"{team1_name} vs {team2_name}"
            event.name = event_name

            # 如果第一个SUMMARY发生变化，或文件不存在，则更新ICS文件
            if old_first_summary == event.name:
                print("First SUMMARY unchanged. No update needed.")
                raise SystemExit

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
    with open('matches_calendar.ics', 'w', encoding='utf8') as f:
        f.writelines(cal)

    print("日历文件创建成功！")
'''
