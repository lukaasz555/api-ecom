import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ordersRoute from './routes/orders';
import productsRoute from './routes/products';
import contactRoute from './routes/contact';
import userRoute from './routes/user';

const dotenv = require('dotenv');
const app: Application = express();
const PORT = 4000;

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);

run().catch((e: Error) => console.log(e));

async function run() {
	if (process.env.MONGODB) {
		await mongoose.connect(process.env.MONGODB);
	}
}

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);

app.listen(PORT, () => {
	console.log('Running on port', PORT);
});
