-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2021 at 09:54 AM
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
(8, 0, 2, 'Nicole', '', 'Marcial', 'http://localhost/RAITE_GC_Team1/api/uploads/202110230946150.pdf', 1, '2021-10-23 15:46:15', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  ADD PRIMARY KEY (`crew_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_crew`
--
ALTER TABLE `tbl_crew`
  MODIFY `crew_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
