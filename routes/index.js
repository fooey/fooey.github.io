module.exports = function(express) {
	var router = express.Router();

	router.get('/', function(req, res){
		res.render('index', {
			metaTitle: 'Jason Rushton',
			metaDescription: '',
			moment: require('moment'),
		});
	});

	return router;
}