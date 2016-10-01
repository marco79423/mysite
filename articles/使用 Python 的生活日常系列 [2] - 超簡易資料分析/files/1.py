import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
import matplotlib.font_manager as font_manager


tree = ET.parse('每人每月薪資.xml')
root = tree.getroot()


data_set = dict()
for series_node in root.findall('./DataSet/Series'):
    item_name = series_node.get('ITEM')

    # 先只計算合計，不管男女
    if '合計' not in item_name:
        continue

    industry = item_name.replace("-合計(新台幣元)", "")

    data_set[industry] = float(series_node.find(
        './SeriesProperty[@SERIESTYPE="原始值"]/Obs[@TIME_PERIOD="2015"]'
    ).get('OBS_VALUE'))

# 行業列表(根據薪資排序)
industries = sorted(data_set, key=lambda industry: data_set[industry])

# 對應的薪資列表
salaries = [data_set[industry] for industry in industries]

# 設定中文字體
font = font_manager.FontProperties(fname='./mingliu.ttc')

# 建立一個可以實際放圖表的地方 (figsize 可以指定大小)
fig = plt.figure(figsize=(20, 20))

# 在上面建一個可以畫圖的區域 Axes
ax = fig.add_subplot(1, 1, 1)

# http://matplotlib.org/api/lines_api.html
ax.barh(range(len(industries)), salaries)

ax.set_title("歷年來「資訊及通訊傳播業」和其他行業比較", fontsize=25, fontproperties=font)

ax.set_xlabel("收入", fontproperties=font, fontsize=20)

ax.set_ylim([0, len(industries)])
ax.set_ylabel("行業類別", fontproperties=font, fontsize=20)
ax.set_yticks([a + 0.5 for a in range(len(industries))])
yticklabels = ax.set_yticklabels(industries, fontproperties=font, fontsize=16)

target_label = yticklabels[industries.index("資訊及通訊傳播業")]
target_label.set_color('red')

plt.show()
