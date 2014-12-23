Controller.getById = function(guildId, cbGetter){
	cache.get(
		guildId,
		__INSTANCE.cacheTime,
		function(cbCacheMiss){
			gw2api.getGuildDetails({guild_id: guildId}, cbCacheMiss)
		},
		function(err, data){
			if(data && data.guild_name){
				__guildMap[data.guild_name.toLowerCase()] = data.guild_id;
				__saveGuildMap();
			}
			cbGetter(err, data);
		}
	);
};