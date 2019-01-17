-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2019-01-17 02:50:42
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue-word`
--

-- --------------------------------------------------------

--
-- 表的结构 `achievement`
--

CREATE TABLE `achievement` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL COMMENT '用户名',
  `day` varchar(255) NOT NULL COMMENT '活跃天数',
  `wordnumber` varchar(255) NOT NULL COMMENT '答对单词个数',
  `nowordnumber` varchar(255) NOT NULL COMMENT '答错单词数',
  `dates` date NOT NULL COMMENT '日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `achievement`
--

INSERT INTO `achievement` (`id`, `name`, `day`, `wordnumber`, `nowordnumber`, `dates`) VALUES
(8, '潘皇璋', '1', '5', '30', '2018-05-31'),
(9, '杨学明', '1', '10', '10', '2018-05-12'),
(10, '廖俊', '1', '789', '108', '2018-09-12'),
(11, '何纯基', '1', '16', '3', '2018-06-09'),
(12, '林清鑫', '1', '161', '84', '2018-06-28'),
(13, '黄博滔', '0', '0', '1', '2018-08-02');

-- --------------------------------------------------------

--
-- 表的结构 `battle`
--

CREATE TABLE `battle` (
  `id` int(11) NOT NULL,
  `wordid` varchar(255) NOT NULL COMMENT '所有单词id',
  `time` datetime NOT NULL COMMENT '发起时间',
  `outtime` time NOT NULL COMMENT '答题时间',
  `enemy` varchar(255) NOT NULL COMMENT '敌方',
  `initiating` varchar(50) NOT NULL COMMENT '发起用户',
  `type` varchar(10) NOT NULL COMMENT '是否完成状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='多人模式';

--
-- 转存表中的数据 `battle`
--

INSERT INTO `battle` (`id`, `wordid`, `time`, `outtime`, `enemy`, `initiating`, `type`) VALUES
(28, '132,130,129,131,121,127,133,134,123,126', '2018-01-31 15:37:06', '00:10:00', '陈钰城,Admin', '潘皇璋', 'false'),
(29, '122,130,127,126,128,123,124,134,131,133', '2018-01-31 16:05:14', '00:10:00', '王克怀', '潘皇璋', 'false'),
(30, '134,129,126,123,121,122,128,130,132,127', '2018-01-31 16:45:12', '00:10:00', '林清鑫', '潘皇璋', 'false'),
(31, '134,122,128,129,127,133,126,131,124,130', '2018-01-31 16:47:00', '00:10:00', 'Admin', '潘皇璋', 'false'),
(32, '130,136,145,127,138,131,123,133,122,141', '2018-02-01 16:03:52', '00:10:00', '王克怀', '潘皇璋', 'false');

-- --------------------------------------------------------

--
-- 表的结构 `day`
--

CREATE TABLE `day` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `days` date NOT NULL COMMENT '时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每日练习表';

--
-- 转存表中的数据 `day`
--

INSERT INTO `day` (`id`, `username`, `days`) VALUES
(14, '潘皇璋', '2018-03-31'),
(15, '陈钰城', '2018-04-03'),
(16, '潘皇璋 ', '2018-05-03'),
(17, '杨学明', '2018-05-12'),
(18, '潘皇璋 ', '2018-05-31'),
(19, '廖俊', '2018-06-03'),
(20, '廖俊', '2018-06-07'),
(21, '廖俊', '2018-06-08'),
(22, '廖俊', '2018-06-09'),
(23, '何纯基', '2018-06-09'),
(24, '廖俊', '2018-06-11'),
(25, '林清鑫', '2018-06-19'),
(26, '廖俊', '2018-06-19'),
(27, '林清鑫', '2018-06-20'),
(28, '林清鑫', '2018-06-22'),
(29, '廖俊', '2018-06-22'),
(30, '林清鑫', '2018-06-25'),
(31, '林清鑫', '2018-06-26'),
(32, '林清鑫', '2018-06-28'),
(33, '廖俊', '2018-08-02'),
(34, '廖俊', '2018-08-31'),
(35, '廖俊', '2018-09-01'),
(36, '廖俊', '2018-09-04'),
(37, '廖俊', '2018-09-06'),
(38, '廖俊', '2018-09-08'),
(39, '廖俊', '2018-09-11'),
(40, '廖俊', '2018-09-12');

-- --------------------------------------------------------

--
-- 表的结构 `mycollection`
--

CREATE TABLE `mycollection` (
  `id` int(11) NOT NULL,
  `wordid` int(11) NOT NULL COMMENT '单词id',
  `username` varchar(50) NOT NULL COMMENT '用户名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏表';

--
-- 转存表中的数据 `mycollection`
--

INSERT INTO `mycollection` (`id`, `wordid`, `username`) VALUES
(1, 4, '林清鑫'),
(2, 2, 'admin');

-- --------------------------------------------------------

--
-- 表的结构 `word`
--

CREATE TABLE `word` (
  `id` int(11) NOT NULL,
  `english` varchar(50) NOT NULL COMMENT '英文',
  `chinese1` varchar(50) NOT NULL COMMENT '中文',
  `chinese2` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL COMMENT '用户',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `time` datetime NOT NULL COMMENT '时间',
  `encryption` varchar(255) NOT NULL COMMENT '加密'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单词表';

--
-- 转存表中的数据 `word`
--

INSERT INTO `word` (`id`, `english`, `chinese1`, `chinese2`, `user`, `type`, `time`, `encryption`) VALUES
(2, 'she', '她', '她的', '潘皇璋', '称谓', '2018-02-07 15:17:26', '32d693b35fc709cd2698f72ab3dad482ce13f15f'),
(3, 'my', '我', '我的', '潘皇璋', '称谓', '2018-02-07 15:17:43', '067cf29b32af5ca5033b37c285686f2e3adf6099'),
(4, 'disk', '磁盘', '光盘', '林清鑫', '名词', '2018-02-07 15:17:46', 'f88703818e5fe7cfc2aa0acbbf9a17981ecead77'),
(5, 'information', '信息', '数据', '陈钰城', '名词', '2018-04-03 14:56:51', '42f25bc0cb3e3fd144c97e22616f2bc979da7bb8'),
(6, 'computer', '电脑', '计算机', '陈钰城', '名词', '2018-04-03 14:58:03', '794a432ce1f061cb2c5472e53281b05a1bde79d9'),
(7, 'web', '网络', '网', '陈钰城', '名词', '2018-04-03 14:58:32', '4a27e73eb1abe6136d454999f53ba8480b4e07ea'),
(8, 'design', '设计', '计划', '陈钰城', '动词', '2018-04-03 14:58:58', 'eaecf0932d2fefaa4c419ffccdcda506347df67c'),
(9, 'development', '开发', '发展', '陈钰城', '名词', '2018-04-03 15:01:59', 'c5e020e720d336d0f24a10671015c9b0d82f8c77'),
(10, 'create', '创造', '创作', '廖俊', '动词', '2018-05-03 11:37:58', 'ed50777f1f96c89966b1311213a2af94e4c487da'),
(11, 'function', '功能', '函数', '黄博滔', '名词', '2018-05-03 14:11:05', '648ea9456287380987563fa5087cbd6258ed6c7b'),
(12, 'layout', '布局', '布局', '何纯基', '名词', '2018-05-03 19:57:48', '690f47a8d22a0f4eb4ff62a499c8f4af77a8ac51'),
(13, 'an', '一个', '一', '陈纪盛', '量词', '2018-05-03 19:59:15', '4ef8c5dbedeaf647ea91526800d759487ca4a3c2'),
(14, 'element', '元素', '要素', '廖俊', '名词', '2018-05-04 09:38:16', 'a1560d52aa0f59e668d0ac3134b7b1320f3b8783'),
(15, 'code', '代码', '编码', '何纯基', '名词', '2018-05-04 09:40:31', 'da003425b9b46224a89d557d52ccbac2c9ee4dbb'),
(16, 'format', '格式', '设计一个版式', '陈纪盛', '名词', '2018-05-04 18:22:38', '407f512ac591904196ae283d7d1a30c784bf8303'),
(17, 'file', '保存文件', '文件', '陈纪盛', '名词', '2018-05-04 18:23:32', '63e27cd9801db6c59776882a0da8ce67694ca072'),
(18, 'database', '数据库', '信息库', '陈纪盛', '名词', '2018-05-04 18:24:06', 'c4f8ca31fab4752278e4e693634e8d163c4def2d'),
(19, 'use', '使用', '用', '陈纪盛', '动词', '2018-05-04 18:24:33', '6dbc425038b1a063c6de955d7f7ab25834bfd7d2'),
(20, 'if', '如果', '假设', '陈纪盛', '连词', '2018-05-04 18:25:20', '4cdf44a8af98b7777227a4cb663270a7a2b7d05f'),
(21, 'command', '控制', '命令指挥的', '陈纪盛', '名词,形容词', '2018-05-04 18:26:53', '3d521c9a8cd651dba17d436caf1ffbf2072038f6'),
(22, 'line', '行', '数量', '陈纪盛', '名词', '2018-05-04 18:27:34', 'e327c5e6cb2343332f98a8c9dc013846fa93d9ca'),
(23, 'list', '列表', '菜单', '陈纪盛', '名词', '2018-05-04 18:27:52', 'f8331937bb06d3ad9a39308701193701ea17d684'),
(24, 'code', '代码', '码', '陈纪盛', '名词', '2018-05-04 18:28:40', 'f599c353f8b0797e1369691ee567f646e89d1670'),
(25, 'change', '改变', '更改', '陈纪盛', '不及物动词', '2018-05-04 18:29:04', '642827222a8f85eebdb0dc7bfe879477fcb79c00'),
(26, 'else', '其他', '否则', '黄博滔', '形容词', '2018-05-05 08:22:08', 'bb8e48d30dbb2c5ccd6dae607f943fac82c1eed2'),
(27, 'progress', '进步', '提升', '何纯基', '名词', '2018-05-07 10:25:17', '757144872a7c73fc52ae32bc7cb5c9b323662de5'),
(28, 'copy', '复制', '复制体', '何纯基', '名词', '2018-05-09 08:11:39', '181f6c6f58d0e8fe1284d2fd6e325080c5677464'),
(29, 'slide', '滑动', '下跌', '廖俊', '动词', '2018-05-30 08:42:44', '21de51c7f18861f3ad8f314944a7901d8834d787'),
(30, 'Randomcolor', '随机颜色', '随机', '何纯基', '名词', '2018-05-30 08:44:06', 'afcbf4791ad7c9351db669d6bc06ce208219a009'),
(31, 'ready', '准备好的', '现成的', '廖俊', '形容词', '2018-05-30 08:50:45', '8b2f87c78f10d8ac58f61e7b02d7d41802482511'),
(32, 'coffee', '咖啡', '咖啡粉', '廖俊', '名词', '2018-06-02 09:21:20', '7657c0fd18a4d5ac28c96ffd8e4922bf09c1795c'),
(33, 'down', '向下', '下', '廖俊', '副词', '2018-06-02 09:26:22', 'd42719f4c89d89049986bc3035513e26fb92de1e'),
(34, 'English', '英语', '英国的', '廖俊', '名词,形容词', '2018-06-02 09:28:07', 'e26893aa8cd8e992b8a1bb6d6b2f5e42af5ea1c7'),
(35, 'prepend', '预先考虑', '预谋', '廖俊', '不及物动词', '2018-06-03 20:05:40', '24cd1146ea5a420334a20e7d5f871ff240cc4bc3'),
(36, 'append', '追加', '添加', '廖俊', '不及物动词', '2018-06-03 20:08:42', '263371c7bd75d579df2029916bd70357fbdeecc2'),
(37, 'underground', '地下', '地下', '何纯基', '名词', '2018-06-05 14:41:32', '9fccf3606bc350f4ec9dc6e8945139a412fab7e0'),
(38, 'move', '移动', '改变', '廖俊', '及物动词,名词', '2018-06-06 09:03:21', 'ebace7d1076f058046b03ecfe7bed2a7ea711c9d'),
(39, 'back', '背', '后背', '廖俊', '名词', '2018-06-06 09:07:36', 'ef6c4868d82fda872cb0e790c9a6acd2fc23dc7c'),
(40, 'pink', '粉红色', '粉红色的', '廖俊', '名词,形容词', '2018-06-06 09:08:45', 'd3e3ab2125f272fd8d4f30c4dd9ae96555a541a5'),
(41, 'green', '绿色的', '绿化蔬菜', '廖俊', '形容词,名词', '2018-06-06 09:10:43', '549a763302b0881ae525348d7acc68016234cb6f'),
(42, 'I', '我', '自己', '何纯基', '名词', '2018-06-07 08:36:40', 'df5790d7a141d9c298acf89d86536fbcecec0e0e'),
(43, 'am', '是', '是的', '何纯基', '名词', '2018-06-07 08:37:15', '85deb0c392f256eab68d3d33728dd9dbc6f097f2'),
(44, 'Come', '来', '来', '何纯基', '名词', '2018-06-07 08:38:30', 'ae0be50113ef906125fc3526ad177601e662717d'),
(45, 'since', '自', '自', '何纯基', '名词', '2018-06-07 08:39:33', '9466c4b26338418b1203587f3fb1c2c524166680'),
(46, 'China', '中国', '中华', '何纯基', '名词', '2018-06-07 08:40:00', 'cb338d5dda009e4e836fee609516541cb9f4b157'),
(47, 'Manufacture', '制造', '制造', '何纯基', '名词', '2018-06-07 08:40:23', 'c54fa9a107033efc7df6b4969c5e13d711f96810'),
(48, 'hotel', '旅馆', '饭店', '廖俊', '名词', '2018-06-07 10:45:51', '6ada4294a7885fdfa877e92aaa64da3578733b90'),
(49, 'boolean', '布尔数学体系的', '布尔', '廖俊', '形容词', '2018-06-07 10:48:47', 'de7959ac6572a3e3e587ab24dd50636198095fa5'),
(50, 'integer', '整数', '整体', '廖俊', '名词', '2018-06-07 10:49:54', '07aed99c4a0e51eb1bf802878f45b2074796e334'),
(51, 'Coder', '编码器', '编码员', '廖俊', '名词', '2018-06-07 10:50:47', '548dbc8e9e056ca7e877aca8f4a77f212c27ab68'),
(52, 'drag', '拖', '拖累', '廖俊', '名词,及物动词', '2018-06-07 19:01:15', '39de9329b301ec6f70d903f776bc648813462457'),
(53, 'default', '未履行', '拖欠', '廖俊', '名词', '2018-06-07 19:12:03', 'a10a6f4cba739fb31020bbc703eeef982503c0cd'),
(54, 'prevent', '预防', '阻止', '廖俊', '及物动词', '2018-06-07 19:22:59', '9a5632ab0637333d09a4cbd0d1c033c9f7653a4c'),
(55, 'target', '目标', '目的', '廖俊', '名词', '2018-06-07 19:25:24', '567224dd93b388d0481dfbc9096f76341d2b07e8'),
(56, 'data', '资料', '数据', '廖俊', '名词', '2018-06-07 19:28:57', 'b26074daab1f7bb542ab49bc517d82a5d589679f'),
(57, 'start', '开始', '动身', '廖俊', '名词', '2018-06-08 09:03:22', '2c53451e8e9a8d24957cfe36e218285e990e6a67'),
(58, 'end', '结果', '终止', '廖俊', '名词', '2018-06-08 09:04:01', '8696b694891a210b85f1293c7ea06016663ce38e'),
(59, 'loss', '损失', '损耗', '廖俊', '名词', '2018-06-08 09:05:49', 'fcf2b54b358526991cf1680403a71c2962d95dae'),
(60, 'batch', '批', '批量', '廖俊', '名词', '2018-06-08 09:07:29', 'e1a2bdfb0e81cf196306b1333a76d9ea5583892d'),
(61, 'exact', '正确的', '准确的', '廖俊', '形容词', '2018-06-08 09:12:01', '0b7d5a1fcec732dee026097d32600e7aa4b0cd48'),
(62, 'over', '结束', '越过', '廖俊', '副词', '2018-06-08 09:24:35', '1bac57068557e0b016c5279e77d7fb4b51500d07'),
(63, 'clear', '明白', '清楚', '何纯基', '名词', '2018-06-08 09:48:59', '3891966272e34d589776b4e13720c5e7a69734d9'),
(64, 'transfer', '转移', '调动', '廖俊', '名词', '2018-06-08 19:41:45', '166871e2da4cb45d2d65a15a443e0e71584f0b5f'),
(65, 'file', '文件', '保存文件', '廖俊', '名词', '2018-06-09 14:28:11', '607524645513834baec5d4ef8aa95d61a3ab7b6c'),
(66, 'command', '命令', '指令', '廖俊', '名词', '2018-06-09 14:29:57', '853e0a1bbfd7aafdd94a9ada607ca69aeba5d04c'),
(67, 'use', '使用', '用途', '廖俊', '动词', '2018-06-09 14:31:25', '4257df2e27db132e796f18ccccf6f03785700628'),
(68, 'infinite', '无限的', '无穷的', '黄博滔', '形容词', '2018-06-09 15:57:07', 'a609898f524d5776e20694327cd8a33fe844f768'),
(69, 'token', '象征', '记号', '廖俊', '名词', '2018-06-10 20:07:52', 'c920d6f75c989be70d5984be17e3c77901547e4f'),
(70, 'program', '程序', '节目', '廖俊', '名词', '2018-06-11 14:13:15', 'b31f6e790af5853487e638cac109274e6337e2b8'),
(71, 'line', '行', '线路', '廖俊', '名词', '2018-06-11 14:16:28', '6c18137152f0f1b70e93af7156a8c21637d0f7e2'),
(72, 'display', '显示', '显示器', '廖俊', '及物动词', '2018-06-11 14:17:12', '1a2180b5cc96fef9969e7d9e0ec6d957bdd64285'),
(73, 'set', '设置', '集合', '廖俊', '动词,名词', '2018-06-13 08:26:33', '2e731b59e22d1ac7e9841863a5d4a9d1286af6e7'),
(74, 'key', '键', '关键字', '廖俊', '名词', '2018-06-13 08:27:01', 'ada9d27093d7a5bd260519e316608ed59ab198e8'),
(75, 'list', '列表', '显示', '廖俊', '名词', '2018-06-13 08:27:18', '31b385e7cbfb4d7cd8a9622dd321528ff5210003'),
(76, 'gift', '礼物', '赠品', '廖俊', '名词', '2018-06-13 11:40:00', '8447a26a8e79dcaad69b93f5bfc146f41233192a'),
(77, 'by', '凭', '靠', '廖俊', '介词', '2018-06-14 08:22:18', '11c9b858d3dc5bfb4b8b7e6488793a4e43635054'),
(78, 'press', '按', '压', '廖俊', '动词', '2018-06-14 08:23:05', 'c65c0589daa1a63c67f331bdd0e097a1c41f4eaa'),
(79, 'with', '与', '用', '廖俊', '介词', '2018-06-14 08:24:11', 'cebd02cab988844aaa4ec95b160323d085dd9ba4'),
(80, 'format', '格式', '板式', '廖俊', '名词', '2018-06-15 14:10:08', '2383cae8da1ac3d7e01ec1a49390f0c7d4628794'),
(81, 'rules', '规则', '规章', '林清鑫', '名词', '2018-06-19 16:04:34', 'f1dbb126c4cebd231130cea90bcb71116728ee4c'),
(82, 'normal', '正常的', '正规的', '林清鑫', '形容词', '2018-06-19 16:06:40', '7d10d7cdf50869c2b306d2e39f30476c1aa2ce9e'),
(83, 'change', '更换', '改变', '廖俊', '动词', '2018-06-19 19:10:00', '984f08bf7e8531a550ef00e96aff41165b26206a'),
(84, 'cursor', '光标', '指针', '廖俊', '名词', '2018-06-19 19:11:11', 'a961ae8d281c4e903d78f4dfa5db2bba10545a16'),
(85, 'local', '本地的', '局部的', '廖俊', '形容词', '2018-06-19 19:57:43', '5d47726c507b8227b679b4670be2c0252ad8350f'),
(86, 'storage', '存储', '仓库', '廖俊', '名词', '2018-06-19 19:58:48', '3f268cd1d965e41dd87712448ab411bb1123bde9'),
(87, 'directory', '目录', '索引薄', '廖俊', '名词', '2018-06-20 08:32:05', '55b21b2141ab9ef44ca6ea608fc13825ecc80348'),
(88, 'from', '从', '来自', '廖俊', '介词', '2018-06-20 08:33:19', '0f17363e5c109f03841c377207be7e781e884946'),
(89, 'menu', '菜单', '目录', '廖俊', '名词', '2018-06-20 08:33:43', '4449f97ddb028b603e0164928de4ec7aa0e82b95'),
(90, 'correct', '正确的', '合适的', '林清鑫', '形容词', '2018-06-20 10:05:08', '1c1f19e2610d8110620678d6bcc6dbba40234716'),
(91, 'option', '选项', '选择', '廖俊', '名词', '2018-06-21 08:18:48', 'e8cf5a0532bfedc46e1efca6536bd8ff892982a2'),
(92, 'character', '字符', '符号', '廖俊', '名词', '2018-06-21 08:21:09', 'a15e9406d1e5f485b3f57a2537f6dfc4c4139b44'),
(93, 'current', '电流', '水流', '廖俊', '名词', '2018-06-21 08:22:00', '300cb511d5e11179fc0456c411e90a842de4d4cc'),
(94, 'file', '文件', '档案', '黄博滔', '名词', '2018-06-21 08:28:24', '61ae8ae6edea08d57bfef05ca6840b7cb3ee3c9b'),
(95, 'year', '年', '年纪', '黄博滔', '名词', '2018-06-21 08:32:37', '2ca36df8d7419f9effbe5e379fe93136e5f945e4'),
(96, 'day', '白天', '一天', '黄博滔', '名词', '2018-06-21 08:33:24', '71a4de73ad7b8ec4d49e34edc647a7b3e176d445'),
(97, 'time', '时间', '时刻', '黄博滔', '名词', '2018-06-21 08:34:12', 'b7e79b3248b657ce6cbe6b6f9fa3f107de2f00af'),
(98, 'hour', '小时', '时间', '黄博滔', '名词', '2018-06-21 08:36:43', '9c182d4f3a21bc84b7f4b8f0d82feb2fc68b8c60'),
(99, 'minute', '分钟', '瞬间', '黄博滔', '名词', '2018-06-21 08:37:45', 'ae01222ebccbff84180afed1475098a510204b45'),
(100, 'seconds', '秒', '助手', '黄博滔', '名词', '2018-06-21 08:39:49', 'a551ba888790eb92a464d4d3d2b1073ce8fd006c'),
(101, 'length', '长度', '长', '吴梓源', '名词', '2018-06-22 09:19:31', 'a60da25b80db880cf66327dbf9d1f616e7d47774'),
(102, 'type', '型', '类型', '廖俊', '名词', '2018-06-23 08:21:11', '4e0a2b16d4d15ba615b59c37098d5b8d11bf5a67'),
(103, 'screen', '屏幕', '屏', '廖俊', '名词', '2018-06-23 08:21:56', '7c70c6f5f9d384002527d599c90be88ce191908e'),
(104, 'specify', '指定', '规定', '廖俊', '动词', '2018-06-23 08:22:58', '39a3cf7319a785e4810f68226f2c3b731d00508e'),
(105, 'reader', '读者', '读物', '廖俊', '名词', '2018-06-28 08:25:47', 'aff181db20cf2171ca657fac9f7cbf16d3925f90'),
(106, 'region', '地区', '范围', '廖俊', '名词', '2018-07-23 09:07:24', '21ee55e0413abc50607ee4327c94c8a7ed724524'),
(107, 'continue', '继续', '连续', '廖俊', '不及物动词', '2018-07-26 08:33:56', '639093350bad7d75ab1476026fe45e872af45a32'),
(108, 'about', '关于', '大约', '黄博滔', '介词', '2018-07-26 08:38:06', '35b568d9680f90083ffc8c6a517cda8bc700a865'),
(109, 'error', '错误', '过失', '黄博滔', '名词', '2018-07-26 08:40:40', '69393048519747c5739cd15ced860f0024410c61'),
(110, 'same', '同样的', '相同的', '黄博滔', '形容词', '2018-07-26 08:41:56', 'fd9b47b9c8bab1e203e3ff237c6ec96ebc06edb0'),
(111, 'message', '信息', '消息', '廖俊', '名词', '2018-07-26 08:44:56', '68deaba1ba8e25726e0179299bd6d727b8564ced'),
(112, 'disk', '盘', '磁盘', '廖俊', '名词', '2018-07-26 08:46:55', 'ee504d829be3ee6de9d79c494dc081de7a9af9e0'),
(113, 'text', '正文', '文本', '廖俊', '名词', '2018-07-26 08:47:11', 'd5c5e48a9754c58537848de3c7473d57c5d13e71'),
(114, 'drive', '驱动器', '推进力', '廖俊', '名词', '2018-07-26 08:49:12', '00011034a978d6478cc3c91efb6b43ddacf722aa'),
(115, 'run', '跑', '移动', '黄博滔', '不及物动词', '2018-07-26 08:50:46', '9489a50e4691dcd4204b95fa20091c00dd13e2e3'),
(116, 'shift', '改变', '换档', '黄博滔', '不及物动词', '2018-07-26 08:53:43', '5f4dbad3ca3708528ea251cac02abe5b2332e440'),
(117, 'hide', '隐藏', '躲避', '黄博滔', '及物动词', '2018-07-26 09:03:50', '475db93a2d35ed2223bf40c8b5a5707b599a7fb8'),
(118, 'show', '显示', '表演', '黄博滔', '名词', '2018-07-26 09:04:57', '0e9643d1ea24a71f4640ece53f3a8aa643b94a6e'),
(119, 'slow', '慢的', '迟钝的', '黄博滔', '形容词', '2018-07-26 09:13:32', 'bf0ff4e286dfc2069bcc923c55a38b1f68360026'),
(120, 'fast', '快的', '紧的', '黄博滔', '形容词', '2018-07-26 09:14:42', 'bc4ab93f7beeec3381197846c80a1df4c6716153'),
(121, 'info', '信息', '情报', '廖俊', '名词', '2018-07-26 09:43:45', 'e29d851c3ab765e515ecd566f8c848bb2b9cd851'),
(122, 'see', '看', '看出', '廖俊', '动词', '2018-07-31 08:37:01', '81794a4ab9a50dbd83590377e2eb3fe9e0a0e574'),
(123, 'record', '记录', '记载', '廖俊', '名词', '2018-07-31 08:38:28', '7d0729496b7787a58680e97c11496acb688f156b'),
(124, 'box', '箱', '框', '廖俊', '名词', '2018-07-31 08:39:24', '2ed7f85f4eb189016df424917a532a811fd9dcd3'),
(125, 'database', '数据库', '资料库', '廖俊', '名词', '2018-07-31 08:40:05', '06545e1aa5f9a1e733789f2058b0c8fb7deb2e9e'),
(126, 'help', '帮助', '有用', '廖俊', '名词', '2018-08-01 09:31:29', '1b2f7384b8e576399e359a6d9be24e3563883c5b'),
(127, 'memroy', '记忆存储', '存储器', '廖俊', '名词', '2018-08-01 09:32:50', '89bd7f94eb09c7971ce23a80fa76fedd31ac1aad'),
(128, 'all', '全', '全部', '廖俊', '形容词', '2018-08-01 09:36:56', '754c4bf0b4f3d906c06186ee0da37b09a12e83fc'),
(129, 'player', '播放机', '演员', '廖俊', '名词', '2018-08-01 09:59:01', '5d59be36b97ee732de0c7ed859d94a8030a9a60c'),
(130, 'songs', '歌曲', '歌唱', '廖俊', '名词', '2018-08-01 11:13:01', 'b975141124e8872525294c8c76f0d0a57087a357'),
(131, 'which', '哪个', '哪一个', '廖俊', '代词', '2018-08-02 08:31:08', 'b19a875ae73b9052504805aba558e8cf1bd39640'),
(132, 'on', '使用着的', '状态', '廖俊', '形容词', '2018-08-02 08:33:18', 'abef339df1075baf27460913c49a3676f6483595'),
(133, 'copy', '复制', '拷贝', '廖俊', '名词', '2018-08-02 08:34:00', 'b9e34c8175bcdd7da1fbb6e8b945cad0c7ab0366'),
(134, 'base', '基础', '基于', '廖俊', '名词', '2018-08-02 08:36:55', 'efc204e00c101215505b8796114dcc2ed76a85a3'),
(135, 'hours', '小时', '固定时间', '廖俊', '名词', '2018-08-16 10:08:12', '475ee3dafb139759d94724c7d8f1f21e415b4916'),
(136, 'Minutes', '分', '分钟', '廖俊', '名词', '2018-08-16 10:08:52', 'f1a0ef0f21ceb75d5013ebb143ce86df5949d273'),
(137, 'Seconds', '秒', '秒钟', '廖俊', '名词', '2018-08-16 10:09:30', '57477cf30e341082707dfb374fc5c7da0160b1d3'),
(138, 'date', '日期', '日子', '廖俊', '名词', '2018-08-16 10:10:09', '303bbb4833109eb1b696b884df98f20ffbdc221a'),
(139, 'Month', '月', '月份', '廖俊', '名词', '2018-08-16 10:10:40', 'cdb884c9fd546fd14fe6470de8220b875812b7c5'),
(140, 'year', '年', '年级', '廖俊', '名词', '2018-08-16 10:11:46', 'c4afb72c63ada1746d1fcca878274832f90a6b96'),
(141, 'method', '方法', '条理', '廖俊', '名词', '2018-08-23 10:08:25', 'f84c68f004e10f0f5bb64119ec8daba6b08b03d8'),
(142, 'component', '成分', '组分', '廖俊', '名词', '2018-08-23 10:09:26', 'b44c7c1de51aa5dce19f9bb18e21d525b2694061'),
(143, 'computed', '计算', '估算', '廖俊', '动词', '2018-08-23 10:20:54', '5decf477402155b8f3696e6ed8aef6b57f10ed57'),
(144, 'template', '模板', '样板', '廖俊', '名词', '2018-08-23 10:25:46', 'a207c89ed90b0d8b7925ed588ce79e1f5e1d47ed'),
(145, 'props', '道具', '小道具', '廖俊', '名词', '2018-08-23 10:29:41', '759605742eb42c673ac88cbfdb8bfa05943881d7'),
(146, 'install', '安装', '安顿', '廖俊', '及物动词', '2018-08-23 15:47:51', '022a37cfdaaf11a6f0aaa6d5dbde1ec1f967eb80'),
(147, 'required', '需要', '需求', '廖俊', '形容词', '2018-08-31 11:13:39', 'a884ab1e176ce63dbd20b538d3283ccf34627236'),
(148, 'slot', '插槽', '狭槽', '廖俊', '名词', '2018-09-01 10:18:53', '97902d0feb9c481ad4258a9192d30600c8fc3d61'),
(149, 'scope', '眼界', '见识', '廖俊', '名词', '2018-09-01 10:20:46', '8129b1130e8dc4064c4be72f059f58a635625ae5'),
(150, 'classify', '分类', '归类', '林清鑫', '动词', '2018-09-03 08:42:54', '8a738300455c3747912103dcd752664368777a3b'),
(151, 'key', '键', '键位', '陈纪盛', '名词', '2018-09-04 16:32:48', '3652e535cf554cb2846c23417bedd5289aca4015'),
(152, 'mark', '标记', '加标记', '陈纪盛', '名词', '2018-09-05 11:27:22', '18e9c31935f6f7d199b100afdb21afc26e35d1d1'),
(153, 'enter', '回车', '送入', '陈纪盛', '名词、', '2018-09-05 11:27:47', '791d2deebb0873fc07c2a284ebf0b0c7c935f5c4'),
(154, 'button', '按钮', '控件', '陈纪盛', '名词', '2018-09-05 11:28:19', '6fda9e9a0df5424f7b05058a9151c0fcb5e5a2df'),
(155, 'value', '内容', '值', '陈纪盛', '名词', '2018-09-05 11:28:38', '6507d1f4c79301e78dd6b8adf70a637d2b9715c9'),
(156, 'topic', '标题', '题目', '陈纪盛', '名词', '2018-09-05 11:30:00', '01f40e1c1c112a7a21fca8b18b5a5280bbbc9d71'),
(157, 'index', '下标', '索引', '陈纪盛', '名词', '2018-09-05 11:30:59', '8c3bbe80c681da9caf0490622f41970ef943cd88'),
(158, 'order', '命令', '指令', '陈纪盛', '不及物动词', '2018-09-05 11:32:49', '801d187ede2ce1a2602e6557e70e6a8dd747a87b'),
(159, 'ttile', '题目', '标题', '陈纪盛', '名词', '2018-09-05 11:33:16', '181f80d8e31ad0e9fa4ffefc2e59791192abfc97'),
(160, 'global', '全局', '全局的', '陈纪盛', '名词,形容词', '2018-09-05 11:45:05', '32bc851786512be0a64a63f9c4a77490d0e2a220'),
(161, 'marker', '标记', '记号', '陈纪盛', '名词', '2018-09-05 11:45:42', '482d927ab7c5a1673616df3f10afc704ef8d4a89'),
(162, 'wait', '等待', '等候', '陈纪盛', '名词', '2018-09-05 11:46:14', '4aafce3217e36a6eec4a0bec0cf78656a01f1bc7'),
(163, 'option', '设置', '可选项', '陈纪盛', '名词', '2018-09-05 11:48:10', '7ccade4fc732d13f3c1ee8b91d320d2dc0986600'),
(164, 'box', '箱', '匣', '陈纪盛', '名词', '2018-09-05 18:04:30', 'dae5b4cd4b536d9310075ff0660cda79c051f26e'),
(165, 'edit', '编辑', '编排', '陈纪盛', '不及物动词', '2018-09-05 18:13:42', '976226cd87b3ae7ce7c22b69ece9b345694da586'),
(166, 'two', '二', '两', '陈纪盛', '名词', '2018-09-05 18:15:43', 'c60f2a5c09548cc9989cbddb734c0dae47b03148'),
(168, 'box', '箱', '匣', '黄博滔', '名词', '2018-09-06 19:25:56', '82d228ad224e487ab7c1086c9282224a8b96678d'),
(169, 'shell', '壳', '外壳', '廖俊', '名词', '2018-09-08 08:43:52', 'd96bf63dc68e9eac3229305c9d6588060e177265'),
(170, 'delete', '删除', '去除', '廖俊', '及物动词', '2018-09-08 08:44:39', 'caba00c52d00cec5129752de156e1ec55beaaf32'),
(171, 'enter', '键入', '送入', '廖俊', '动词', '2018-09-08 08:45:49', '2dec5576496ad295b005ebe7d83e8ecae69b1a5e'),
(172, 'scroll', '纸卷', '上卷', '陈纪盛', '名词', '2018-09-08 09:00:24', '8a0c00b2e1bb8c3b5be5302732b6c9a04f53ac38'),
(173, 'execute', '实行', '实施', '陈纪盛', '动词', '2018-09-08 09:05:29', '35094886dc2e8c1ca8b7a9a9285877b08b99a25b'),
(174, 'run', '运行', '运转', '陈纪盛', '动词', '2018-09-08 09:06:51', 'dfddd35917556d61b32d4378cf85251074c33b2c'),
(175, 'stop', '暂停', '停止', '陈纪盛', '动词', '2018-09-08 10:12:33', '2d744ecd5a6c7745d68d5a7d8cffe456d3fbd862'),
(176, 'shell', '外壳', '壳', '陈纪盛', '名词', '2018-09-10 08:21:56', '8d864f2423534d3464b146ebde008793155073cb'),
(177, 'delete', '删除', '作废', '陈纪盛', '动词', '2018-09-10 08:22:20', '2df60152120d22d447e777a7dcb384e578366a77'),
(178, 'record', '记录', '记载', '陈纪盛', '名词', '2018-09-10 08:24:38', '05806026f89d73a84724d55cf1499843b588383f'),
(179, 'contains', '容纳', '包括', '陈纪盛', '不及物动词', '2018-09-10 16:38:51', '314d00230e1f3da9c8243c3f39a5593ab1fabcf2'),
(180, 'state', '状况', '情况', '廖俊', '名词', '2018-09-11 08:20:32', 'f78da57616081121343d19f1bc4fd88e9bbdadc9'),
(181, 'margin', '边缘', '边际', '廖俊', '名词', '2018-09-11 08:24:24', 'a3648e4c34e3672d65798b798aca7f520050245e'),
(182, 'mark', '记号', '斑点', '廖俊', '名词', '2018-09-11 08:25:22', '9afc56c3b5912f056f500413a6a61f45394bbc02'),
(183, 'also', '也', '还', '廖俊', '副词,连词', '2018-09-11 08:27:04', 'd1db287501bdb7035baa96c497585179f2b82485'),
(184, 'do', '做', '干', '廖俊', '动词', '2018-09-12 08:21:32', '3fb2f209beabb4ed12e83b9e88eda75d79552648'),
(185, 'information', '信息', '消息', '廖俊', '名词', '2018-09-12 08:22:47', '144dcc44e473f747019bdfc968f786f0ca95ccd0'),
(186, 'choos', '选择', '挑选', '廖俊', '动词', '2018-09-12 08:23:26', 'b31ef45e594342ed888fff87e7662f667750130a'),
(187, 'current', '电流', '电', '陈纪盛', '名词', '2018-09-12 20:24:09', 'beb60dd1448b72c9a9b70ac2524f29ff420212e9'),
(188, 'drive', '驱动', '驱动器', '陈纪盛', 'screen', '2018-09-12 20:29:26', '932e59dd37fbab3031e0b82e9c720dbf8331a7da'),
(189, 'screen', '屏幕', '屏蔽', '陈纪盛', '不及物动词', '2018-09-12 20:30:23', 'f0ef6040ddbfa0a1721a7e4af3feb388759f584b'),
(190, 'margin', '内边距', '余量', '陈纪盛', '名词', '2018-09-12 20:32:15', '4eb31acda1df7b70382dc35aac9d27d1f16cc053'),
(191, 'memory', '记忆储存', '记忆', '陈纪盛', '名词', '2018-09-12 20:32:31', '15887d1ed3f8a1a708d7cb11e1626cfe1b118da3'),
(192, 'escape', '逃离', '逃跑', '陈纪盛', '动词', '2018-09-12 20:34:15', '003e28d50b950a56ffc856eb123d502cf4c63923'),
(193, 'callback', '回收', '回调', '廖俊', '名词', '2018-10-26 09:16:51', '5e6a7868523ac7b30e889583776aec70e5e92d82'),
(194, 'request', '请求', '要求', '廖俊', '名词', '2018-10-26 09:17:17', '590f08928f4f80f1415f6a8e6874627e206b9595'),
(195, 'application', '应用', '适用', '廖俊', '名词', '2018-10-26 09:17:47', '804eeb91941cab964810ca766a8d0fcec2bcb7ee'),
(196, 'group', '组', '团队', '廖俊', '名词', '2018-10-26 09:18:03', 'd9fbff4934a94bcfc91977785b638d868bed99fe'),
(197, 'wrapper', '包装器', '封套', '廖俊', '名词', '2018-10-26 09:18:48', '8c1b3c0bff818c494189d43cc2596e397f4053fa'),
(198, 'result', '结果', '胜利', '廖俊', '名词', '2018-10-26 09:19:22', '659b0d37e9359bf0cbcf3b1ef20d917623e0c7b5'),
(199, 'operation', '操作', '作用', '廖俊', '名词', '2018-10-26 09:20:07', '46aa3ca7321ba38da7e06cf888a2a1007ca0cbd9'),
(200, 'address', '地址', '通信处', '廖俊', '名词', '2018-10-26 09:20:25', 'd4801b9064101df4a40db408e17813221b215e2b'),
(201, 'increment', '增加', '增量', '廖俊', '名词', '2018-10-26 09:20:51', '226e7640fa54778a32ec250bb002eaa8bf7861d3'),
(202, 'primary', '主要的', '原始的', '廖俊', '形容词', '2018-10-26 09:21:23', '7e2f7c23620f07882dbe14a10caf9afd4a42bb8b'),
(203, 'mask', '面具', '掩饰', '廖俊', '名词,及物动词', '2018-10-26 09:24:34', '4daf52b44703bdf3f1467dccb746ae5082388ffb'),
(204, 'order', '秩序', '规则', '廖俊', '名词', '2018-10-26 10:03:16', '0fc7d224995739e8b51f84a3c6b1e7238200fe3c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `battle`
--
ALTER TABLE `battle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mycollection`
--
ALTER TABLE `mycollection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `achievement`
--
ALTER TABLE `achievement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- 使用表AUTO_INCREMENT `battle`
--
ALTER TABLE `battle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- 使用表AUTO_INCREMENT `day`
--
ALTER TABLE `day`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- 使用表AUTO_INCREMENT `mycollection`
--
ALTER TABLE `mycollection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `word`
--
ALTER TABLE `word`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
