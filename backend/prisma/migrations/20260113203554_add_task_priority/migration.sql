-- AlterTable
ALTER TABLE `Tasks` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Waiting',
    MODIFY `priority` VARCHAR(191) NOT NULL DEFAULT 'Low';
