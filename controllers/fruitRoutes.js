////////////////////////
// Setup - Import deps and create app object
////////////////////////

const express = require('express');
const Fruit = require('../models/fruit');

const router = express.Router();


router.use((req, res, next) => {
	// check to see if the user ig logged in via the req.session.loggedIn property. This property was defined in the controller.user.js file.
	// if the user is loggedIn we are going to use the next() which means allow the user to access the routes defined below
	if(req.session.loggedIn) {
		next();
	} else {
		// else the user is not loggedIn, therefor just have the suer redirected to the login page
		res.redirect('/user/login')
	}
})

///////////////////////
// Declare Routes and Routers
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

router.get('/', async (req, res) => {
	// const allFruits = [{name: 'banana'}, {name: 'apple'}]

	const allFruits = await Fruit.find({username: req.session.username});

	res.render('fruits/index.ejs', { fruits: allFruits, user: req.session.username });
});

router.get('/new', (req, res) => {
	res.render('fruits/new.ejs');
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	await Fruit.findByIdAndDelete(id);
	res.redirect('/fruit');
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;

	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

	await Fruit.findByIdAndUpdate(id, req.body);
	res.redirect('/fruit');
});

router.post('/', async (req, res) => {
	// {
	// 	name: 'mango',
	// 	color: 'green',
	// 	readyToEat: "on"
	// }

	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

	// {
	// 	name: 'mango',
	// 	color: 'green',
	// 	readyToEat: true
	// }

	req.body.username = req.session.username;

	// {
	// 	name: 'mango',
	// 	color: 'green',
	// 	readyToEat: true
	//	username: req.session.username
	// }

	await Fruit.create(req.body);
	res.redirect('/fruit');
});

router.get('/:id/edit', async (req, res) => {
	const id = req.params.id;
	const fruit = await Fruit.findById(id);

	res.render('fruits/edit.ejs', { fruit });
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const fruit = await Fruit.findById(id)

	res.render('fruits/show.ejs', {fruit})
})




module.exports = router;