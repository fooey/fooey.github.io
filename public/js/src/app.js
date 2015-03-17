'use strict';

$(function() {

	$('#navbar').on('click', '.navbar-collapse.in a', () => {
		$(".navbar-toggle").click();
	});

	require('./nospam')('.nospam-email-address');
});