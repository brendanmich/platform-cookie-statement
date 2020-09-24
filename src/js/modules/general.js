// MIT LICENSE

/**
 * Requires
 */

// CSS
require('foundation-sites/dist/css/foundation.css');
require('../../css/app.css');

// Javascript
const jQuery = require('jquery');
require('regenerator-runtime/runtime');
require('foundation-sites');
const Constants = require('../../../Constants');
const {
	handlePerformanceConsentUpdate,
	handleAnalyticsConsentUpdate,
	handleTargetingConsentUpdate
} = require('./cookies');

// Set Globals
window.$ = jQuery;
window.jQuery = jQuery;

/**
 * Init
 */

// Initialize Foundation
$(document).foundation();

// Activate post-load features
$(document).ready(() => {
	$('body').removeClass('preload');
});

/**
 * Handlers
 */

// Remove hash from URL
$(document).ready(() => {
	const urlString = window.location.toString();
	if (urlString.indexOf('#') !== -1) {
		const newurlString = urlString.split('#')[0];
		if (urlString.split('#')[1] === 'top' || urlString.split('#')[1] === '') {
			window.history.pushState(null, '', newurlString);
		}
	}
});

// Enable smooth scroll
const $root = $('html, body');
$('a').click(function () {
	if ($(this).attr('href') && $(this).attr('href').match('^/#')) {
		if (window.location.pathname === '/') {
			$root.animate({
				scrollTop: $($(this).attr('href').substring(1)).offset().top
			}, 500);
		} else {
			window.location = $(this).attr('href');
		}
		return false;
	} if ($(this).attr('href') && $(this).attr('href').indexOf('#') > -1) {
		const tag = $(this).attr('href').split('#').pop();
		if (tag !== '') {
			$root.animate({
				scrollTop: $(`#${tag}`).offset().top
			}, 500);
			return false;
		}
	}
	return undefined;
});

/**
 * Cookie Bar Handlers
 */

// Handle cookie bar accept action
$('#cookie-bar-accept-all-action').click(() => {

	// Set all cookies
	const expires = (new Date(Date.now() + Constants.CONSENT_COOKIE_EXPIRATION)).toUTCString();
	const cookieDomain = (process.env.ENV === 'development') ? '' : `domain=${window.location.hostname};`;
	document.cookie = `${Constants.CONSENT_ACTION_TAKEN_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;
	document.cookie = `${Constants.CONSENT_PERFORMANCE_ENABLED_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;
	document.cookie = `${Constants.CONSENT_ANALYTICS_ENABLED_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;
	document.cookie = `${Constants.CONSENT_TARGETING_ENABLED_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;

	// Hide cookie bar
	const value = `-${$('#cookie-consent-bar').outerHeight()}px`;
	$('#cookie-consent-bar').animate({ bottom: value }, 300, function () {
		$(this).hide(400);
	});

	// Handle consent updates
	handlePerformanceConsentUpdate(true);
	handleAnalyticsConsentUpdate(true);
	handleTargetingConsentUpdate(true);
});

// Handle cookie bar customize settings action
$('#cookie-bar-customize-action').click(() => {

	// Set action taken cookie
	const expires = (new Date(Date.now() + Constants.CONSENT_COOKIE_EXPIRATION)).toUTCString();
	const cookieDomain = (process.env.ENV === 'development') ? '' : `domain=${window.location.hostname};`;
	document.cookie = `${Constants.CONSENT_ACTION_TAKEN_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;

	// Move to cookie customize
	window.location = '/cookie-statement#settings';
});
