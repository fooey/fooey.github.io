function __drawShape(paper, shapes, attributes, callback){
	if(shapes){
		async.each(
			shapes,
			function(shape, nextShape){
				paper.path(shape).attr(attributes);
				nextShape(null);
			},
			callback
		);
	}
	else{
		callback(null);
	}
};