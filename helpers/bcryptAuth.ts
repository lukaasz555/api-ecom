import bcrypt from 'bcrypt';
const saltRounds = 10;

export const getHashedPassword = async (password: string) => {
	return await bcrypt
		.hash(password, saltRounds)
		.then((pw) => pw)
		.catch((e) => console.log(e));
};

export const validatePassword = async (
	password: string,
	userPassword: string
) => {
	return await bcrypt.compare(password, userPassword);
};
