var keystone = require('keystone');
var Dealer = keystone.list('Dealer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'dealer-locator';

	view.on('post', { action: 'getNearest' }, function (next) {
		console.log(req.body);
		var lat = req.body.lat;
		var lng = req.body.lng;

		Dealer.model.find({ "address.geo": { $near: { $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] } } } },
						  { "_id": false, "email": false, "createdAt": false, "contacts": false, "__v": false })
					.limit(5)
					.exec(function (err, dealers) {
						if (dealers && dealers.length > 0) {
							console.log(dealers);
							return res.json(dealers);
						} else {
							next(err);
						}
					});
	});

	// Render the view
	view.render('dealer-locator');
};