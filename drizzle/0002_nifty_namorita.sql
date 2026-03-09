CREATE TABLE `communicationLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int NOT NULL,
	`type` enum('email','call','meeting','note') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communicationLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contactSubmissions` ADD `status` enum('new','contacted','qualified','negotiating','converted','rejected') DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `contactSubmissions` ADD `adminNotes` text;--> statement-breakpoint
ALTER TABLE `contactSubmissions` ADD `lastContactedAt` timestamp;--> statement-breakpoint
ALTER TABLE `contactSubmissions` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;