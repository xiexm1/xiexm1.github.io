# 1. 什么是 Goldminer

## 1.1 Goldminer 的工作流程

![goldminer](assets\images\goldminer-workflow.png)
图 1. Goldminer 的核心工作流程

**Goldminer** 使用同源基因簇 (HOCs) 作为研究基因进化的基本单位，并以层级化的方式对从跨物种到跨属级别的泛基因组 HOCs 进行比对。

## 1.2 命令
```sh
goldminer -h
```

```sh
# 程序: GoldMiner (一个用于同源基因簇 'HOC' - 起源、丢失和复制挖掘的工具)
# 版本: 1.0.0
# 
# 用法: goldminer <命令> [选项]
# 
# 子命令包括:
# 
# [ 流水线 ]
#      TDGFinder      步骤2: 识别每个基因组中的基因簇 (N = 1)
#      PairLink       步骤3: 连接成对基因组间的基因簇 (N = 2)
#      MultiCluster   步骤4: 构建所有基因组中的基因簇共线性网络 (N ≥ 3)
#      OdlRecon       步骤5&6: 基因簇的起源、丢失和复制推断
# 
# [ 工具 ]
#      HocAliPlot     两个基因组间 HoC 比对的点阵图
# 
# 作者:    Xie,Xiaoming
# 邮箱:     xiexm@cau.edu.cn
# 主页:  https://github.com/xiexm1/goldminer
```

# 2. 安装

## 2.1 环境要求

**Goldminer** 是用 `R` 和 `python` 实现的，需要以下三个可在您的 `PATH` 中执行的外部命令行工具：

- R ≥ 4.0
- R 包: `igraph`, `reshape2`, `dplyr`, `parallel`, `data.table`
- Python 3.x
- MCL 工具 (用于聚类分析)

## 2.2 安装
在安装 **Goldminer** 之前，应确保上述工具均已可用。获取 **Goldminer** 的简单方法如下：

- 1. 从 [Github](https://github.com/xiexm1/goldminer) 下载最新版本的 **Goldminer**。我们目前仅提供 Linux 64位版本。
```sh
git clone https://github.com/xiexm1/goldminer.git
```
- 2. 运行脚本安装 **Goldminer**
```sh
cd goldminer
./install.sh
```
- 3. 如有需要，将 **Goldminer** 添加到您的系统 PATH
```sh
vi ~/.sh_profile
# 将以下行添加到 ~/.sh_profile 文件末尾
export PATH=/path/to/goldminer/:$PATH
source ~/.sh_profile
```
- 4. 查看 **Goldminer** 的帮助信息
```sh
goldminer -h
```

# 3. 快速开始

## 步骤 1: 基因组比较分析
该工具依赖 **genetribe** 进行基因组间的核心基因比较。genetribe 是一个用于基因共线性和直系同源分析的基础框架。

有关 genetribe 及其功能的更多详细信息，请访问 [genetribe 网站](https://chenym1.github.io/genetribe/) 和 [TGT 数据库](http://wheat.cau.edu.cn/TGT/)。
```sh
genetribe core -l rice -f rice
genetribe core -l aet -f aet
genetribe core -l aet -f rice
```

## 步骤 2: 识别基因簇
使用 TDGFinder 识别每个基因组中的基因簇：
```sh
goldminer TDGFinder -f data_path -b genome_bed_path -o output_path -s subgenome_info_file -t num_threads -d max_distance
```

参数:
- `-f/--one2many`: one2many 文件路径
- `-b/--bed`: bed 文件路径
- `-o/--output`: 输出文件路径
- `-t/--threads`: 并行使用的线程数
- `-d/--distance`: 串联基因的最大距离
- `-s/--subgenome`: 亚基因组信息文件

## 步骤 3: 连接成对基因组间的基因簇
使用 PairLink 连接成对基因组间的基因簇：
```sh
goldminer PairLink -l first_genome_prefix -f second_genome_prefix -o output_path -c cluster_path -i iblocks_path -b blocks_path -t num_threads
```

参数:
- `-l/--first`: 第一个文件的前缀名
- `-f/--second`: 第二个文件的前缀名
- `-t/--threads`: 并行使用的线程数
- `-o/--out`: 连接文件的输出路径
- `-c/--clu`: 基因簇文件路径
- `-i/--iblocks`: iblocks 文件路径
- `-b/--blocks`: blocks 文件路径

## 步骤 4: 构建基因簇共线性网络
使用 MultiCluster 构建所有基因组中的基因簇共线性网络：
```sh
goldminer MultiCluster -d output_directory -i input_directory -t genome_list_file -p output_prefix -c cluster_files_directory
```

参数:
- `-d/--dir`: 输出文件目录
- `-i/--input`: 输入文件目录
- `-c/--cluster`: 基因簇文件目录
- `-t/--table`: 基因组列表文件
- `-p/--prefix`: 输出文件的前缀

## 步骤 5&6: 推断进化事件
使用 OdlRecon 推断基因簇的起源、丢失和复制事件：
```sh
goldminer OdlRecon data_path file_prefix selected_groups
```

参数:
- `path`: 数据文件路径
- `prefix`: 数据文件前缀
- `selected_groups`: 所选物种组的逗号分隔字符串 (例如, 'D,A,B,Thinopyrum,Secale,Hordeum,Avena,Brachypodium,Oryza,Zea')

## 输出文件

- `.cludb` 文件: 基因簇数据库文件
- `.clu` 文件: 基因簇信息文件
- `.link` 文件: 基因组簇之间的映射文件
- `.matrix` 文件: 用于基因簇比较的宽格式矩阵