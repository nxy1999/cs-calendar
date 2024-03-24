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

    old_first_summary = extract_first_summary(old_ics_content)

    cal = Calendar()

    events_to_add = []
    for match in matches:
        if match['live']:  # 忽略正在进行的比赛
            continue

        event = create_event(match, timezone)
        if event:
            events_to_add.append(event)
            if old_first_summary and old_first_summary == event.name:
                print("First SUMMARY unchanged. No update needed.")
                return

    cal.events.add(*events_to_add)  # 一次性添加所有事件
    try:
        with open(ics_file_name, 'w', encoding='utf8') as f:
            f.write(cal.serialize())
        print("日历文件创建成功！")
    except IOError as e:
        print(f"Error writing to {ics_file_name}: {e}")


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
            break  # 添加break语句，避免不必要的等待

        except ValueError as e:
            print(f"Attempt {attempt + 1} failed due to: {e}")
            break  # 添加break语句，避免不必要的等待

        except Exception as e:
            print(f"Unexpected error during Attempt {attempt + 1}: {e}")
            break  # 添加break语句，避免不必要的等待

        finally:
            if attempt < max_attempts - 1:
                time.sleep(delay)
                delay *= 2

    print("获取比赛数据失败")
    raise SystemExit(1)


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
