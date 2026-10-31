# General (概述)

## 快速开始：waGOLD 主页

<img src="./assets/images/tutorial/01-home.webp" width="100%" alt="waGOLD 主页标注图">

**1. 顶部导航栏。** 可直接进入 Species、Search、HOC distribution、Filter by Events、MicroCollinearity、Download 和 FAQ。

**2. 主页标题区。** waGOLD 是一个交互式 webserver，用于研究禾本科物种中的基因起源、丢失和复制事件。

**3. What is a HOC?** 同源基因簇（Homologous Gene Cluster, HOC）的定义与示意图。

**4. Start exploring。** 六个功能卡片，每个卡片都预填了示例。可直接修改 ID 后点击按钮，打开对应页面并自动运行示例。

**5. News。** 网站更新记录，包括 FastAPI 后端上线和论文接收信息。

**6. Citation。** 如果使用 GoldMiner 或 waGOLD，请引用这里列出的论文。

## 同源基因簇（HOCs）示例

![examples-of-hoc](./assets/images/example-of-hoc.svg)

HOC 的鉴定过程包括三个连续步骤：

1. **单基因组内的簇鉴定（N=1）：** 在每个基因组内，根据基因组邻近性和序列相似性鉴定基因簇。基因用不同颜色的形状表示，相同颜色表示属于同一个簇。
2. **成对基因组比较（N=2）：** 通过在共线性基因之间建立连接，鉴定成对基因组间的同源基因簇。匹配的颜色和连接线表示基因顺序与方向得到保留。
3. **多基因组 HOC 构建（N ≥ 3）：** 整合多个成对比较，构建跨基因组的 HOC。最终得到的 HOC（HOC1–HOC9）代表进化上保守的基因簇。灰色阴影标出每个 HOC 的边界。

## 说明

waGOLD 提供交互式可视化、数据导出（PNG、SVG、PDF 和表格）以及外部数据库链接。表单工具使用编号步骤引导输入。大多数模块上方是输入区，下方是输出区。

每个 `Example` 按钮都会填入一组有效示例。建议先运行示例，了解输出格式后再输入自己的 Gene ID 或 HOC ID。

# Species (物种)

<img src="./assets/images/tutorial/02-species.webp" width="100%" alt="Species 页面标注图">

**1. 物种系统发育树。** 树的拓扑来自 GoldMiner，展示数据库中 25 个禾本科基因组之间的关系。点击分支可筛选右侧表格。

**2. 搜索框。** 可按物种名、基因组缩写或登录号过滤，例如 `Triticum` 或 `Traes`。

**3. 基因组表格。** 显示物种、染色体组符号、组装统计、登录号和参考文献。

**4. 分页控件。** 可翻页或调整每页显示行数。

# Search (搜索)

<img src="./assets/images/tutorial/03-search-overview.webp" width="100%" alt="Search 页面查询与统计图标注">

**1. 按 HOC 或 Gene ID 搜索。** 输入 `HOC000121` 或 `TraesCS5B02G182000` 等 ID，然后点击 `Search`。

**2. 进化轨迹摘要。** 根据 HOC 推断起源、复制和丢失事件，并根据成员基因给出可能的功能描述。

**3. 功能注释。** 交互式饼图，显示 HOC 内基因的功能分类和比例。

**4. 不同谱系的基因数。** 箱线图显示 HOC 基因数在各谱系中的分布。

**5. 进化树与共线性。** 该组合图包含：
- **物种树（左）：** 末端数字是每个物种中的基因数；祖先节点数字是推断的祖先基因数。圆圈、方块、三角和叉号分别表示起源、复制、收缩和丢失事件。
- **热图（中）：** 颜色越红表示基因数越多，灰色表示 0。
- **微共线性图（右）：** 当前 HOC 的基因高亮显示，其他 HOC 的基因为灰色。点击任意基因可查看 Gene ID、HOC ID、基因组位置和功能描述。

<img src="./assets/images/tutorial/03-search-table.webp" width="100%" alt="Search 结果表格标注">

**6. 各组装中的基因。** 表格列出谱系、组装、染色体、基因数和 Gene ID。表格上方按钮可下载表格、CDS 序列和蛋白序列。

# HOC Distribution (HOC 分布)

<img src="./assets/images/tutorial/04-distribution.webp" width="100%" alt="HOC distribution 页面标注">

**1. 输入 HOC。** 例如 `HOC000001`。

**2. 选择组装。** 选择要绘制分布的参考基因组组装。

**3. Plot。** 点击 `Plot` 运行分析。

**4. 输出。** 灰色条带表示所选组装的染色体；彩色区块表示 HOC 的位置和基因数。鼠标悬停可查看数量。

# Filter by Events (按事件筛选)

<img src="./assets/images/tutorial/05-filter.webp" width="100%" alt="Filter by Events 页面标注">

**1. Original Node。** 单选：选择 HOC 起源的位置。

**2. Duplication Node。** 多选：选择发生复制的谱系。

**3. Shrink Node。** 多选：选择发生收缩的谱系。

**4. Loss Node。** 多选：选择发生丢失的谱系。图中示例选择了 *Avena* 中的丢失事件。

**5. 物种树。** 标记会随选择实时更新。点击标记可取消该选择。

**6. Run。** 点击 `Run` 检索匹配的 HOC；`Clear all` 清空选择。

**7. 结果。** 匹配的 HOC 按谱系和组装分组显示，可查看或下载结果表。

# MicroCollinearity (微共线性)

waGOLD 可以可视化一个 Gene ID 周围在多个禾本科组装之间的微共线性。

<img src="./assets/images/tutorial/06-micro.webp" width="100%" alt="MicroCollinearity 页面标注">

**1. 输入 Gene ID。** 例如 `TraesCS7A02G540300`。

**2. 包含该基因的组装。** 选择包含查询基因的参考组装。

**3. 选择比较组装。** 勾选一个或多个比较组装。可使用 Wheat A/B/D、Barley、Rice、Maize 快捷按钮，也可在列表中过滤。

**4. 参数与 GO。** 设置邻域基因数量，选择 `one-to-many` 和 `Real spacing`，然后点击 `GO`。

**5. 输出。** 图中显示基因和同源连接线。查询基因用红色高亮；连线颜色区分一对一和一对多关系。只有查询区域附近存在共线性区块的组装才会显示。点击任意基因可查看详情和外部链接。

# Download (下载)

<img src="./assets/images/tutorial/07-download.webp" width="100%" alt="Download 页面标注">

**1. 选择样本。** 从下拉框选择一个样本组装。

**2. Download。** 下载该样本的 HOC / gene2clu2loc 表格。

**3. Gene 或 HOC 查询。** 输入一个或多个 Gene ID 或 HOC ID，用 `;` 或 `,` 分隔，例如 `TraesCS5B02G182000;HOC000001`。

**4. Search。** 运行查询。

**5. 结果。** 结果表显示每个查询基因或 HOC 对应的谱系和组装。

# Tips (提示)

- 所有 `Example` 按钮都会填入有效示例，可直接运行。
- 图表可导出为 PNG、SVG 或 PDF。点击 `Full` 可全屏查看。
- 手机上密集图表可横向滑动。全屏后可手指拖动或用鼠标拖动平移。
- 点击 `Full` 会尝试让支持的移动浏览器横屏；iOS 不支持自动横屏，请手动旋转设备。
- 截图中的编号与上方步骤一一对应。
