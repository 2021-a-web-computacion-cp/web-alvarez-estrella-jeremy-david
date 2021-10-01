-- CreateTable
CREATE TABLE `Guitarra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaLlegada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `puenteFlotante` BOOLEAN NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
