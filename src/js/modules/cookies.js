// MIT LICENSE

/**
 * Requires
 */

const recaptchaScript = require('../../../views/components/recaptcha.ejs')();
const hotjarScript = require('../../../views/components/hotjar_head.ejs');

/**
 * Handlers
 */

exports.handlePerformanceConsentUpdate = (granted) => {
	if (granted === true) {

		// Trigger GTM Performance
		try {
			window.dataLayer.push({ event: 'consent_given_performance' });
		} catch (err) {}

		// Set up reCAPTCHA if needed
		if ($('#recaptcha-page-script').length === 0) {
			$(recaptchaScript).appendTo(document.head);
		}
	}
};

exports.handleAnalyticsConsentUpdate = (granted) => {
	if (granted === true) {

		// Trigger GTM Analytics
		try {
			window.dataLayer.push({ event: 'consent_given_analytics' });
		} catch (err) {}

		// Set up Hotjar if needed
		if ($('#hotjar-page-script').length === 0 && process.env.ENV === 'production') {
			const script = hotjarScript();
			$(script).appendTo(document.head);
		}
	}
};

exports.handleTargetingConsentUpdate = (granted) => {
	if (granted === true) {

		// Trigger GTM Targeting
		try {
			window.dataLayer.push({ event: 'consent_given_targeting' });
		} catch (err) {}
	}
};
