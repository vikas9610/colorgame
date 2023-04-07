-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 01:12 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `colorgame`
--

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `referral_from` varchar(255) DEFAULT NULL,
  `referral_to` varchar(255) DEFAULT NULL,
  `maintainance_status` varchar(255) DEFAULT NULL,
  `maintainance_message` varchar(255) DEFAULT NULL,
  `withdrawal_open_time` time DEFAULT NULL,
  `withdrawal_close_time` time DEFAULT NULL,
  `global_setting` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `referral_from`, `referral_to`, `maintainance_status`, `maintainance_message`, `withdrawal_open_time`, `withdrawal_close_time`, `global_setting`, `createdAt`, `updatedAt`) VALUES
(1, '10', '20', '0', 'test', '21:16:37', '18:51:21', '0', '2023-04-03 10:34:41', '2023-04-03 10:34:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `betting_status` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `referral_code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `mobile`, `password`, `balance`, `betting_status`, `status`, `referral_code`, `createdAt`, `updatedAt`) VALUES
(1, 'VIKAS', 'test@gmail.com', '9610747636', '$2a$10$WN0kVPR6L8fB0uyVpwlut.Qg75MjdxsTb0E8u/JzNTEodFUHPDUxe', 0, 0, 1, 'W16C57', '2023-04-03 09:47:27', '2023-04-03 09:47:27'),
(2, 'VIKAS', 'test@gmail.com', '7023437636', '$2a$10$.6/gaaQOtPWwt/P8MaBghOHlx36wFVOGH1dOrYWnRy0XMX0SC/.La', 0, 0, 1, 'W33Y40', '2023-04-03 15:40:35', '2023-04-03 15:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `txn_note` longtext DEFAULT NULL,
  `date` date DEFAULT NULL,
  `txn_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_id`, `operator`, `amount`, `txn_note`, `date`, `txn_id`, `createdAt`, `updatedAt`) VALUES
(1, '1', '+', '0', 'Referral Bonus', '2023-04-03', 'O8116Q6589H8758', '2023-04-03 09:47:27', '2023-04-03 09:47:27'),
(2, '2', '+', '0', 'Referral Bonus', '2023-04-03', 'R9585V1642M0277', '2023-04-03 15:40:35', '2023-04-03 15:40:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
