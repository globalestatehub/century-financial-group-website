CREATE TABLE `mortgageLeads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(80) NOT NULL,
	`lastName` varchar(80) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`preferredContact` enum('email','phone') NOT NULL,
	`assessmentGoal` varchar(120),
	`assessmentConcern` varchar(120),
	`assessmentTimeline` varchar(80),
	`contactConsent` boolean NOT NULL DEFAULT false,
	`smsConsent` boolean NOT NULL DEFAULT false,
	`privacyAcknowledged` boolean NOT NULL DEFAULT false,
	`source` varchar(80) NOT NULL DEFAULT 'california_readiness_assessment',
	`licenseDisclosure` varchar(120) NOT NULL DEFAULT 'CA DRE 01930905 | MLO 1974007',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mortgageLeads_id` PRIMARY KEY(`id`)
);
