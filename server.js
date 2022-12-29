const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ordersRoute = require('./routes/orders');
const productsRoute = require('./routes/products');

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log('Connected to MongoDB.'))
	.catch((err) => console.log(err));

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);

app.listen(PORT, () => {
	console.log('Running on port', PORT);
});
