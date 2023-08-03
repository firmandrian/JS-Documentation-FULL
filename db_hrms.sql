-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 01:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hrms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteData` (IN `karyawan_id` INT)   BEGIN
    DELETE FROM tb_karyawan WHERE id = karyawan_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditData` (IN `karyawan_id` INT, `karyawan` VARCHAR(100), `insentif` VARCHAR(100), `jumlah` INT)   BEGIN UPDATE tb_karyawan SET karyawan = karyawan, insentif = insentif, jumlah = jumlah WHERE id = karyawan_id;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetData` ()   BEGIN
  SELECT * FROM tb_karyawan;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetKaryawanByPage` (IN `pageNumber` INT, IN `pageSize` INT, OUT `totalPages` INT)   BEGIN
  -- Menghitung jumlah data total
  SELECT CEIL(COUNT(*) / pageSize) INTO totalPages FROM tb_karyawan;

  -- Mengambil data untuk halaman saat ini
  SET @offset = (pageNumber - 1) * pageSize;
  SET @limit = pageSize;
  PREPARE stmt FROM 'SELECT * FROM tb_karyawan LIMIT ?, ?';
  EXECUTE stmt USING @offset, @limit;
  DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `logout` (IN `tokenValue` VARCHAR(255))   BEGIN
  UPDATE tb_user SET token = NULL WHERE token = tokenValue;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PostData` (IN `karyawan` VARCHAR(100), IN `insentif` VARCHAR(100), IN `jumlah` INT)   BEGIN 
	INSERT INTO tb_karyawan (karyawan, insentif, jumlah)
	VALUES (karyawan, insentif, jumlah);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser` (IN `userNama` VARCHAR(255), IN `userUsername` VARCHAR(255), IN `userEmail` VARCHAR(255), IN `userPassword` VARCHAR(255), OUT `registrationStatus` VARCHAR(255))   BEGIN
    DECLARE isEmailRegistered INT;
    DECLARE isUsernameRegistered INT;

    SET isEmailRegistered = (SELECT COUNT(*) FROM tb_user WHERE email = userEmail);
    SET isUsernameRegistered = (SELECT COUNT(*) FROM tb_user WHERE username = userUsername);

    IF LENGTH(userPassword) < 8 THEN
        SET registrationStatus = "Password minimal harus 8 karakter";
    ELSEIF LENGTH(userNama) < 5 THEN
        SET registrationStatus = "Mohon masukkan nama minimal 5 karakter";
    ELSEIF LENGTH(userUsername) < 7 THEN
        SET registrationStatus = "Mohon masukkan username minimal 7 karakter";
    ELSEIF isEmailRegistered > 0 THEN
        SET registrationStatus = "Email sudah terdaftar";
    ELSEIF isUsernameRegistered > 0 THEN
        SET registrationStatus = "Username sudah terdaftar";
    ELSE
        INSERT INTO tb_user (nama, username, email, password)
        VALUES (userNama, userUsername, userEmail, userPassword);

        SET registrationStatus = "user register success";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `searchKaryawan` (IN `searchTerm` VARCHAR(255))   BEGIN
  SELECT * FROM tb_karyawan WHERE karyawan LIKE CONCAT('%', searchTerm, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getUser` (IN `p_usernameOrEmail` VARCHAR(255))   BEGIN
  SELECT * FROM tb_user WHERE email = p_usernameOrEmail OR username = p_usernameOrEmail;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertUser` (IN `p_nama` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255), IN `p_type` VARCHAR(255))   BEGIN
  INSERT INTO tb_user (nama, username, email, password, type)
  VALUES (p_nama, p_username, p_email, p_password, p_type);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Oauth` (IN `p_username` VARCHAR(255))   BEGIN
  SELECT * FROM tb_user WHERE username = p_username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateTokenProcedure` (IN `token` VARCHAR(255), IN `userId` INT)   BEGIN
  UPDATE tb_user SET token = token WHERE id = userId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_token` (IN `p_token` VARCHAR(255), IN `p_id` INT)   BEGIN
  UPDATE tb_user SET token = p_token WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verify_token` (IN `userId` INT)   BEGIN
    SELECT token FROM tb_user WHERE id = userId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_karyawan`
--

CREATE TABLE `tb_karyawan` (
  `id` int(20) NOT NULL,
  `karyawan` varchar(100) NOT NULL,
  `insentif` varchar(100) NOT NULL,
  `jumlah` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_karyawan`
--

INSERT INTO `tb_karyawan` (`id`, `karyawan`, `insentif`, `jumlah`) VALUES
(44, 'Siti', 'Beckend Developer', 5000),
(46, 'adit', 'Fullstack Developer', 4500),
(49, 'rian andriandi', 'Beckend Developer', 6000),
(52, 'halimah', 'QA Engginer', 5000),
(76, 'jiraya', 'Fullstack Developer', 5000),
(78, 'sakura', 'Fullstack Developer', 5000),
(79, 'uchiha Itachi', 'Beckend Developer', 6000),
(81, 'kaguya', 'Front End Developer', 5000),
(85, 'uchiha shisui', 'Fullstack Developer', 5500),
(86, 'kisame', 'Beckend Developer', 6000),
(87, 'Nuraini', 'QA Engginer', 6000),
(88, 'sidik', 'Front End Developer', 5000),
(89, 'momoshiki', 'Fullstack Developer', 5000),
(90, 'Naruto', 'Front End Developer', 6000),
(93, 'tarjo', 'Fullstack Developer', 6000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `nama`, `username`, `email`, `password`, `token`, `type`) VALUES
(8, 'soleh', 'slhkun', 'soleh@gmail.com', '$2b$10$aA5CSBRsNBVt1nZOV.jGbercYudxUk/qhKgMowdKbEOMxCW1hxCBK', '', ''),
(9, 'firman', 'riann', 'firman@gmail.com', '$2b$10$A3a4xwECY8uBxL0jk/Mn9.tw2MrW/mQwhDIpv23/WQYw05RVm2UFK', '', ''),
(21, 'firmandrian', 'firmandrian', 'firmanandrian6@gmail.com', '$2b$10$KLZd/k1tw35dFtM12Yh2lemQH0jYQcuMg.1Q.Xm19MMA/s.NeLJ2i', '', 'google'),
(36, 'rizkir', 'rizkyyy', 'rizki@gmail.com', '$2b$10$UxCQodOzxLMeBYNzqEfjkexYZA2Akp.vXFskLszVqvZfVGBIc3nyG', '', NULL),
(37, 'denis', 'denisan', 'denis@gmail.com', '$2b$10$fXSk3CHgJVLU0S.M3GYcruoysb5lhqG1ZPRHUaLUrcDEjyofKyIai', '', NULL),
(38, 'wahyuxx', 'wahyuuu', 'wahyu@gmail.com', '$2b$10$qLY6yUvepdA.BGL9/o.s7uE6jXTS8uqu0YCUh2llpdoRFGTMl/Wuq', '', NULL),
(40, 'Firman Andrian', 'Firman Andrian', '', '$2b$10$T8gkPv.l08RCxnlYoIts8um/Kg.l4YFtYWSEAafmzHnwbrHmv4tvu', '', 'facebook'),
(42, 'vincent', 'vincentt', 'vincent@gmail.com', '$2b$10$S7iz4DYOx192eHQOg.8r9Ovs12ROYok6.CHO3QalxFWffqKJXEoPa', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_karyawan`
--
ALTER TABLE `tb_karyawan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_karyawan`
--
ALTER TABLE `tb_karyawan`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
