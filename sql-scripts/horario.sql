USE `citas_fisio_app_db`;

-- crear tabla horario


DROP TABLE IF EXISTS `horario`;

CREATE TABLE `horario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dia_semana` INT NOT NULL, -- 1 para enero, 2 para febrero, ..., 12 para diciembre
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  `disponible` BOOLEAN NOT NULL DEFAULT true, -- Indica si el horario está disponible

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Horario en lunes de 9:00 AM a 12:00 PM
INSERT INTO `horario` (`dia_semana`, `hora_inicio`, `hora_fin`, `disponible`)
VALUES
(1, '09:00:00', '12:00:00', true);

-- Horario en martes de 14:00 PM a 18:00 PMhorariohorario
INSERT INTO `horario` (`dia_semana`, `hora_inicio`, `hora_fin`, `disponible`)
VALUES
(2, '14:00:00', '18:00:00', true);

-- Horario en miércoles de 10:00 AM a 14:00 PM
INSERT INTO `horario` (`dia_semana`, `hora_inicio`, `hora_fin`, `disponible`)
VALUES
(3, '10:00:00', '14:00:00', true);

-- Horario en jueves de 8:00 AM a 12:00 PM
INSERT INTO `horario` (`dia_semana`, `hora_inicio`, `hora_fin`, `disponible`)
VALUES
(4, '08:00:00', '12:00:00', true);

-- Horario en viernes de 15:00 PM a 18:00 PM
INSERT INTO `horario` (`dia_semana`, `hora_inicio`, `hora_fin`, `disponible`)
VALUES
(5, '15:00:00', '18:00:00', true);