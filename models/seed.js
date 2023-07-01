const mongoose = require('./connection');
const Fruit = require('./fruit');


mongoose.connection.on('open', async () => {
    // create entries into the db using the startFruits
    // in order to do this we need to delete everything
    await Fruit.deleteMany();

    // then using startFruits, we will insert that into the db
    const startFruits = [
		{ name: 'Orange', color: 'orange', readyToEat: false },
		{ name: 'Grape', color: 'purple', readyToEat: false },
		{ name: 'Banana', color: 'orange', readyToEat: false },
		{ name: 'Strawberry', color: 'red', readyToEat: false },
		{ name: 'Coconut', color: 'brown', readyToEat: false },
	];
    await Fruit.create(startFruits);


    // we close the connection
    mongoose.connection.close();


})