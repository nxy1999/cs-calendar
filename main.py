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


# 提取ICS内容中所有SUMMARY的值
def extract_all_summaries(ics_content):
    summaries = []
    for line in ics_content.splitlines():
        if line.startswith("SUMMARY:"):
            summary = line[len("SUMMARY:"):].strip()
            summaries.append(summary)
    return summaries


def fetch_matches_data():
    """调用Node.js脚本获取比赛数据"""
    node_script = "node getMatches.js"
    try:
        result = subprocess.run(node_script, shell=True, capture_output=True, text=True, check=True, encoding='utf-8')
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {e.stderr}")
        raise


def create_event(match, timezone):
    """
    根据比赛数据创建一个事件。

    :param match: 包含比赛信息的字典。
    :param timezone: 时区对象。
    :return: 配置好的Event对象。
    """
    try:
        timestamp = match.get('date', 0) / 1000
        begin_time = datetime.fromtimestamp(timestamp, timezone)
        team1_name = match['team1']['name']
        team2_name = match['team2']['name']
        event_name = f"{team1_name} vs {team2_name}"
        stars = match.get('stars', 0)
        event_description = f"HLTV: {'★' * stars}\nHLTV: {match['stars']}星推荐\n赛制: {match['format']}\n赛事：{match['event']['name']}"
        event = Event()
        event.begin = begin_time
        event.name = event_name
        event.description = event_description
        return event
    except KeyError as e:
        print(f"Error creating event: {e}")
        return None


def process_matches_data(matches, ics_file_name='matches_calendar.ics', timezone=pytz.timezone('Asia/Shanghai')):
    """
    处理比赛数据，更新日历文件。

    :param matches: 包含比赛信息的列表。
    :param ics_file_name: 日历文件的名称。
    :param timezone: 要使用的时区。
    """
    try:
        with open(ics_file_name, 'r', encoding='utf8') as file:
            old_ics_content = file.read()
    except FileNotFoundError:
        old_ics_content = None

    # old_first_summary = extract_first_summary(old_ics_content)
    # old_all_summary = extract_all_summaries(old_ics_content)

    cal = Calendar()

    events_to_add = []
    for match in matches:
        if match['live']:  # 忽略正在进行的比赛
            continue

        event = create_event(match, timezone)
        if event:
            # # 检查新建的 event 的 name 是否已经存在于旧的 summary 列表中
            # if event.name in old_all_summary:
            #     print(f"SUMMARY '{event.name}' already exists in the calendar. No update needed.")
            #     return
            # else:
            #     print(f"SUMMARY '{event.name}' not found in the calendar. Adding...")
            events_to_add.append(event)
    for event in events_to_add:
        cal.events.add(event)

    try:
        with open(ics_file_name, 'w', encoding='utf8') as f:
            f.write(cal.serialize())
        print("日历文件创建成功！")
    except IOError as e:
        print(f"Error writing to {ics_file_name}: {e}")


def main():
    max_attempts = 10
    delay = 20
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

        except ValueError as e:
            print(f"Attempt {attempt + 1} failed due to: {e}")

        except Exception as e:
            print(f"Unexpected error during Attempt {attempt + 1}: {e}")

        finally:
            if attempt < max_attempts - 1:
                time.sleep(delay)

    print("获取比赛数据失败")
    raise SystemExit(1)


# 按间距中的绿色按钮以运行脚本。
if __name__ == '__main__':
    # 测试数据
    # matches_data = json.loads([{"id": 2370658, "date": 1711281600000, "stars": 2, "team1": {"name": "Complexity", "id": 5005},
    #                  "team2": {"name": "FaZe", "id": 6667}, "format": "bo3",
    #                  "event": {"id": null, "name": "PGL CS2 Major Copenhagen 2024"}, "live": false},
    #                 {"id": 2370659, "date": 1711292400000, "stars": 3, "team1": {"name": "Virtus.pro", "id": 5378},
    #                  "team2": {"name": "G2", "id": 5995}, "format": "bo3",
    #                  "event": {"id": null, "name": "PGL CS2 Major Copenhagen 2024"}, "live": false},
    #                 {"id": 2370660, "date": 1711303200000, "stars": 2, "team1": {"name": "Natus Vincere", "id": 4608},
    #                  "team2": {"name": "paiN", "id": 4773}, "format": "bo3",
    #                  "event": {"id": null, "name": "PGL CS2 Major Copenhagen 2024"}, "live": false},
    #                 {"id": 2370721, "date": 1711641600000, "stars": 3,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Quarter-final #1", "format": "bo3", "live": false},
    #                 {"id": 2370722, "date": 1711652400000, "stars": 3,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Quarter-final #2", "format": "bo3", "live": false},
    #                 {"id": 2370723, "date": 1711728000000, "stars": 3,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Quarter-final #3", "format": "bo3", "live": false},
    #                 {"id": 2370724, "date": 1711738800000, "stars": 3,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Quarter-final #4", "format": "bo3", "live": false},
    #                 {"id": 2370725, "date": 1711814400000, "stars": 4,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Semi-final #1", "format": "bo3", "live": false},
    #                 {"id": 2370726, "date": 1711825200000, "stars": 4,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Semi-final #2", "format": "bo3", "live": false},
    #                 {"id": 2370727, "date": 1711908000000, "stars": 5,
    #                  "title": "PGL CS2 Major Copenhagen 2024 - Grand Final", "format": "bo3", "live": false}])
    matches_data = main()

    if matches_data:
        process_matches_data(matches_data)

    # print("成功获取比赛数据：", matches_data)
