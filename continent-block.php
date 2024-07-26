<?php
/**
 * Plugin Name:       Continent Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       continent-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_continent_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_continent_block_block_init' );

function get_user_country_iso_code() {
    // Get geo-information for the current IP
    $geo_info = geoip_detect2_get_info_from_current_ip();
    return $geo_info->country->isoCode;
}

function pass_geo_info_to_js() {
    // Get the country ISO code
    $country_iso_code = $_SERVER['GEOIP_COUNTRY_CODE'](); //vip go function, add https://github.com/Automattic/vip-go-geo-uniques

    // Pass the country ISO code to JavaScript
    wp_enqueue_script('my-geo-script', plugins_url('/js/my-geo-script.js', __FILE__), array('jquery'), null, true);
    wp_localize_script('my-geo-script', 'geoData', array(
        'countryIsoCode' => $country_iso_code
    ));
}

add_action('wp_enqueue_scripts', 'pass_geo_info_to_js');
