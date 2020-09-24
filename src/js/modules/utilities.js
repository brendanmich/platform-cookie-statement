// MIT LICENSE

/**
 * Cookie Handlers
 */

exports.getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return undefined;
};

exports.isConsentLevelEnabled = (level) => {
	const cookie = exports.getCookie(level);
	if (cookie != null) return cookie === 'true';
	return false;
};
