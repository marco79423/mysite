import datetime as dt

import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
import matplotlib.font_manager as font_manager


tree = ET.parse('每人每月薪資.xml')
root = tree.getroot()


data_set = dict()
for series_node in root.findall('./DataSet/Series'):
    item_name = series_node.get('ITEM')

    if "資訊及通訊傳播業" not in item_name:
        continue

    race = item_name[9]  # 男 or 女 (我就是想用 race，咬我啊)

    def parse_salary(node):
        if node.get('OBS_VALUE') != '':
            return float(node.get('OBS_VALUE'))
        else:
            return None

    expression = './SeriesProperty[@SERIESTYPE="原始值"]/*'
    data_set[race] = [parse_salary(node) for node in series_node.findall(expression)]


font = font_manager.FontProperties(fname='./mingliu.ttc')
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(1, 1, 1)

for race in data_set:
    data = data_set[race]
    ax.plot(list(range(1973, 2016)), data, '-', label=race)


ax.set_title("歷年來「資訊及通訊傳播業」和男女薪水比較", fontsize=25, fontproperties=font)
ax.set_ylabel("收入", fontproperties=font, fontsize=20)

legend = ax.legend(loc='upper left', shadow=True)
for label in legend.get_texts():
    label.set_fontsize(25)
    label.set_font_properties(font)

plt.show()
