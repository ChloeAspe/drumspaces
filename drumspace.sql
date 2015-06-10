-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 10 Juin 2015 à 11:16
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `drumspace`
--

-- --------------------------------------------------------

--
-- Structure de la table `evalresult`
--

CREATE TABLE IF NOT EXISTS `evalresult` (
  `EVID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SCORE` int(11) NOT NULL,
  `EID` int(10) unsigned NOT NULL,
  `TID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`EVID`),
  KEY `TID` (`TID`),
  KEY `EID` (`EID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Contenu de la table `evalresult`
--

INSERT INTO `evalresult` (`EVID`, `SCORE`, `EID`, `TID`) VALUES
(1, 2, 5, 3),
(2, 3, 5, 5),
(3, 1, 6, 3),
(4, 3, 6, 4),
(5, 4, 6, 5),
(6, 2, 7, 7),
(7, 4, 7, 8),
(8, 5, 7, 9),
(9, 2, 7, 10),
(10, 3, 14, 12),
(11, 5, 19, 7),
(12, 7, 19, 8),
(13, 1, 19, 9),
(14, 3, 23, 12),
(15, 5, 24, 22),
(16, 4, 24, 22),
(17, 6, 24, 22),
(18, 3, 24, 23),
(19, 4, 24, 23),
(20, 5, 24, 23),
(21, 6, 24, 24),
(22, 5, 24, 24),
(23, 5, 25, 3),
(24, 4, 25, 4),
(25, 3, 25, 4),
(27, 5, 29, 22),
(28, 2, 29, 23),
(29, 4, 29, 24),
(31, 2, 30, 3),
(32, 2, 30, 4),
(34, 4, 31, 7),
(35, 6, 31, 8),
(37, 2, 32, 12),
(39, 4, 33, 17),
(41, 4, 34, 22),
(43, 3, 35, 27);

-- --------------------------------------------------------

--
-- Structure de la table `evaluator`
--

CREATE TABLE IF NOT EXISTS `evaluator` (
  `EID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ENAME` varchar(200) DEFAULT NULL,
  `EEMAIL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`EID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Contenu de la table `evaluator`
--

INSERT INTO `evaluator` (`EID`, `ENAME`, `EEMAIL`) VALUES
(1, 'testtt', 'tttest@smith.com'),
(2, 'testtt', 'tttest@smith.com'),
(3, 'testtt', 'tttest@smith.com'),
(4, 'testtt', 'tttest@smith.com'),
(5, 'goldman', 'la@bas'),
(6, 'ggg', 'non'),
(7, 'Jane Smith', 'jane@smith.com'),
(8, 'Jane Smith', 'jane@smith.com'),
(9, 'Jane Smith', 'jane@smith.com'),
(10, 'Jane Smith', 'jane@smith.com'),
(11, 'Jane Smith', 'jane@smith.com'),
(12, 'Jane Smith', 'jane@smith.com'),
(13, 'Jane Smith', 'jane@smith.com'),
(14, 'Jane Smith', 'jane@smith.com'),
(15, 'Jane Smith', 'jane@smith.com'),
(16, 'Jane Smith', 'jane@smith.com'),
(17, 'Jane Smith', 'jane@smith.com'),
(18, 'Jane Smith', 'jane@smith.com'),
(19, 'Jane Smith', 'jane@smith.com'),
(20, 'Jane Smith', 'jane@smith.com'),
(21, 'Jane Smith', 'jane@smith.com'),
(22, 'Jane Smith', 'jane@smith.com'),
(23, 'Jane Smith', 'jane@smith.com'),
(24, 'Jane Smith', 'jane@smith.com'),
(25, 'Jane Smith', 'jane@smith.com'),
(26, 'Jane Smith', 'jane@smith.com'),
(27, 'Jane Smith', 'jane@smith.com'),
(28, 'Jane Smith', 'jane@smith.com'),
(29, 'Jane Smith', 'jane@smith.com'),
(30, 'Jane Smith', 'jane@smith.com'),
(31, 'Jane Smith', 'jane@smith.com'),
(32, 'Jane Smith', 'jane@smith.com'),
(33, 'Jane Smith', 'jane@smith.com'),
(34, 'Jane Smith', 'jane@smith.com'),
(35, 'Jane Smith', 'jane@smith.com');

-- --------------------------------------------------------

--
-- Structure de la table `participant`
--

CREATE TABLE IF NOT EXISTS `participant` (
  `PID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `PNAME` text,
  `PEMAIL` text,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=89 ;

--
-- Contenu de la table `participant`
--

INSERT INTO `participant` (`PID`, `PNAME`, `PEMAIL`) VALUES
(5, 'PTEST', 'TTOIZUDIZ@UHZU.hg'),
(6, 'PTEST', 'TTOIZUDIZ@UHZU.hg'),
(7, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(8, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(9, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(10, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(11, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(12, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(13, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(14, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(15, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(16, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(17, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(18, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(19, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(20, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(21, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(22, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(23, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(24, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(25, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(26, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(27, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(28, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(29, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(30, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(31, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(32, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(33, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(34, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(35, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(36, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(37, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(38, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(39, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(40, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(41, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(42, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(43, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(44, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(45, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(46, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(47, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(48, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(49, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(50, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(51, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(52, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(53, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(54, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(55, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(56, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(57, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(58, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(59, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(60, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(61, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(62, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(63, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(64, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(65, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(66, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(67, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(68, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(69, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(70, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(71, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(72, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(73, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(74, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(75, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(76, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(77, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(78, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(79, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(80, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(81, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(82, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(83, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(84, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(85, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(86, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(87, 'TOTO', 'TTOIZUDIZ@UHZU.hg'),
(88, 'TOTO', 'TTOIZUDIZ@UHZU.hg');

-- --------------------------------------------------------

--
-- Structure de la table `taskresult`
--

CREATE TABLE IF NOT EXISTS `taskresult` (
  `TID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `VIEW` int(10) unsigned NOT NULL,
  `PATTERN` int(10) unsigned NOT NULL,
  `KICK` varchar(200) NOT NULL,
  `SNARE` varchar(200) NOT NULL,
  `OPENHH` varchar(200) NOT NULL,
  `CLOSEDHH` varchar(200) NOT NULL,
  `TIME` double NOT NULL,
  `NBSELECTED` int(11) NOT NULL,
  `NBLISTENED` int(11) NOT NULL,
  `PID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`TID`),
  KEY `PID` (`PID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

--
-- Contenu de la table `taskresult`
--

INSERT INTO `taskresult` (`TID`, `VIEW`, `PATTERN`, `KICK`, `SNARE`, `OPENHH`, `CLOSEDHH`, `TIME`, `NBSELECTED`, `NBLISTENED`, `PID`) VALUES
(3, 3, 1, 'Kick System 2.wav', 'Snare Preemptive 1.wav', 'OpenHH KaiTracid 1.wav', 'ClosedHH GasBreak 2.wav', 17, 4, 28, 5),
(4, 1, 2, 'Kick Alley 1.wav', 'Snare Baller 2.wav', 'OpenHH 909 3.wav', 'ClosedHH 909X 1.wav', 17, 4, 10, 5),
(5, 1, 3, 'Kick AirSwoop.wav', 'Snare Baller 2.wav', 'OpenHH ARVintageEbony V127.wav', 'ClosedHH 808X.wav', 13, 4, 9, 5),
(6, 2, 4, 'Kick Sunshine 2.wav', 'Snare Baller 2.wav', 'OpenHH Gold 3.wav', 'ClosedHH ShutItDown.wav', 25, 4, 21, 5),
(7, 1, 5, 'Kick Aeki 2.wav', 'Snare Backwoods 2.wav', 'OpenHH AR70sTight V127 1.wav', 'ClosedHH 909X 1.wav', 16, 4, 13, 5),
(8, 3, 1, 'Kick OnlyTheLow.wav', 'Snare ChromePlated 1.wav', 'OpenHH DirtyGirl 2.wav', 'ClosedHH Aeki 1.wav', 26, 4, 70, 6),
(9, 1, 2, 'Kick Airbase 1.wav', 'Snare Backwoods 2.wav', 'OpenHH AR70sTight V127 1.wav', 'ClosedHH 808X.wav', 40, 4, 12, 6),
(10, 1, 3, 'Kick Airbase 1.wav', 'Snare Baller 2.wav', 'OpenHH AR70sTight V127 1.wav', 'ClosedHH 80sElectro 2.wav', 16, 4, 11, 6),
(11, 2, 4, 'Kick Subviolent 2.wav', 'Rimshot Sickboy 2.wav', 'OpenHH Stomper 1.wav', 'ClosedHH FunkHouse 2.wav', 80, 4, 143, 6),
(12, 3, 1, 'Kick System 2.wav', 'Snare Subviolent 1.wav', 'OpenHH Materials 2.wav', 'ClosedHH GasBreak 2.wav', 19, 4, 32, 16),
(13, 3, 1, 'Kick System 4.wav', 'Snare Preemptive 1.wav', 'OpenHH Turntable B 1.wav', 'ClosedHH Runaround 1.wav', 15, 6, 66, 17),
(14, 1, 2, 'Kick Airbase 1.wav', 'Snare Autopsy 3.wav', 'OpenHH AR50sAutumn V127.wav', 'ClosedHH 80sElectro 1.wav', 20, 5, 9, 17),
(15, 1, 3, 'Kick Airbase 2.wav', 'Snare Autopsy 3.wav', 'OpenHH ARVintageEbony V127.wav', 'ClosedHH 808X.wav', 13, 5, 11, 17),
(16, 2, 4, 'Kick HollowHole.wav', 'Snare Fightclub 2.wav', 'OpenHH Lostodos 2.wav', 'ClosedHH IceCream 2.wav', 16, 4, 36, 17),
(17, 3, 1, 'Kick Revolt 1', 'Snare WhatIsIn', 'OpenHH Easy', 'ClosedHH HalfTamb', 20, 4, 41, 18),
(18, 3, 1, 'Kick SB 4', 'Snare TelAviv 1', 'OpenHH Tight', 'ClosedHH Morrison 4', 23, 4, 82, 19),
(19, 1, 2, 'Kick Airbase 1', 'Snare Backwoods 1', 'OpenHH 909 3', 'ClosedHH 80sElectro 2', 42, 4, 10, 19),
(20, 3, 1, 'Kick Digibit 2', 'Snare LowToned', 'OpenHH ShopStopper 1', 'ClosedHH Pneumatik 1', 92, 13, 87, 20),
(21, 1, 2, 'Kick AirSwoop', 'Snare Baller 1', 'OpenHH Fabrika', 'ClosedHH 70sDnB', 98, 5, 21, 20),
(22, 1, 3, 'Kick BeGentle', 'Snare Conswinch', 'OpenHH Glassed', 'ClosedHH 80sElectro 2', 141, 10, 30, 20),
(23, 3, 1, 'Kick Tarantula', 'Snare BuzzEcho', 'OpenHH Turntable B 1', 'ClosedHH Shave 3', 22, 4, 33, 24),
(24, 3, 1, 'Kick FullyCharged 2', 'Snare Sahara 1', 'OpenHH FullyCharged 1', 'ClosedHH Studio D', 49, 4, 60, 25),
(25, 3, 1, 'Kick Mbase 1', 'Snare Computer 2', 'OpenHH Uppertown', 'ClosedHH TakeItBack 2', 19, 5, 39, 28),
(26, 1, 2, 'Kick Alley 1', 'Snare Autopsy 3', 'OpenHH 909 2', 'ClosedHH AR60sLate V127 2', 101, 7, 21, 28),
(27, 3, 1, 'Kick FullyCharged 2', 'Snare Parole', 'OpenHH iceCream', 'ClosedHH Central V3', 13, 4, 28, 29),
(28, 3, 1, 'Kick Exposed 1', 'Snare Exposed', 'OpenHH SemitReal', 'ClosedHH IceCream 1', 45, 4, 17, 30),
(29, 3, 1, 'Kick Exile 2', 'Snare Preemptive 1', 'OpenHH Turntable B 1', 'ClosedHH Metamorphic', 140, 10, 128, 31),
(30, 3, 1, 'Kick Herbert 2.wav', 'Snare NotThen.wav', 'OpenHH Techstar.wav', 'ClosedHH Glitch.wav', 63, 4, 73, 33),
(31, 3, 1, 'Kick Plastik', 'Snare Sunshine 1', 'OpenHH Resistor', 'ClosedHH Sunshine 1', 20, 4, 90, 38),
(32, 1, 1, 'Kick Alley 1', 'Snare Baller 3', 'OpenHH 909 2', 'ClosedHH 80sElectro 1', 23, 4, 18, 70),
(33, 1, 2, 'Kick Alley 2', 'Snare Baller 2', 'OpenHH AR50sAutumn V127', 'ClosedHH 808', 13, 4, 13, 70),
(34, 1, 3, 'Kick Alley 1', 'Snare Bionic', 'OpenHH 909 2', 'ClosedHH 70sDnB', 16, 4, 12, 70),
(35, 1, 1, 'Kick TelAviv 2', 'Snare Backwoods 2', 'OpenHH 909 3', 'ClosedHH 808X', 30, 4, 18, 71),
(36, 1, 2, 'Kick TelAviv 3', 'Snare Baller 3', 'OpenHH AR50sAutumn V127', 'ClosedHH 80sElectro 1', 30, 4, 6, 71),
(37, 1, 3, 'Kick Thinking 1', 'Snare Baller 4', 'OpenHH 909', 'ClosedHH 808X', 10, 4, 7, 71),
(38, 2, 4, 'Kick Kittens 2.wav', 'Snare DinnerHip.wav', 'OpenHH MostOthers.wav', 'ClosedHH GasBreak 2.wav', 14, 4, 16, 71),
(39, 1, 5, 'Kick ThereTip', 'Snare Baller 3', 'OpenHH AR50sAutumn V127', 'ClosedHH 808X', 17, 4, 11, 71);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `evalresult`
--
ALTER TABLE `evalresult`
  ADD CONSTRAINT `evalresult_ibfk_1` FOREIGN KEY (`EID`) REFERENCES `evaluator` (`EID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `evalresult_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `taskresult` (`TID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `taskresult`
--
ALTER TABLE `taskresult`
  ADD CONSTRAINT `taskresult_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `participant` (`PID`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
