'use strict';


// prepend target links to headers
module.exports = (function(){
	$('#navbar').on('click', '.navbar-collapse.in a', () => {
		$(".navbar-toggle").click();
	});
}());