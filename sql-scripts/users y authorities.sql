USE `citas_fisio_app_db`;

DROP TABLE IF EXISTS `authorities`;
DROP TABLE IF EXISTS `users`;

--
-- estructura para la tabla "users"
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `enabled` tinyint NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- insertar datos para la tabla "users"
--

INSERT INTO `users` 
VALUES 
('paciente','{noop}paciente123',1),
('admin','$2a$10$xI2J.1Pl7qNf0VaH6.zdDO4ozx/o14fiG/DWok41.n8eE0cLarGxe',1);


--
-- estructura para la tabla "authorities"
--

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`username`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- insertar datos para la tabla "authorities"
--

INSERT INTO `authorities` 
VALUES 
('paciente','ROLE_PACIENTE'),
('admin','ROLE_PACIENTE'),
('admin','ROLE_ADMIN');


