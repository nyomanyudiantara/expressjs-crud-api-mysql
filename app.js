const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./config/db');

db.authenticate().then(() => console.log('connected to database'));

const User = require('./models/User');

app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => res.send('Success'));

//POST
app.post('/post', async (req, res) => {

	try {

		const { username, email, password } = req.body;

		const newUser = new User({
			username,
			email,
			password
		});

		await newUser.save();

		res.json(newUser);

	} catch(err) {
		console.error(err.message);
		req.status(500).send('Server error');
	}

});

//GET USERS
app.get('/post', async (req, res) => {
	try {

		const getAllUser = await User.findAll({});

		res.json(getAllUser);

	} catch(err) {
		console.log(err.message);
		req.status(500).send('Error in getting api');
	}
});

//GET BY ID
app.get('/post/:id', async (req,res) => {
	try {
		const id = req.params.id;

		const getUserById = await User.findOne({
			where: {id:id}
		});

		res.json(getUserById);

	} catch(err) {
		console.log(err.message);
		req.status(500).send('Error in getting api by ID');
	}
});

//DELETE
app.delete('/post/:id', async (req,res) => {
	try {
		const id = req.params.id;

		const deleteUser = await User.destroy({
			where: {id:id}
		});

		await deleteUser;

		res.json("Successfully deleted");

	} catch (err) {
		console.log(err.message);
		req.status(500).send('Error in deleting API');
	}
});

//UPDATE USERS
app.put('/post/:id', async (req, res) => {
	try {
		const {username, email, password} = req.body;
		const id = req.params.id;

		const updateUser = await User.update({
			username, email, password
		}, {where: {id:id}});

		await updateUser;

		res.json("Successfully updated");

	} catch(err) {
		console.log(err.message);
		req.status(500).send("Error in Updating API")
	}
});

app.listen(5000, () => console.log('Port is connected to 5000'));