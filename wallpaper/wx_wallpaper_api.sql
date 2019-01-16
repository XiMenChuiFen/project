-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-09-04 04:33:13
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wx_wallpaper_api`
--

-- --------------------------------------------------------

--
-- 表的结构 `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `wx_id` varchar(200) NOT NULL COMMENT '用户id',
  `wallpaper_id` varchar(200) NOT NULL COMMENT '壁纸id',
  `url` varchar(255) NOT NULL COMMENT '壁纸url'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `collection`
--

INSERT INTO `collection` (`id`, `wx_id`, `wallpaper_id`, `url`) VALUES
(7, 'oaeXv0IGzZMwhJgYe4tkoiU53X2Y', '5b73e090e7bce75e0214b775', 'http://img5.adesk.com/5b73e090e7bce75e0214b775'),
(8, 'oaeXv0IGzZMwhJgYe4tkoiU53X2Y', '5b73e08de7bce75defa5c40c', 'http://img5.adesk.com/5b73e08de7bce75defa5c40c'),
(9, 'oaeXv0IGzZMwhJgYe4tkoiU53X2Y', '5b73e096e7bce75e91a0679e', 'http://img5.adesk.com/5b73e096e7bce75e91a0679e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
