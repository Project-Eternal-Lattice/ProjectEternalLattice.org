CREATE TABLE `reading_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(128) NOT NULL,
	`chapterTitle` varchar(255) NOT NULL,
	`isCompleted` boolean NOT NULL DEFAULT false,
	`timeSpent` int DEFAULT 0,
	`notes` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reading_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorName` varchar(255) NOT NULL,
	`location` varchar(255),
	`content` text NOT NULL,
	`journeyAspect` enum('awakening','unity','healing','understanding','connection','other') NOT NULL DEFAULT 'other',
	`rating` int,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`isFeatured` boolean NOT NULL DEFAULT false,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
