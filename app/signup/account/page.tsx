import { redirect } from 'next/navigation';
import { Form } from './Form';
import { User, userSchema } from '../utils';
import { connect } from '@planetscale/database';

const conn = connect({
	url: process.env['DATABASE_URL'] || 'mysql://user:pass@host'
});

export default async function Account({ searchParams }: { searchParams: Record<string, string> }) {
	if (Object.entries(searchParams).length) {
		const parseRes = userSchema.safeParse(searchParams);
		if (parseRes.success) {
			await conn.execute('INSERT INTO users SET email= :email, name= :name;', parseRes.data);
			redirect('/signup/confirm');
		} else {
			const { error } = parseRes;
			const badKeys = error.issues.map((issue) => issue.path.join('')).flat();
			return <Form badKeys={badKeys as (keyof User)[]} />;
		}
	}

	return <Form />;
}
