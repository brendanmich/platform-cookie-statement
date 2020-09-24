// MIT LICENSE

/**
 * Requires
 */

const requestIP = require('request-ip');
const geoip = require('geoip-lite');
const Constants = require('../../Constants');

/**
 * Handlers
 */

const generateComponentState = (req, res) => {

	// Get origin
	const { origin } = req.headers;

	// Create geo object
	let geo = {};

	// Get GeoIP for request
	const ipAddress = requestIP.getClientIp(req);
	const geoObj = geoip.lookup(ipAddress);
	if (geoObj != null) {
		geo = {
			country: geoObj.country,
			region: geoObj.region,
			eu: geoObj.eu,
			latlon: geoObj.ll
		};
	}

	// Initialize cookie state
	let consentActionTaken = req.cookies[Constants.CONSENT_ACTION_TAKEN_COOKIE] === 'true';
	let performanceEnabled = req.cookies[Constants.CONSENT_PERFORMANCE_ENABLED_COOKIE] === 'true';
	let analyticsEnabled = req.cookies[Constants.CONSENT_ANALYTICS_ENABLED_COOKIE] === 'true';
	let targetingEnabled = req.cookies[Constants.CONSENT_TARGETING_ENABLED_COOKIE] === 'true';

	// Handle cookie allowance
	const isEU = (geo.eu === '1');
	if (!consentActionTaken) {
		if (!isEU) { // User is not in an EU country

			// Set state
			consentActionTaken = true;
			performanceEnabled = true;
			analyticsEnabled = true;
			targetingEnabled = true;

			// Set cookies
			const expires = new Date(Date.now() + Constants.CONSENT_COOKIE_EXPIRATION);
			const domain = (process.env.ENV === 'development') ? null : origin;
			res.cookie(Constants.CONSENT_ACTION_TAKEN_COOKIE, 'true', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_PERFORMANCE_ENABLED_COOKIE, 'true', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_ANALYTICS_ENABLED_COOKIE, 'true', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_TARGETING_ENABLED_COOKIE, 'true', { expires, path: '/', domain });

		} else { // User is in an EU country

			// Set state
			consentActionTaken = false;
			performanceEnabled = false;
			analyticsEnabled = false;
			targetingEnabled = false;

			// Set cookies
			const expires = new Date(Date.now() + Constants.CONSENT_COOKIE_EXPIRATION);
			const domain = (process.env.ENV === 'development') ? null : origin;
			res.cookie(Constants.CONSENT_ACTION_TAKEN_COOKIE, 'false', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_PERFORMANCE_ENABLED_COOKIE, 'false', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_ANALYTICS_ENABLED_COOKIE, 'false', { expires, path: '/', domain });
			res.cookie(Constants.CONSENT_TARGETING_ENABLED_COOKIE, 'false', { expires, path: '/', domain });
		}
	}

	// Update component state
	const data = {
		state: {
			show_cookie_bar: !consentActionTaken,
			consent: {
				performance_enabled: performanceEnabled,
				analytics_enabled: analyticsEnabled,
				targeting_enabled: targetingEnabled
			},
			query: req.query
		}
	};

	// Return state
	return data;
};

/**
 * Exports
 */

module.exports = {
	generateComponentState
};
