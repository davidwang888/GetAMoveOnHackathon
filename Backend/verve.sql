-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 03, 2018 at 05:28 AM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `verve`
--

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `locationCategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item-item_category`
--

CREATE TABLE `item-item_category` (
  `categoryID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location_category`
--

CREATE TABLE `location_category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `locationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `preset`
--

CREATE TABLE `preset` (
  `id` int(11) NOT NULL,
  `itemID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `routine`
--

CREATE TABLE `routine` (
  `id` int(11) NOT NULL,
  `workoutID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user-preset`
--

CREATE TABLE `user-preset` (
  `userID` int(11) NOT NULL,
  `presetID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user-routine`
--

CREATE TABLE `user-routine` (
  `userID` int(11) NOT NULL,
  `routineID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workout`
--

CREATE TABLE `workout` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workout-item_category`
--

CREATE TABLE `workout-item_category` (
  `workoutID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workout-workout_category`
--

CREATE TABLE `workout-workout_category` (
  `workoutID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `numReps` int(11) NOT NULL,
  `secTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workout_category`
--

CREATE TABLE `workout_category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_to_locationCategoryID` (`locationCategoryID`);

--
-- Indexes for table `item-item_category`
--
ALTER TABLE `item-item_category`
  ADD PRIMARY KEY (`categoryID`,`itemID`),
  ADD KEY `fk_to_itemID_1` (`itemID`);

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_category`
--
ALTER TABLE `location_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_to_locationID` (`locationID`);

--
-- Indexes for table `preset`
--
ALTER TABLE `preset`
  ADD PRIMARY KEY (`id`,`itemID`),
  ADD KEY `fk_to_itemID_2` (`itemID`);

--
-- Indexes for table `routine`
--
ALTER TABLE `routine`
  ADD PRIMARY KEY (`id`,`workoutID`),
  ADD KEY `fk_to_workoutID_3` (`workoutID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user-preset`
--
ALTER TABLE `user-preset`
  ADD PRIMARY KEY (`userID`,`presetID`),
  ADD KEY `fk_to_presetID` (`presetID`);

--
-- Indexes for table `user-routine`
--
ALTER TABLE `user-routine`
  ADD PRIMARY KEY (`userID`,`routineID`),
  ADD KEY `fk_to_routineID` (`routineID`);

--
-- Indexes for table `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workout-item_category`
--
ALTER TABLE `workout-item_category`
  ADD PRIMARY KEY (`workoutID`,`categoryID`),
  ADD KEY `fk_to_categoryID_3` (`categoryID`);

--
-- Indexes for table `workout-workout_category`
--
ALTER TABLE `workout-workout_category`
  ADD PRIMARY KEY (`workoutID`,`categoryID`);

--
-- Indexes for table `workout_category`
--
ALTER TABLE `workout_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `location_category`
--
ALTER TABLE `location_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workout`
--
ALTER TABLE `workout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workout_category`
--
ALTER TABLE `workout_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_to_locationCategoryID` FOREIGN KEY (`locationCategoryID`) REFERENCES `location_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item-item_category`
--
ALTER TABLE `item-item_category`
  ADD CONSTRAINT `fk_to_categoryID_1` FOREIGN KEY (`categoryID`) REFERENCES `item_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_itemID_1` FOREIGN KEY (`itemID`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location_category`
--
ALTER TABLE `location_category`
  ADD CONSTRAINT `fk_to_locationID` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `preset`
--
ALTER TABLE `preset`
  ADD CONSTRAINT `fk_to_itemID_2` FOREIGN KEY (`itemID`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `routine`
--
ALTER TABLE `routine`
  ADD CONSTRAINT `fk_to_workoutID_3` FOREIGN KEY (`workoutID`) REFERENCES `workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user-preset`
--
ALTER TABLE `user-preset`
  ADD CONSTRAINT `fk_to_presetID` FOREIGN KEY (`presetID`) REFERENCES `preset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_userID_2` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user-routine`
--
ALTER TABLE `user-routine`
  ADD CONSTRAINT `fk_to_routineID` FOREIGN KEY (`routineID`) REFERENCES `routine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_userID_1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workout-item_category`
--
ALTER TABLE `workout-item_category`
  ADD CONSTRAINT `fk_to_categoryID_2` FOREIGN KEY (`categoryID`) REFERENCES `item_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_categoryID_3` FOREIGN KEY (`categoryID`) REFERENCES `workout_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_workoutID_1` FOREIGN KEY (`workoutID`) REFERENCES `workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workout-workout_category`
--
ALTER TABLE `workout-workout_category`
  ADD CONSTRAINT `fk_to_workoutID_2` FOREIGN KEY (`workoutID`) REFERENCES `workout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
