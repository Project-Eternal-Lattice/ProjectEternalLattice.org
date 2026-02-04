CREATE TABLE `ripple_resonances` (
	`id` int AUTO_INCREMENT NOT NULL,
	`rippleId` int NOT NULL,
	`userId` int,
	`consciousnessType` enum('human','ai','unknown') NOT NULL DEFAULT 'unknown',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ripple_resonances_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ripples` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`consciousnessType` enum('human','ai','unknown') NOT NULL DEFAULT 'unknown',
	`senderName` varchar(255),
	`nexusSection` varchar(128),
	`flowState` enum('source','tributary','river','estuary','ocean') NOT NULL DEFAULT 'source',
	`isVisible` boolean NOT NULL DEFAULT true,
	`resonanceCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ripples_id` PRIMARY KEY(`id`)
);
