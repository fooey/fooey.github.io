async.series([
	function(nextSeries){
		const flip = __getFlip(emblemData.flags);
		if (flip > 3) {
			transformStr = transformStr.concat(' s',((flip & 8) !== 0) ? -1 : 1,',',((flip & 4) !== 0) ? -1 : 1,',',__INSTANCE.base_size/2,',',__INSTANCE.base_size/2);
		}
		nextSeries(null);
	},
	__drawShape.bind(null, paper, fg.p1, {'fill':color1, 'stroke':'none', 'transform': transformStr}),
	__drawShape.bind(null, paper, fg.p2, {'fill':color2, 'stroke':'none', 'transform': transformStr}),
	__drawShape.bind(null, paper, fg.pto2, {'fill':__INSTANCE.pto2_color, 'stroke':'none', 'opacity':__INSTANCE.pto2_op, 'transform': transformStr}),
	__drawShape.bind(null, paper, fg.pt1, {'fill':color1, 'stroke':'none', 'opacity':__INSTANCE.pt1_op, 'transform': transformStr}),
], onDone);