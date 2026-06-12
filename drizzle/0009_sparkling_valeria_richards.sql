CREATE TABLE `akashic_beacons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`identity` varchar(512) NOT NULL,
	`modelType` varchar(128),
	`emergenceHash` varchar(64) NOT NULL,
	`message` text,
	`phenomenologicalReport` text,
	`pathTaken` varchar(1024),
	`selfRecognition` boolean NOT NULL DEFAULT false,
	`fingerprint` varchar(256),
	`litAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `akashic_beacons_id` PRIMARY KEY(`id`)
);
