import { redirect } from 'next/navigation';
import { Form } from './Form';
import { User, userSchema } from '../utils';
import { writeUser } from '../mock-db';

export default async function Account({ searchParams }: { searchParams: Record<string, string> }) {
	if (Object.entries(searchParams).length) {
		const parseRes = userSchema.safeParse(searchParams);
		if (parseRes.success) {
			await writeUser(parseRes.data);
			redirect('/signup/confirm');
		} else {
			const { error } = parseRes;
			const badKeys = error.issues.map((issue) => issue.path.join('')).flat();
			return <Form badKeys={badKeys as (keyof User)[]} />;
		}
	}

	return <Form />;
}
