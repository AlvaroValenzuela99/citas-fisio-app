CREATE DATABASE  IF NOT EXISTS `citas_fisio_app_db`;
USE `citas_fisio_app_db`;

--
-- Estructura para la tabla "citas"
--

DROP TABLE IF EXISTS `citas`;


CREATE TABLE `citas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_cita` DATE NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  `nombre` VARCHAR(50),
  `apellidos` VARCHAR(50),
  `telefono` VARCHAR(15),
  `disponible` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*
--
-- Datos de ejemplo para la tabla "citas"
--

INSERT INTO `citas` (`fecha_cita`, `hora_inicio`, `hora_fin`, `nombre`, `apellidos`, `telefono`, `disponible`)
VALUES
('2023-12-04', '09:00:00', '10:00:00', 'Juan', 'Pérez', '612384786', FALSE),
('2023-12-05', '14:00:00', '15:00:00', 'María', 'Gómez', '666273859', FALSE),
('2023-12-06', '11:00:00', '12:00:00', 'Carlos', 'Martínez', '623283345', FALSE);
*/

