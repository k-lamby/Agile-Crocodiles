-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bibliophile
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'J. R. Abrial'),(2,'Victor W. Watton'),(3,'Jane Welch Williams'),(4,'Marko Petkovsek'),(5,'Sheryl Sandberg'),(6,'Unknown'),(7,'Mike Berners-Lee'),(8,'Unknown'),(9,'Unknown'),(10,'Unknown'),(11,'Sagwa Kim'),(12,'Guvna B'),(13,'S.K Sinha'),(14,'Unknown'),(15,'Jannine Fitzgerald'),(16,'Unknown'),(17,'Unknown'),(18,'Unknown'),(19,'Aleksandŭr Teodorov-Balan'),(20,'Richard Pollak');
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
  KEY `titleID` (`titleID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cover`
--

LOCK TABLES `cover` WRITE;
/*!40000 ALTER TABLE `cover` DISABLE KEYS */;
INSERT INTO `cover` VALUES (1,1,'http://books.google.com/books/content?id=T_ShHENlqBAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(2,2,'http://books.google.com/books/content?id=fNUWswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(3,3,'http://books.google.com/books/content?id=tyTNAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(4,4,'http://books.google.com/books/content?id=5UBZDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(5,5,'http://books.google.com/books/content?id=aYt3DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(6,6,'http://books.google.com/books/content?id=WFToZ10uCU8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(7,7,'http://books.google.com/books/content?id=-eY3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(8,8,'http://books.google.com/books/content?id=QMEUAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(9,9,'http://books.google.com/books/content?id=ub5OAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(10,10,'http://books.google.com/books/content?id=gBO-TDFuceIC&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(11,11,'http://books.google.com/books/content?id=OsnNxQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(12,12,'http://books.google.com/books/content?id=LbbWDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),(13,13,'http://books.google.com/books/content?id=1gDMalk5_6oC&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(14,14,'http://books.google.com/books/content?id=02yzAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(15,15,'http://books.google.com/books/content?id=vX45rgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(16,16,'http://books.google.com/books/content?id=MRWYwpek2GgC&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(17,17,'http://books.google.com/books/content?id=KOAaRXAecRwC&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(18,18,'http://books.google.com/books/content?id=v9SRAAAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(19,19,'http://books.google.com/books/content?id=dITpAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),(20,20,'http://books.google.com/books/content?id=inx-AAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api');
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
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential`
--

LOCK TABLES `credential` WRITE;
/*!40000 ALTER TABLE `credential` DISABLE KEYS */;
INSERT INTO `credential` VALUES (9,'user1','dd');
/*!40000 ALTER TABLE `credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Romance'),(2,'Science Fiction');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `genreID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `authorID` (`authorID`),
  CONSTRAINT `title_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `author` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,'The B-Book',1,0,'521021758',1),(2,'Edexcel Religious Studies for GCSE (9-1)',2,0,'1471866599',1),(3,'Lectionary Reflections',3,0,'281055289',1),(4,'A = B',4,0,'9781439864500',2),(5,'Option B',5,0,'9780753548301',1),(6,'GCSE Maths for Edexcel A+B+AQA B+OCR: Higher',6,0,'9780007340996',1),(7,'There Is No Planet B',7,0,'9781108905411',2),(8,'Census of India, 1991',8,0,'UOM:39015037591289',1),(9,'Papers on cements, stones, concrete and various subjects.',9,0,'IOWA:31858053177022',1),(10,'Census of India, 1991: Tables B-9(F), B-12(F), B-13(i)(F), B-13(ii)(F) India',10,0,'UCBK:C072601387',1),(11,'B, Book, and Me',11,0,'1931883963',2),(12,'Unspoken',12,0,'9780310112471',1),(13,'CNC Programming Using Fanuc Custom Macro B',13,0,'9780071713320',2),(14,'Journal of the bar association of the District of Columbia B',14,0,'UCAL:B4337059',1),(15,'B Is for Bicycles',15,0,'996251405',2),(16,'Bulletin B',16,0,'WISC:89033384686',2),(17,'Census of India, 1981: District census handbook.',17,0,'MINN:31951002473925W',2),(18,'B & T Swaziland Business Pages',18,0,'STANFORD:36105112909713',2),(19,'Blgarski Knigopis',19,0,'UOM:39015035839094',1),(20,'The CREATION OF DR B',20,0,'UOM:39015038592328',1);
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofile` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `userIDNum` int DEFAULT NULL,
  `preference` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `userIDNum` (`userIDNum`),
  CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`userIDNum`) REFERENCES `credential` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
INSERT INTO `userprofile` VALUES (1,9,'Science Fiction;');
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `userIDNum` int DEFAULT NULL,
  `titleID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (9,2),(9,3),(9,4),(9,5),(9,6),(9,7),(9,8),(9,9),(9,10),(9,11),(9,12),(9,13),(9,14),(9,15),(9,16),(9,17),(9,18),(9,19),(9,20);
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

-- Dump completed on 2021-08-11 12:57:22
