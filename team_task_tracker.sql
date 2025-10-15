-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2025 at 08:41 AM
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
-- Database: `team_task_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Belum Dimulai',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `title`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 'Creating UI/UX', 'We assigned 5 people to design the UI for the company website!', 'Sedang Dikerjakan', '2025-10-15 04:02:21.154', '2025-10-15 05:47:06.964'),
(3, 'Creating Backend', 'This is for creating backend description', 'Belum Dimulai', '2025-10-15 04:17:18.034', '2025-10-15 05:47:23.839'),
(4, 'Meeting with Client', 'Fun meeting and interview with client! And finally we got the deal!', 'Selesai', '2025-10-15 04:28:34.990', '2025-10-15 06:14:27.640'),
(5, 'CEO', 'Tomorrow afternoon we present the website UI to the CEO', 'Belum Dimulai', '2025-10-15 05:54:25.728', '2025-10-15 06:14:42.195');

-- --------------------------------------------------------

--
-- Table structure for table `tasklog`
--

CREATE TABLE `tasklog` (
  `id` int(11) NOT NULL,
  `message` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `taskId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasklog`
--

INSERT INTO `tasklog` (`id`, `message`, `createdAt`, `taskId`) VALUES
(2, 'Status changed to \"Sedang Dikerjakan\"', '2025-10-15 04:02:26.321', 2),
(3, 'Status changed to \"Selesai\"', '2025-10-15 04:28:38.150', 2),
(4, 'Status changed to \"Belum Dimulai\"', '2025-10-15 04:28:40.697', 2),
(5, 'Status changed to \"Sedang Dikerjakan\"', '2025-10-15 04:28:42.773', 2),
(6, 'Status changed to \"Sedang Dikerjakan\"', '2025-10-15 04:28:45.471', 4),
(7, 'Status changed to \"Selesai\"', '2025-10-15 04:28:47.109', 4),
(8, 'Status changed to \"Belum Dimulai\"', '2025-10-15 05:16:21.494', 4),
(9, 'Status changed to \"Sedang Dikerjakan\"', '2025-10-15 05:36:20.379', 4),
(10, 'Status changed to \"Selesai\"', '2025-10-15 05:44:22.113', 4),
(11, 'Status changed to \"Belum Dimulai\"', '2025-10-15 05:44:23.884', 4),
(12, 'Status changed to \"Sedang Dikerjakan\"', '2025-10-15 05:44:25.294', 4),
(13, 'Title changed to \"Meeting with Client\"', '2025-10-15 05:46:17.645', 4),
(14, 'Title changed to \"Creating UI/UX\"', '2025-10-15 05:47:06.973', 2),
(15, 'Title changed to \"Creating Backend\"', '2025-10-15 05:47:23.851', 3),
(17, 'Task \"CEO\" was updated.', '2025-10-15 06:09:55.013', 5),
(18, 'Task \"Meeting with Client\" was updated.', '2025-10-15 06:14:27.649', 4),
(19, 'Task \"CEO\" was updated.', '2025-10-15 06:14:40.848', 5),
(20, 'Task \"CEO\" was updated.', '2025-10-15 06:14:41.009', 5),
(21, 'Task \"CEO\" was updated.', '2025-10-15 06:14:42.204', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `createdAt`) VALUES
(1, 'Manager', 'manager@gmail.com', '$2b$10$MRo7axFCS5C/TiipIrEzZ.E9S29nJspCsMaCt7mg7yuP/XlNwEhYq', '2025-10-15 03:44:02.149');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('16dd1529-9040-4459-8b24-22e57f8cfe07', '2e7d5b84d9d12683bb86b3a9169b6f286dc930838fa91824760274941a72588f', '2025-10-15 05:52:49.754', '20251015055249_remove_user_relation', NULL, NULL, '2025-10-15 05:52:49.671', 1),
('47582ff3-a52e-4d96-a50b-485b663c0f1b', '9e04211bffdaec48e8cd7aad65c91597cefa02af494c5da91411fed68f164945', '2025-10-15 05:55:45.412', '20251015055545_updating_db_2', NULL, NULL, '2025-10-15 05:55:45.344', 1),
('cde3d7b4-de38-43a8-8b2f-06425cb1b074', 'e172034d0ad589775796cd149369dc8a9ad20b00bc69f674c5abc1ba48bce156', '2025-10-15 05:48:27.530', '20251015054827_updating_task_table', NULL, NULL, '2025-10-15 05:48:27.498', 1),
('d408a811-b390-4225-89bc-f0749ea2d201', '17b0ee027c90fca827320c2788b2de88332f5e8676790ea1157e8ae54c71d6b1', '2025-10-15 05:54:05.963', '20251015055405_updating', NULL, NULL, '2025-10-15 05:54:05.824', 1),
('f47a42a5-a538-4c82-a26f-b45e7e2195c0', '6df11420dd53cd470b913804920e32226a7dd3ee98da6a8d88025527e264104b', '2025-10-15 03:22:26.148', '20251015032225_init', NULL, NULL, '2025-10-15 03:22:25.825', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasklog`
--
ALTER TABLE `tasklog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TaskLog_taskId_fkey` (`taskId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tasklog`
--
ALTER TABLE `tasklog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasklog`
--
ALTER TABLE `tasklog`
  ADD CONSTRAINT `TaskLog_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
