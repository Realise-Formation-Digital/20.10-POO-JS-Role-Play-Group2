CREATE DATABASE RPG;


-- Player
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `ID` tinyint(1) NOT NULL,
  `classType` varchar(50) NOT NULL,
  `hp` tinyint(4) NOT NULL,
  `xp` tinyint(4) NOT NULL,
  `str` tinyint(4) NOT NULL,
  `end` tinyint(4) DEFAULT NULL,
  `gold` tinyint(4) DEFAULT NULL,
  `wpns` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Player data
--

INSERT INTO `player` (`ID`, `classType`, `hp`, `xp`, `str`, `end`, `gold`, `wpns`) VALUES
(1, `link`, 100, 50, 50, 50, 30, 5);
INSERT INTO `player` (`ID`, `classType`, `hp`, `xp`, `str`, `end`, `gold`, `wpns`) VALUES
(2, `merlin`, 200, 150, 150, 150, 30, 5);


-- Weapons
--

DROP TABLE IF EXISTS `weapon`;
CREATE TABLE `weapon` (
  `ID` tinyint(1) NOT NULL,
  `weaponType` varchar(50) NOT NULL,
  `hp` tinyint(4) NOT NULL,
  `xp` tinyint(4) NOT NULL,
  `str` tinyint(4) NOT NULL,
  `end` tinyint(4) DEFAULT NULL,
  `gold` tinyint(4) DEFAULT NULL,
  `wpns` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Weapon data
--

INSERT INTO `weapon` (`ID`, `weaponType`, `hp`, `xp`, `str`, `end`, `gold`, `wpns`) VALUES
(1, `sword`, 100, 50, 50, 50, 30, 5);
INSERT INTO `weapon` (`ID`, `weaponType`, `hp`, `xp`, `str`, `end`, `gold`, `wpns`) VALUES
(2, `axe`, 200, 150, 150, 150, 30, 5);

-- --------------------------------------------------------

-- Index player
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `player.classType` (`classType`);

--
-- Index weapon
--
ALTER TABLE `weapon`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `weapon.classType` (`classType`),
  ADD KEY `classType` (`classType`) USING BTREE;

--

-- AUTO_INCREMENT pour la table `weapon`
--
ALTER TABLE `weapon`
  MODIFY `ID` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour la table `weapon`
--
ALTER TABLE `weapon`
  ADD CONSTRAINT `FK_weapon` FOREIGN KEY (`classType`) REFERENCES `player` (`ID`);


 