-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-alanlasco.alwaysdata.net
-- Generation Time: Jul 02, 2024 at 04:46 PM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alanlasco_codoacodo`
--

-- --------------------------------------------------------

--
-- Table structure for table `autores`
--

CREATE TABLE `autores` (
  `id_autores` int(10) UNSIGNED NOT NULL,
  `nombre_autor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autores`
--

INSERT INTO `autores` (`id_autores`, `nombre_autor`) VALUES
(8, 'Oliver Bowden'),
(9, 'Gordon Doherty'),
(12, 'Christie Golden'),
(13, 'Matthew Kirby');

-- --------------------------------------------------------

--
-- Table structure for table `juegos`
--

CREATE TABLE `juegos` (
  `id_juegos` int(10) UNSIGNED NOT NULL,
  `nombre_juego` varchar(100) NOT NULL,
  `imagen_juego` varchar(190) DEFAULT NULL,
  `url_juego` varchar(191) NOT NULL,
  `plataformas_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `juegos`
--

INSERT INTO `juegos` (`id_juegos`, `nombre_juego`, `imagen_juego`, `url_juego`, `plataformas_id`) VALUES
(55, 'Assassin\'s Creed ', '1719766070375.jpg', 'https://www.ubisoft.com/es-mx/game/assassins-creed/assassins-creed', 50),
(56, 'Assassin\'s Creed II', '1719767058477.jpg', 'https://www.ubisoft.com/es-mx/game/assassins-creed/assassins-creed-II', 50),
(57, 'Assassin\'s Creed III', '1719886883843.jpeg', 'https://www.ubisoft.com/es-mx/game/assassins-creed/assassins-creed-III', 49),
(58, 'Valhalla', '1719889614158.png', 'www', 50),
(59, 'Assassin\'s Creed IV', '1719928984282.jpeg', 'https://www.ubisoft.com/es-mx/game/assassins-creed/assassins-creed-III', 49);

-- --------------------------------------------------------

--
-- Table structure for table `libros`
--

CREATE TABLE `libros` (
  `id_libros` int(10) UNSIGNED NOT NULL,
  `nombre_libro` varchar(100) NOT NULL,
  `anio_libro` int(11) NOT NULL,
  `imagen_libro` varchar(191) NOT NULL,
  `autores_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `libros`
--

INSERT INTO `libros` (`id_libros`, `nombre_libro`, `anio_libro`, `imagen_libro`, `autores_id`) VALUES
(19, 'Oddysey', 2018, '1719888285017.webp', 9),
(20, 'The secret crusade', 2011, '1719888438898.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `plataformas`
--

CREATE TABLE `plataformas` (
  `id_plataformas` int(10) UNSIGNED NOT NULL,
  `plataforma` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plataformas`
--

INSERT INTO `plataformas` (`id_plataformas`, `plataforma`) VALUES
(49, 'Steam'),
(50, 'Ubisoft Play'),
(51, 'Epic Games');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(13, 'grupo12', '$2a$08$q2Pp8VyrGYCKpUIHbApTLOP1wWD2/AyLTjlgG7ykBk.5.wu55IMPS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autores`);

--
-- Indexes for table `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id_juegos`),
  ADD KEY `plataformas_id` (`plataformas_id`);

--
-- Indexes for table `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libros`),
  ADD KEY `autores_id` (`autores_id`);

--
-- Indexes for table `plataformas`
--
ALTER TABLE `plataformas`
  ADD PRIMARY KEY (`id_plataformas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autores`
--
ALTER TABLE `autores`
  MODIFY `id_autores` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id_juegos` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libros` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `plataformas`
--
ALTER TABLE `plataformas`
  MODIFY `id_plataformas` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `juegos`
--
ALTER TABLE `juegos`
  ADD CONSTRAINT `juegos_ibfk_1` FOREIGN KEY (`plataformas_id`) REFERENCES `plataformas` (`id_plataformas`);

--
-- Constraints for table `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`autores_id`) REFERENCES `autores` (`id_autores`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
