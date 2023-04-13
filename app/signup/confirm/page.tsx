import { connect } from '@planetscale/database';
import { auth, currentUser } from '@clerk/nextjs/app-beta';

const conn = connect({
	url: process.env['DATABASE_URL'] || 'mysql://user:pass@host'
});

export default async function SignupConfirm() {
	// const res = await conn.execute('SELECT name, email FROM users WHERE email = :email;', {
	// 	email: 'ben@gmail.com'
	// });
	// if (!res.rows) {
	// 	redirect('/signup/account');
	// }

	// const [user] = res.rows;
	// console.log({ user });
	const user = await currentUser();

	console.log(user?.firstName);

	return <h1>Confirmed! Welcome to is-even, {user?.firstName} 👋</h1>;
}
