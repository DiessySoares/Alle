
-- -----------------------------------------------------
-- Table `alle`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `usu_name` VARCHAR(80) NOT NULL,
  `usu_email` VARCHAR(120) NOT NULL,
  `usu_password_pbkdf2` MEDIUMTEXT NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`idUser`));


-- -----------------------------------------------------
-- Table `alle`.`Wifi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Wifi` (
  `idWifi` INT NOT NULL AUTO_INCREMENT,
  `wfi_name` VARCHAR(32) NOT NULL,
  `wfi_user-aes` TINYTEXT NOT NULL,
  `wfi_key-aes` TINYTEXT NOT NULL,
  `wfi_con_type` VARCHAR(2) NULL,
  `wfi_auth_method` VARCHAR(45) NULL,
  `wfi_idUser` INT NOT NULL,
  PRIMARY KEY (`idWifi`),
  INDEX `fk_Wifi_User_idx` (`wfi_idUser` ASC),
  CONSTRAINT `fk_Wifi_User`
    FOREIGN KEY (`wfi_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `alle`.`Web`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Web` (
  `idWeb` INT NOT NULL AUTO_INCREMENT,
  `web_name` VARCHAR(45) NOT NULL,
  `web_url` VARCHAR(255) NOT NULL,
  `web_user-aes` TINYTEXT NOT NULL,
  `web_key-aes` TINYTEXT NOT NULL,
  `web_idUser` INT NOT NULL,
  PRIMARY KEY (`idWeb`),
  INDEX `fk_Web_User1_idx` (`web_idUser` ASC),
  CONSTRAINT `fk_Web_User1`
    FOREIGN KEY (`web_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `alle`.`Text`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Text` (
  `idText` INT NOT NULL AUTO_INCREMENT,
  `txt_name` VARCHAR(45) NOT NULL,
  `txt_text` MEDIUMTEXT NOT NULL,
  `txt_idUser` INT NOT NULL,
  PRIMARY KEY (`idText`),
  INDEX `fk_Text_User1_idx` (`txt_idUser` ASC),
  CONSTRAINT `fk_Text_User1`
    FOREIGN KEY (`txt_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `alle`.`Email`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Email` (
  `idEmail` INT NOT NULL AUTO_INCREMENT,
  `eml_email` VARCHAR(45) NOT NULL,
  `eml_key-aes` VARCHAR(45) NOT NULL,
  `eml_idUser` INT NOT NULL,
  PRIMARY KEY (`idEmail`),
  INDEX `fk_Email_User1_idx` (`eml_idUser` ASC),
  CONSTRAINT `fk_Email_User1`
    FOREIGN KEY (`eml_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `alle`.`Credit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Credit` (
  `idCredit` INT NOT NULL AUTO_INCREMENT,
  `crt_name` VARCHAR(80) NOT NULL,
  `crt_number-aes` VARCHAR(100) NOT NULL,
  `crt_expiration-aes` VARCHAR(100) NOT NULL,
  `crt_cvv-aes` VARCHAR(45) NOT NULL,
  `crt_key-aes` TINYTEXT NOT NULL,
  `crt_idUser` INT NOT NULL,
  PRIMARY KEY (`idCredit`),
  INDEX `fk_Credit_User1_idx` (`crt_idUser` ASC),
  CONSTRAINT `fk_Credit_User1`
    FOREIGN KEY (`crt_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `alle`.`Application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alle`.`Application` (
  `idApplication` INT NOT NULL AUTO_INCREMENT,
  `app_name` VARCHAR(80) NOT NULL,
  `app_user-aes` TINYTEXT NULL,
  `app_key-aes` TINYTEXT NULL,
  `app_acc_code-aes` TINYTEXT NULL,
  `app_version` VARCHAR(45) NULL,
  `app_idUser` INT NOT NULL,
  PRIMARY KEY (`idApplication`),
  INDEX `fk_Application_User1_idx` (`app_idUser` ASC),
  CONSTRAINT `fk_Application_User1`
    FOREIGN KEY (`app_idUser`)
    REFERENCES `alle`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);