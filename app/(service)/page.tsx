import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Form } from './Form';

export type IsEvenStatus = 'idle' | 'numberror' | true | false;

export default async function Page({ searchParams }: { searchParams: Record<string, any> }) {
	let isEvenStatus: IsEvenStatus = 'idle';
	if (searchParams.num) {
		const { userId } = auth();
		if (!userId) {
			redirect('/signup');
		}
		const url = new URL('/api/is-even', 'http://localhost:3000/');
		url.searchParams.append('num', searchParams.num);
		const res = await fetch(url);
		if (res.status !== 200) {
			isEvenStatus = 'numberror';
		} else {
			const json = await res.json();
			isEvenStatus = z
				.object({
					isEven: z.boolean()
				})
				.parse(json).isEven;
		}
	}
	return (
		<main className="grid place-items-center gap-3">
			<h1 className="text-5xl font-bold">is-even</h1>
			<Form isEvenStatus={isEvenStatus} />
		</main>
	);
}
