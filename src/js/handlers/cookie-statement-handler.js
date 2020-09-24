// MIT LICENSE

/**
 * Requires
 */

const Constants = require('../../../Constants');
const {
	handlePerformanceConsentUpdate,
	handleAnalyticsConsentUpdate,
	handleTargetingConsentUpdate
} = require('../modules/cookies');

/**
 * Handlers
 */

const handleConsentStateChange = (cookie, element) => {

	// Update consent cookie
	const expires = (new Date(Date.now() + Constants.CONSENT_COOKIE_EXPIRATION)).toUTCString();
	const cookieDomain = (process.env.ENV === 'development') ? '' : `domain=${window.location.hostname};`;
	document.cookie = `${Constants.CONSENT_ACTION_TAKEN_COOKIE}=true; expires=${expires}; path=/; ${cookieDomain}`;
	if ($(element).hasClass('active')) {
		document.cookie = `${cookie}=true; expires=${expires}; path=/; ${cookieDomain}`;
	} else {
		document.cookie = `${cookie}=false; expires=${expires}; path=/; ${cookieDomain}`;
	}

	// Hide cookie bar if present
	if ($('#cookie-consent-bar').length) {
		const value = `-${$('#cookie-consent-bar').outerHeight()}px`;
		$('#cookie-consent-bar').animate({ bottom: value }, 300, function () {
			$(this).hide(400);
		});
	}
};

/**
 * Action Handlers
 */

const createActionHandlers = async () => {

	// Handle select performance cookies option
	$(document).on('click', '#cookie-settings-check-2', function () {

		// Toggle selected state
		$(this).toggleClass('active');

		// Change consent state
		handleConsentStateChange(Constants.CONSENT_PERFORMANCE_ENABLED_COOKIE, this);

		// Handle consent state change
		handlePerformanceConsentUpdate($(this).hasClass('active'));
	});

	// Handle select performance cookies option
	$(document).on('click', '#cookie-settings-check-3', function () {

		// Toggle selected state
		$(this).toggleClass('active');

		// Change consent state
		handleConsentStateChange(Constants.CONSENT_ANALYTICS_ENABLED_COOKIE, this);

		// Handle consent state change
		handleAnalyticsConsentUpdate($(this).hasClass('active'));
	});

	// Handle select performance cookies option
	$(document).on('click', '#cookie-settings-check-4', function () {

		// Toggle selected state
		$(this).toggleClass('active');

		// Change consent state
		handleConsentStateChange(Constants.CONSENT_TARGETING_ENABLED_COOKIE, this);

		// Handle consent state change
		handleTargetingConsentUpdate($(this).hasClass('active'));
	});
};

/**
 * Init
 */

exports.initialize = () => {

	// Create action handlers
	createActionHandlers();
};
