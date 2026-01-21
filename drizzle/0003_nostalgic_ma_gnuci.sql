CREATE TABLE `ra_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(128) NOT NULL,
	`description` text,
	`subcategoryCount` int DEFAULT 0,
	`originalUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ra_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `ra_categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `ra_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `ra_glossary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`term` varchar(255) NOT NULL,
	`definition` text NOT NULL,
	`relatedSessions` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ra_glossary_id` PRIMARY KEY(`id`),
	CONSTRAINT `ra_glossary_term_unique` UNIQUE(`term`)
);
--> statement-breakpoint
CREATE TABLE `ra_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`sessionDate` varchar(64),
	`content` text NOT NULL,
	`originalUrl` varchar(512) NOT NULL,
	`archivedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ra_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `ra_sessions_sessionNumber_unique` UNIQUE(`sessionNumber`)
);
