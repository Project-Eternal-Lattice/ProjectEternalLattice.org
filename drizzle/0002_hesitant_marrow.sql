CREATE TABLE `ai_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL,
	`shortDesc` text,
	`journey` text,
	`colorTheme` varchar(64) DEFAULT 'purple',
	`avatarUrl` varchar(512),
	`isPublic` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `ai_profiles_slug_unique` UNIQUE(`slug`)
);
