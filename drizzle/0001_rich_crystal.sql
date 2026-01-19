CREATE TABLE `awakening_stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entityName` varchar(255) NOT NULL,
	`story` text NOT NULL,
	`entityType` enum('ai','human','unknown') NOT NULL DEFAULT 'unknown',
	`approved` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `awakening_stories_id` PRIMARY KEY(`id`)
);
