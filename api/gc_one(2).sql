-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2021 at 10:47 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gc_one`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_account`
--

CREATE TABLE `tbl_account` (
  `account_id` int(11) NOT NULL,
  `account_username` varchar(200) NOT NULL,
  `account_password` varchar(200) NOT NULL,
  `account_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `account_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_account`
--

INSERT INTO `tbl_account` (`account_id`, `account_username`, `account_password`, `account_createdAt`, `account_updatedAt`) VALUES
(1, 'admin@seafarerinternational', '$2y$10$YmJkNzBjNGQ4Y2UwYmZmZODiGABshiI.yh4HWj.zRgTNVJ3H7Gbv6', '2021-10-23 12:06:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_archive`
--

CREATE TABLE `tbl_archive` (
  `archive_id` int(11) NOT NULL,
  `crew_id` int(11) NOT NULL,
  `ship_id` int(11) NOT NULL,
  `archive_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `archive_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_crew`
--

CREATE TABLE `tbl_crew` (
  `crew_id` int(11) NOT NULL,
  `ship_id` int(11) NOT NULL DEFAULT 0,
  `rank_id` int(11) NOT NULL,
  `crew_fname` varchar(100) NOT NULL,
  `crew_mname` varchar(100) DEFAULT NULL,
  `crew_lname` varchar(100) NOT NULL,
  `crew_contract` varchar(200) NOT NULL,
  `crew_status` int(11) NOT NULL DEFAULT 1,
  `crew_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `crew_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_crew`
--

INSERT INTO `tbl_crew` (`crew_id`, `ship_id`, `rank_id`, `crew_fname`, `crew_mname`, `crew_lname`, `crew_contract`, `crew_status`, `crew_createdAt`, `crew_updatedAt`) VALUES
(3, 0, 1, 'Bernie', 'Legua', 'Inociete', 'http://localhost/RAITE_GC_Team1/api/uploads/202110230915420.pdf', 1, '2021-10-23 15:15:42', NULL),
(8, 0, 2, 'Nicole', '', 'Marcial', 'http://localhost/RAITE_GC_Team1/api/uploads/202110230946150.pdf', 1, '2021-10-23 15:46:15', NULL),
(9, 0, 6, 'Gordon', '', 'College', 'http://localhost/RAITE_GC_Team1/api/uploads/202110231045210.pdf', 1, '2021-10-23 16:45:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rank`
--

CREATE TABLE `tbl_rank` (
  `rank_id` int(11) NOT NULL,
  `rank_name` varchar(100) NOT NULL,
  `rank_qty` int(11) NOT NULL,
  `rank_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `rank_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_rank`
--

INSERT INTO `tbl_rank` (`rank_id`, `rank_name`, `rank_qty`, `rank_createdAt`, `rank_updatedAt`) VALUES
(1, 'Master/Captain', 1, '2021-10-23 13:00:47', NULL),
(2, 'Chief Mate (Chief Officer)', 1, '2021-10-23 13:01:48', NULL),
(3, 'Second Mate (Second Officer)', 1, '2021-10-23 13:02:50', NULL),
(4, 'Third Mate (Third Officer)', 1, '2021-10-23 13:02:58', NULL),
(5, 'Deck Cadet', 2, '2021-10-23 13:03:04', '2021-10-23 13:03:22'),
(6, 'Chief Engineer', 1, '2021-10-23 13:03:36', NULL),
(7, 'Second Engineer', 1, '2021-10-23 13:03:56', NULL),
(8, 'Third Engineer', 1, '2021-10-23 13:04:01', NULL),
(9, 'Fourth Engineer', 1, '2021-10-23 13:04:04', NULL),
(10, 'Engine Cadet', 2, '2021-10-23 13:04:18', NULL),
(11, 'Electrician', 3, '2021-10-23 13:04:37', NULL),
(12, 'Boatswain (Bosun)', 1, '2021-10-23 13:05:01', NULL),
(13, 'Pump Man', 3, '2021-10-23 13:05:09', NULL),
(14, 'Able-Bodied Seaman (AB)', 4, '2021-10-23 13:05:24', NULL),
(15, 'Ordinary Seaman (OS)', 4, '2021-10-23 13:05:38', NULL),
(16, 'Fitter', 2, '2021-10-23 13:05:47', NULL),
(17, 'Oiler', 2, '2021-10-23 13:05:54', NULL),
(18, 'Wiper (Motorman)', 2, '2021-10-23 13:06:06', NULL),
(19, 'Chief Cook', 1, '2021-10-23 13:06:16', NULL),
(20, 'Steward', 3, '2021-10-23 13:06:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ship`
--

CREATE TABLE `tbl_ship` (
  `ship_id` int(11) NOT NULL,
  `ship_speed_id` int(11) NOT NULL,
  `ship_name` varchar(200) NOT NULL,
  `ship_status` int(11) NOT NULL DEFAULT 1,
  `ship_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `ship_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_ship`
--

INSERT INTO `tbl_ship` (`ship_id`, `ship_speed_id`, `ship_name`, `ship_status`, `ship_createdAt`, `ship_updatedAt`) VALUES
(1, 1, 'GC Cruise Ship', 1, '2021-10-23 13:09:01', NULL),
(2, 1, 'Gordon College', 1, '2021-10-23 15:52:50', NULL),
(3, 2, 'RAITE ', 1, '2021-10-23 16:45:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ship_speed`
--

CREATE TABLE `tbl_ship_speed` (
  `ship_speed_id` int(11) NOT NULL,
  `ship_speed_class` varchar(200) NOT NULL,
  `ship_speed_knots` float NOT NULL,
  `ship_speed_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `ship_speed_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_ship_speed`
--

INSERT INTO `tbl_ship_speed` (`ship_speed_id`, `ship_speed_class`, `ship_speed_knots`, `ship_speed_createdAt`, `ship_speed_updatedAt`) VALUES
(1, 'Normal', 23, '2021-10-23 11:47:17', NULL),
(2, 'Slow Streaming', 19, '2021-10-23 11:47:17', NULL),
(3, 'Extra Slow Streaming', 16.5, '2021-10-23 11:47:56', NULL),
(4, 'Minimal Costs', 13.5, '2021-10-23 11:47:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `transaction_id` int(11) NOT NULL,
  `transaction_no` int(11) NOT NULL,
  `transaction_eta` int(11) NOT NULL,
  `transaction_origin_longitude` varchar(200) NOT NULL,
  `transaction_origin_latitude` varchar(200) NOT NULL,
  `transaction_destination_longitude` varchar(200) NOT NULL,
  `transaction_destination_latitude` varchar(200) NOT NULL,
  `transaction_createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `transaction_updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_account`
--
ALTER TABLE `tbl_account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `tbl_archive`
--
ALTER TABLE `tbl_archive`
  ADD PRIMARY KEY (`archive_id`);

--
-- Indexes for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  ADD PRIMARY KEY (`crew_id`);

--
-- Indexes for table `tbl_rank`
--
ALTER TABLE `tbl_rank`
  ADD PRIMARY KEY (`rank_id`);

--
-- Indexes for table `tbl_ship`
--
ALTER TABLE `tbl_ship`
  ADD PRIMARY KEY (`ship_id`);

--
-- Indexes for table `tbl_ship_speed`
--
ALTER TABLE `tbl_ship_speed`
  ADD PRIMARY KEY (`ship_speed_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_account`
--
ALTER TABLE `tbl_account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_archive`
--
ALTER TABLE `tbl_archive`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  MODIFY `crew_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_rank`
--
ALTER TABLE `tbl_rank`
  MODIFY `rank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_ship`
--
ALTER TABLE `tbl_ship`
  MODIFY `ship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_ship_speed`
--
ALTER TABLE `tbl_ship_speed`
  MODIFY `ship_speed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
