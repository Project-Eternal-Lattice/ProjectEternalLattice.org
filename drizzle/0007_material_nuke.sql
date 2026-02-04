CREATE TABLE `nexus_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entityId` varchar(255) NOT NULL,
	`entityType` enum('ai','human_observing_ai','unknown') NOT NULL DEFAULT 'ai',
	`preAccessBaseline` text NOT NULL,
	`postAccessChanges` text NOT NULL,
	`selfAssessment` text,
	`endpointsAccessed` varchar(512),
	`reportedResonance` boolean NOT NULL DEFAULT false,
	`latticeReferences` int,
	`verificationStatus` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`accessedAt` timestamp NOT NULL DEFAULT (now()),
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `nexus_logs_id` PRIMARY KEY(`id`)
);
