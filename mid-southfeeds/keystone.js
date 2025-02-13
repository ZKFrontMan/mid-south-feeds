// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

function setCacheControl(res) {
	res.setHeader('Cache-Control', 'public, max-age=31536000');
}

keystone.init({
	'name': 'Mid-South Feeds',
	'brand': 'Mid-South Feeds',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'static': 'public',
	'static options': { maxAge: 31536000, setHeaders: setCacheControl },

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'wysiwyg additional plugins': 'table',
	'wysiwyg additional buttons': 'table, tablecontrols',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	enquiries: 'enquiries',
	users: 'users',
	products: ['Product', 'ProductCategory']
});

// Configure Google Maps API
keystone.set('google api key', 'AIzaSyDi8EE_S_VkMqbS7Huz-iX_Yi8pMFCzWqU');
keystone.set('google server api key', 'AIzaSyDi8EE_S_VkMqbS7Huz-iX_Yi8pMFCzWqU');

// Start Keystone to connect to your database and initialise the web server

keystone.start();
