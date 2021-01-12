<?php
/**
 * HM Utility Taxonomy CLI
 */

declare( strict_types=1 );

namespace HM\Utility_Taxonomy\CLI;

use WP_CLI;

/**
 * CLI bootstrapper
 *
 * @return void
 */
function bootstrap(): void {
	if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
		return;
	}

	require_once __DIR__ . '/class-assign-defaults-command.php';

	add_action( 'init', __NAMESPACE__ . '\\register_commands' );
}

/**
 * Register CLI commands
 *
 * @return void
 */
function register_commands(): void {
	WP_CLI::add_command( 'hm-utility-taxonomy assign-defaults', __NAMESPACE__ . '\\Assign_Defaults_Command' );
}
