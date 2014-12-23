Controller.get = function(cacheKey, cacheTime, onCacheMiss, onData){
	const cachePath = __getCachePath(cacheKey);

	__isFresh(
		cachePath,
		cacheTime,
		__read.bind(null, cachePath, onData),
		onCacheMiss.bind(null, function(err, data){
			__write(cachePath, data, onData.bind(null, err, data));
		})
	);
};