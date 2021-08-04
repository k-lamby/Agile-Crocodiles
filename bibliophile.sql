-- MySQL dump 10.13  Distrib 8.0.25, for macos11.3 (x86_64)
--
-- Host: localhost    Database: bibliophile
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `ID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Ms Writes Alot');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cover`
--

DROP TABLE IF EXISTS `cover`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `titleID` int DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `titleID` (`titleID`),
  CONSTRAINT `cover_ibfk_1` FOREIGN KEY (`titleID`) REFERENCES `title` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cover`
--

LOCK TABLES `cover` WRITE;
/*!40000 ALTER TABLE `cover` DISABLE KEYS */;
INSERT INTO `cover` VALUES (1,1,'https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-M.zip&file=6429406-M.jpg'),(2,2,'https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-M.zip&file=6429606-M.jpg');
/*!40000 ALTER TABLE `cover` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credential`
--

DROP TABLE IF EXISTS `credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credential` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential`
--

LOCK TABLES `credential` WRITE;
/*!40000 ALTER TABLE `credential` DISABLE KEYS */;
INSERT INTO `credential` VALUES (9,'user1','dd'),(12,'undefined','undefined');
/*!40000 ALTER TABLE `credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oneliner`
--

DROP TABLE IF EXISTS `oneliner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oneliner` (
  `titleID` int NOT NULL,
  `userID` int NOT NULL,
  `oneline` varchar(255) NOT NULL,
  PRIMARY KEY (`titleID`,`userID`,`oneline`),
  KEY `userID` (`userID`),
  CONSTRAINT `oneliner_ibfk_1` FOREIGN KEY (`titleID`) REFERENCES `title` (`ID`),
  CONSTRAINT `oneliner_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `credential` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oneliner`
--

LOCK TABLES `oneliner` WRITE;
/*!40000 ALTER TABLE `oneliner` DISABLE KEYS */;
/*!40000 ALTER TABLE `oneliner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `ID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `title` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `authorID` int DEFAULT NULL,
  `adultContent` tinyint(1) DEFAULT NULL,
  `ISBN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `authorID` (`authorID`),
  CONSTRAINT `title_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `author` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,'Very Enticing Novel',1,0,'ABC'),(2,'Very Thrilling Novel',1,0,'ASCVB');
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `userIDNum` int DEFAULT NULL,
  `titleID` int DEFAULT NULL,
  KEY `userIDNum` (`userIDNum`),
  KEY `titleID` (`titleID`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`userIDNum`) REFERENCES `credential` (`ID`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`titleID`) REFERENCES `title` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (9,1),(9,1),(9,2);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-04  9:00:36
