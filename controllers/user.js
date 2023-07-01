const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    // this is just temp
    res.render('users/signup.ejs');
})

router.post('/signup', async (req, res) => {
	
    try {
        // req.body = {username: 'fruitguy', password: 'fruitguy'}
	    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
	    // req.body = {username: 'fruitguy', password: 'greahuiorghruiel'}
	    await User.create(req.body);
        res.redirect('/user/login');
    } catch {
        res.send('there was an error');
    }
});



router.get('/login', (req, res) => {
    // this is just temp
	res.render('users/login.ejs');
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});


    // if the username entered doesn't exist in the db
    if (!user) {
        res.send(`user doesn't exist`)
    } else {
		// if there is a match the variable passmatches will be truthy
		// compare the password that was entered on the form with the password saved in the DB
		const passmatches = bcrypt.compareSync(req.body.password, user.password);
		if (passmatches) {
			req.session.username = req.body.username;
			req.session.loggedIn = true;
			res.redirect('/fruit');
		} else {
            res.send('wrong password')
        }
	}

});

// destroy the session and have the user go back to the / route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
})

module.exports = router;