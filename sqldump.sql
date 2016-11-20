CREATE DATABASE IF NOT EXISTS `wreckstad`;
USE `wreckstad`;

SET sql_mode='NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE IF NOT EXISTS `customers` (
  `name` varchar(256) NOT NULL,
  `number` varchar(256) NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `customers` (`name`, `number`, `id`) VALUES
  ('Per Persson', '0735-35-35-35'),
  ('Nils Nilsson', '0736-36-36-36');



CREATE TABLE IF NOT EXISTS `employees` (
  `SSN` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `vacationStart` date DEFAULT NULL,
  `vacationEnd` date DEFAULT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `employees` (`SSN`, `name`, `vacationStart`, `vacationEnd`, `id`) VALUES
  ('870415-1515', 'Bertil Svensson', '2016-11-15', '2016-11-30', 1),
  ('610808-1616', 'Sven Jönsson', '2016-11-13', '2016-12-16', 2);




CREATE TABLE IF NOT EXISTS `spares` (
  `serial` varchar(256) NOT NULL,
  `fitsModel` varchar(256) NOT NULL,
  `description` varchar(256) NOT NULL,
  `price` varchar(256) NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `spares` (`serial`, `fitsModel`, `description`, `price`, `id`) VALUES
  ('554486523', 'BmW z3', 'Höger sidospegel', '100', 1),
  ('148563212', 'Saab 95', 'Vänster sidospegel', '200', 2);


CREATE TABLE IF NOT EXISTS `damages` (
  `description` varchar(256) NOT NULL,
  `hasWorked` int(11) NOT NULL,
  `hasWorkedForMinutes` varchar(256) unsigned NOT NULL,
  `sparePartsUsed` int(11) unsigned NOT NULL,
  `status` varchar(256) NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `hasWorked` (`employees`),
  KEY `sparePartsUsed` (`spares`),
  CONSTRAINT `hasWorked` FOREIGN KEY (`employees`) REFERENCES `employees` (`id`),
  CONSTRAINT `sparePartsUsed` FOREIGN KEY (`spares`) REFERENCES `spares` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


INSERT INTO `damages` (`description`, `hasWorked`, `hasWorkedForMinutes`, `sparePartsUsed`, `status`, `id`) VALUES
  ('Front bumber needs adjusting', 1, "35", 1, 'In progress', 1),
  ('Paint job in rear right side', 2, "55", 2, 'Finished', 2);


CREATE TABLE IF NOT EXISTS `cars` (
  `registration` varchar(256) NOT NULL,
  `model` varchar(256) NOT NULL,
  `damage` int(11) NOT NULL,
  `customer` int(11) unsigned NOT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `customer` (`customers`),
  KEY `damage` (`damages`),
  CONSTRAINT `customer` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`),
  CONSTRAINT `damage` FOREIGN KEY (`damages`) REFERENCES `damages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

INSERT INTO `orders` (`registration`, `model`, `damage`, `customer`, `id`) VALUES
  ('ABC 134', 'Honda Schrot', 1, 1, 1),
  ('DEF 265', 'IronCar', 2, 2, 2);
