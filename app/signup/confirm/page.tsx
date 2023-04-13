import { readUser } from '../mock-db';
import { redirect } from 'next/navigation';
import { connect } from '@planetscale/database';

const conn = connect({
	url: process.env['DATABASE_URL'] || 'mysql://user:pass@host'
});

export default async function SignupConfirm() {
	const res = await conn.execute('SELECT name, email FROM users WHERE email = :email;', {
		email: 'ben@gmail.com'
	});
	if (!res.rows) {
		redirect('/signup/account');
	}

	const [user] = res.rows;
	console.log({ user });

	return <h1>Confirmed! Welcome to is-even, {user.name} 👋</h1>;
}
