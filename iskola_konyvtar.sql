-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: iskola_konyvtar
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `diakok`
--

DROP TABLE IF EXISTS `diakok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diakok` (
  `diakID` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  `osztaly` varchar(45) NOT NULL,
  PRIMARY KEY (`diakID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diakok`
--

LOCK TABLES `diakok` WRITE;
/*!40000 ALTER TABLE `diakok` DISABLE KEYS */;
INSERT INTO `diakok` VALUES (1,'Kés Elek','9.A'),(2,'Kiss Muci','12.C'),(3,'Jakab Varga','10.B'),(4,'Cunci Mókus','9.A');
/*!40000 ALTER TABLE `diakok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kolcsonzesek`
--

DROP TABLE IF EXISTS `kolcsonzesek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kolcsonzesek` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diakID` int(11) NOT NULL,
  `konyvID` int(11) NOT NULL,
  `kiadas_datum` date NOT NULL,
  `visszahozva` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kolcsonzes_diak` (`diakID`),
  KEY `fk_kolcsonzes_konyv` (`konyvID`),
  CONSTRAINT `fk_kolcsonzes_diak` FOREIGN KEY (`diakID`) REFERENCES `diakok` (`diakID`),
  CONSTRAINT `fk_kolcsonzes_konyv` FOREIGN KEY (`konyvID`) REFERENCES `konyvek` (`konyvID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kolcsonzesek`
--

LOCK TABLES `kolcsonzesek` WRITE;
/*!40000 ALTER TABLE `kolcsonzesek` DISABLE KEYS */;
INSERT INTO `kolcsonzesek` VALUES (1,1,1,'2025-01-05',NULL),(2,2,2,'2025-01-10','2025-01-20'),(3,3,3,'2025-01-15',NULL),(4,4,4,'2025-01-18',NULL);
/*!40000 ALTER TABLE `kolcsonzesek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `konyvek`
--

DROP TABLE IF EXISTS `konyvek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `konyvek` (
  `konyvID` int(11) NOT NULL AUTO_INCREMENT,
  `cim` varchar(100) NOT NULL,
  `szerzoID` int(11) NOT NULL,
  PRIMARY KEY (`konyvID`),
  KEY `fk_konyv_szerzo` (`szerzoID`),
  CONSTRAINT `fk_konyv_szerzo` FOREIGN KEY (`szerzoID`) REFERENCES `szerzok` (`szerzoID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `konyvek`
--

LOCK TABLES `konyvek` WRITE;
/*!40000 ALTER TABLE `konyvek` DISABLE KEYS */;
INSERT INTO `konyvek` VALUES (1,'ragyogás',1),(2,'asdtfgh',2),(3,'oiuztre',2),(4,'zjtsaf',3),(5,'Ragyogás',1);
/*!40000 ALTER TABLE `konyvek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szerzok`
--

DROP TABLE IF EXISTS `szerzok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szerzok` (
  `szerzoID` int(11) NOT NULL AUTO_INCREMENT,
  `szerzo` varchar(100) NOT NULL,
  PRIMARY KEY (`szerzoID`),
  UNIQUE KEY `uniq_szerzo` (`szerzo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szerzok`
--

LOCK TABLES `szerzok` WRITE;
/*!40000 ALTER TABLE `szerzok` DISABLE KEYS */;
INSERT INTO `szerzok` VALUES (3,'asdasd'),(2,'Mackó'),(1,'Stephen King');
/*!40000 ALTER TABLE `szerzok` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-09 13:58:05
