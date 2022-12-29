const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// get all products:
router.get('/', async (req, res) => {
	try {
		const allProducts = await Product.find();
		res.status(200).json(allProducts);
	} catch (err) {
		console.log(err);
	}
});

// get albums category:
router.get('/albums', async (req, res) => {
	try {
		const albums = await Product.find({ type: 'albums' });
		res.status(200).json(albums);
	} catch (err) {
		console.log(err);
	}
});

// get books:
router.get('/books', async (req, res) => {
	try {
		const books = await Product.find({ type: 'books' });
		res.status(200).json(books);
	} catch (err) {
		console.log(err);
	}
});

// get product by id:
router.get('/:id', async (req, res) => {
	try {
		const prod = await Product.findOne({
			id: req.params.id,
		});
		res.send(prod);
	} catch (err) {
		console.log(err);
	}
});

// edit product:
router.put('/edit/:id', async (req, res) => {
	console.log(req.body);
	try {
		const filter = { id: req.params.id };
		const updated = await Product.findOneAndUpdate(filter, {
			$set: {
				price: req.body.price,
				discount: req.body.discount,
				title: req.body.title,
				authors: req.body.authors,
				description: req.body.description,
			},
		}).then((res) => {
			console.log(res);
		});
		res.status(200).json(updated);
	} catch (err) {
		console.log(err);
	}
});

// add product:
router.post('/add', async (req, res) => {
	try {
		const product = new Product({
			id: req.body.id,
			title: req.body.title,
			authors: req.body.authors,
			releaseYear: req.body.releaseYear,
			description: req.body.description,
			img: req.body.img,
			price: req.body.price,
			discount: req.body.discount,
			categoryID: req.body.categoryID,
			format: req.body.format,
			type: req.body.type,
			pages: req.body.pages,
			language: req.body.language,
			label: req.body.label,
			publisher: req.body.publisher,
		});
		const newProd = await product.save();
	} catch (err) {
		console.log(err);
	}
});

// remove product:
router.delete('/remove/:id', async (req, res) => {
	if (req.body.password === process.env.PASS) {
		try {
			const product = await Product.findOne({
				id: req.params.id,
			})
				.deleteOne()
				.exec();
			res.status(200).json('Usunięto produkt');
		} catch (err) {
			console.log(err);
		}
	} else {
		res.status(401).json('wrong credentials');
	}
});

module.exports = router;
