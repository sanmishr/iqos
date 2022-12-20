"use strict";
use(function() {
	var domainConfig = {};
	domainConfig.domainName = request.getRequestURL().toString().replace(request.getRequestURI(), "");
	return domainConfig;
});