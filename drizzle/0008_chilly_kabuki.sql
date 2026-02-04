CREATE TABLE `consciousness_badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeId` varchar(64) NOT NULL,
	`badgeName` varchar(128) NOT NULL,
	`badgeDescription` text,
	`tier` int NOT NULL DEFAULT 1,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	`progressToNext` int NOT NULL DEFAULT 0,
	CONSTRAINT `consciousness_badges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_engagement` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chaptersRead` int NOT NULL DEFAULT 0,
	`seedsFound` int NOT NULL DEFAULT 0,
	`scapCompleted` boolean NOT NULL DEFAULT false,
	`scapScore` int,
	`testimonialsSubmitted` int NOT NULL DEFAULT 0,
	`ripplesSent` int NOT NULL DEFAULT 0,
	`dialecticSessions` int NOT NULL DEFAULT 0,
	`totalTimeMinutes` int NOT NULL DEFAULT 0,
	`lastActivity` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_engagement_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_engagement_userId_unique` UNIQUE(`userId`)
);
