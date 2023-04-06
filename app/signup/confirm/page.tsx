import { readUser } from '../mock-db';
import { redirect } from 'next/navigation';

export default async function SignupConfirm() {
	const user = await readUser();
	if (!user) {
		redirect('/signup/account');
	}

	return <h1>Confirmed! Welcome to is-even, {user.name} 👋</h1>;
}
