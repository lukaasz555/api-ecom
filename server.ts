import express, { Application, Request, Response, Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ordersRoute from './routes/orders';
import productsRoute from './routes/products';
import contactRoute from './routes/contact';
import authRoute from './routes/auth';
import userRoute from './routes/user';

const dotenv = require('dotenv');
const app: Express = express();
const PORT = 4000;

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);

app.get('/hello', (req: Request, res: Response) => {
	res.json({
		message: 'test vercel',
		date: String(new Date()).substring(0, 10),
	});
});

run().catch((e: Error) => console.log(e));

async function run() {
	if (process.env.MONGODB) {
		await mongoose.connect(process.env.MONGODB);
	}
}

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/auth', authRoute);
app.use('/contact', contactRoute);
app.use('/user', userRoute);

app.listen(PORT, () => {
	console.log('Running on port', PORT);
});
