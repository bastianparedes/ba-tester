CREATE TABLE `Campaign` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lastModifiedDate` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text(100) DEFAULT '' NOT NULL,
	`requirements` text NOT NULL,
	`status` text DEFAULT 'inactive' NOT NULL,
	`triggers` text NOT NULL,
	`variations` text NOT NULL
);
