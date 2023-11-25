-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2023 at 11:42 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--
CREATE DATABASE IF NOT EXISTS `supermarket` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `supermarket`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL,
  `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cartId`, `userId`, `date`, `state`) VALUES
(1, 1, '2023-04-11', 1),
(38, 1, '0000-00-00', 1),
(172, 1, '0000-00-00', 1),
(225, 1, '0000-00-00', 1),
(241, 1, '0000-00-00', 1),
(242, 1, '0000-00-00', 1),
(243, 1, '0000-00-00', 1),
(244, 1, '0000-00-00', 1),
(245, 1, '0000-00-00', 1),
(246, 1, '0000-00-00', 1),
(247, 1, '2023-04-23', 1),
(249, 1, '2023-04-23', 1),
(251, 1, '2023-04-24', 1),
(252, 1, '2023-04-24', 1),
(297, 1, '2023-04-24', 1),
(299, 1, '2023-04-24', 1),
(300, 1, '2023-04-24', 1),
(301, 1, '2023-04-24', 1),
(302, 1, '2023-04-25', 1),
(303, 1, '2023-04-24', 1),
(304, 1, '2023-04-24', 1),
(305, 1, '2023-04-24', 1),
(306, 1, '2023-04-24', 1),
(307, 1, '2023-04-24', 1),
(308, 1, '2023-04-25', 1),
(314, 1, '2023-05-08', 0),
(349, 999999, '2023-05-11', 1),
(350, 999999, '2023-05-11', 1),
(376, 999999, '2023-05-12', 1),
(377, 999999, '2023-05-12', 1),
(378, 999999, '2023-05-13', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cartsitems`
--

CREATE TABLE `cartsitems` (
  `cartItemsId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cartsitems`
--

INSERT INTO `cartsitems` (`cartItemsId`, `productId`, `productName`, `amount`, `price`, `cartId`) VALUES
(73, 5, 'לחמניות', 1, '10.00', 1),
(74, 2, 'חלב', 1, '5.50', 1),
(75, 4, 'לחם לבן פרוס', 0, '0.00', 1),
(76, 2, 'חלב', 1, '5.50', 1),
(77, 2, 'חלב', 1, '5.50', 1),
(78, 2, 'חלב', 1, '5.50', 1),
(79, 2, 'חלב', 1, '5.50', 1),
(80, 2, 'חלב', 0, '0.00', 1),
(81, 2, 'חלב', 0, '5.50', 1),
(82, 2, 'חלב', 0, '5.50', 1),
(83, 4, 'לחם לבן פרוס', 24, '165.60', 1),
(84, 2, 'חלב', 1, '5.50', 1),
(85, 2, 'חלב', 1, '5.50', 1),
(86, 2, 'חלב', 1, '5.50', 1),
(87, 2, 'חלב', 1, '5.50', 1),
(88, 2, 'חלב', 1, '5.50', 1),
(89, 2, 'חלב', 1, '5.50', 1),
(90, 2, 'חלב', 1, '5.50', 1),
(91, 2, 'חלב', 1, '5.50', 1),
(92, 4, 'לחם לבן פרוס', 55, '6.90', 1),
(93, 2, 'חלב', 1, '5.50', 1),
(94, 2, 'חלב', 1, '5.50', 1),
(95, 2, 'חלב', 1, '5.50', 1),
(96, 2, 'חלב', 1, '5.50', 1),
(97, 2, 'חלב', 1, '5.50', 1),
(98, 2, 'חלב', 1, '5.50', 1),
(99, 2, 'חלב', 1, '5.50', 1),
(100, 2, 'חלב', 1, '5.50', 1),
(101, 2, 'חלב', 1, '5.50', 1),
(102, 2, 'חלב', 1, '5.50', 1),
(103, 2, 'חלב', 1, '5.50', 1),
(104, 2, 'חלב', 1, '5.50', 1),
(105, 2, 'חלב', 1, '5.50', 1),
(106, 2, 'חלב', 1, '5.50', 1),
(107, 2, 'חלב', 1, '5.50', 1),
(108, 2, 'חלב', 1, '5.50', 1),
(109, 2, 'חלב', 1, '5.50', 1),
(110, 2, 'חלב', 8, '44.00', 38),
(111, 2, 'חלב', 1, '5.50', 172),
(112, 4, 'לחם לבן פרוס', 3, '20.70', 1),
(113, 2, 'חלב', 1, '5.50', 1),
(114, 2, 'חלב', 1, '5.50', 1),
(115, 2, 'חלב', 1, '5.50', 1),
(125, 2, 'חלב', 1, '5.50', 225),
(126, 4, 'לחם לבן פרוס', 1, '6.90', 225),
(143, 2, 'חלב', 1, '5.50', 241),
(144, 4, 'לחם לבן פרוס', 1, '6.90', 241),
(146, 2, 'חלב', 2, '11.00', 242),
(147, 4, 'לחם לבן פרוס', 1, '6.90', 242),
(148, 5, 'לחמניות', 3, '30.00', 242),
(149, 2, 'חלב', 1, '5.50', 243),
(150, 2, 'חלב', 1, '5.50', 244),
(151, 4, 'לחם לבן פרוס', 1, '6.90', 245),
(154, 2, 'חלב', 1, '5.50', 246),
(155, 2, 'חלב', 1, '5.50', 247),
(156, 2, 'חלב', 3, '16.50', 249),
(157, 2, 'חלב', 3, '16.50', 251),
(159, 4, 'לחם לבן פרוס', 1, '6.90', 251),
(160, 2, 'חלב', 1, '5.50', 252),
(161, 2, 'חלב', 1, '5.50', 252),
(162, 2, 'חלב', 1, '5.50', 252),
(163, 2, 'חלב', 1, '5.50', 252),
(164, 2, 'חלב', 1, '5.50', 252),
(165, 2, 'חלב', 1, '5.50', 252),
(171, 4, 'לחם לבן פרוס', 1, '6.90', 297),
(172, 5, 'לחמניות', 3, '30.00', 297),
(173, 2, 'חלב', 3, '16.50', 301),
(174, 2, 'חלב', 1, '5.50', 302),
(179, 4, 'לחם לבן פרוס', 5, '34.50', 307),
(321, 2, 'חלב', 1, '6.00', 349),
(322, 6, 'עגבניה', 1, '3.90', 349),
(323, 5, 'לחמניות', 1, '10.00', 349),
(324, 13, 'מלפפון חמוץ', 1, '4.50', 349),
(325, 12, 'פפסי מקס 1.5', 1, '5.50', 349),
(326, 11, 'קוקה קולה 1.5', 1, '6.50', 349),
(343, 13, 'מלפפון חמוץ', 1, '4.50', 350),
(344, 2, 'חלב', 1, '6.00', 350),
(345, 5, 'לחמניות', 1, '10.00', 350),
(381, 7, 'תפוח עץ', 1, '10.00', 376),
(471, 8, 'דג סלמון', 1, '68.00', 377);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`) VALUES
(1, 'פירות וירקות'),
(2, 'קפואים'),
(3, 'בשר'),
(4, 'דגים'),
(5, 'משקאות'),
(6, 'מאפים'),
(7, 'מוצרי חלב'),
(8, 'שימורים');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `creditCard` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `price`, `city`, `street`, `date`, `creditCard`) VALUES
(1, 1, 1, '174.20', 'admin', 'admin', '2023-04-20', 4564),
(2, 1, 1, '174.20', 'admin', 'admin', '2023-04-20', 4564),
(3, 1, 38, '44.00', 'admin', 'admin', '2023-04-20', 54612),
(4, 1, 172, '5.50', 'admin', 'admin', '2023-04-27', 456),
(5, 1, 225, '12.40', 'admin', 'admin', '2023-04-26', 3343),
(6, 1, 241, '12.40', 'admin', 'admin', '2023-04-19', 55),
(7, 1, 242, '47.90', 'admin', 'admin', '2023-04-10', 333),
(8, 1, 243, '5.50', 'admin', 'admin', '2023-04-18', 222),
(9, 1, 244, '5.50', 'admin', 'admin', '2023-04-18', 222),
(10, 1, 245, '6.90', 'admin', 'admin', '2023-04-10', 22),
(11, 1, 246, '5.50', 'admin', 'admin', '2023-04-23', 4546),
(12, 1, 247, '5.50', 'admin', 'admin', '2023-04-10', 646),
(13, 1, 249, '16.50', 'admin', 'admin', '2023-04-12', 333),
(14, 1, 251, '23.40', 'admin', 'admin', '2023-04-24', 111),
(15, 1, 252, '33.00', 'admin', 'admin', '2023-04-11', 23),
(16, 1, 297, '36.90', 'admin', 'admin', '2023-04-17', 55),
(17, 1, 301, '16.50', 'admin', 'admin', '2023-04-11', 222222),
(18, 1, 302, '5.50', 'admin', 'admin', '2023-04-10', 22),
(19, 1, 307, '34.50', 'admin', 'admin', '2023-04-17', 33333),
(23, 999999, 349, '36.40', 'user', 'user', '2023-05-23', 222222),
(29, 999999, 350, '20.50', 'user', 'user', '2023-05-24', 2147483647),
(30, 999999, 376, '10.00', 'user', 'user', '2023-05-24', 22222222),
(31, 999999, 377, '68.00', 'ירושלים', 'גג', '2023-05-30', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `imageName` varchar(199) NOT NULL,
  `price` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `categoryId`, `imageName`, `price`) VALUES
(2, 'חלב', 7, 'f59cf03f-c228-4f90-8bb5-e84005a352b6.jpg', '6.00'),
(4, 'לחם לבן פרוס', 6, '79371803-fc39-4895-89f2-ff7dc839bf39.jpg', '5.00'),
(5, 'לחמניות', 6, 'f5677c75-e31c-4d2d-848b-4a2ac0658504.jpg', '10.00'),
(6, 'עגבניה', 1, '1173a6dc-75c2-4f8b-974b-46cd400903c7.jpg', '3.90'),
(7, 'תפוח עץ', 1, 'd32d6169-47e3-4eb3-83f9-664efe8cd5fc.jpg', '10.00'),
(8, 'דג סלמון', 4, 'f81ded9c-17db-4878-9f58-47a182e5f593.jpg', '68.00'),
(9, 'שניצל תירס', 2, '1fc0b224-47c3-4eb4-8e17-cd9c45c83036.jpg', '32.00'),
(10, 'צ\'יפס קפוא', 2, '2e31a8d5-6b5c-4f4b-8eb7-92f6dbd45505.jpg', '20.00'),
(11, 'קוקה קולה 1.5', 5, 'a7cca83a-d14c-453c-9982-90ed3cd320bb.jpg', '6.50'),
(12, 'פפסי מקס 1.5', 5, '77f01388-a18f-4e9d-9e4d-c1b1701412d6.jpg', '5.50'),
(13, 'מלפפון חמוץ', 8, 'bd942ebf-bf79-4ee2-bb47-3f3f8341a50f.jpg', '4.50'),
(14, 'צלי בקר', 3, 'd1f834c8-0fb6-484c-a65d-4ae0853bee98.jpg', '85.00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(199) NOT NULL,
  `role` varchar(20) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`, `city`, `street`) VALUES
(1, 'admin', 'admin', 'admin', '71a553840b86ac9d97956dc03246a3776dd7ea9609b4f7fb7a7f98b33898e360146cc3c14fe2ff0d37ed43b57521deae3514f7a3af86932ae4a2a32005d127a9', 'Admin', 'admin', 'admin'),
(999999, 'user', 'user', 'useruser', '8880d7ecc4e035df0bf2da2a792de0d9ba5b675d49e9a59c4be62dffa94d0075fa7adbfd303b7e61913dd10af0f58ef0a9bcb3fc96e4d65a0785b8e7fd0494ba', 'User', 'user', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cartsitems`
--
ALTER TABLE `cartsitems`
  ADD PRIMARY KEY (`cartItemsId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=394;

--
-- AUTO_INCREMENT for table `cartsitems`
--
ALTER TABLE `cartsitems`
  MODIFY `cartItemsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=484;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cartsitems`
--
ALTER TABLE `cartsitems`
  ADD CONSTRAINT `cartsitems_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cartsitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `carts` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
