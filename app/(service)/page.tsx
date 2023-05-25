import { auth } from '@clerk/nextjs/app-beta';
import { redirect } from 'next/navigation';

// TODO: server action
export default function Page({ searchParams }: { searchParams: Record<string, any> }) {
	if (searchParams.number) {
		const { userId } = auth();
		if (!userId) {
			redirect('/signup');
		}
	}
	return (
		<main className="grid place-items-center gap-3">
			<h1 className="text-5xl font-bold">is-even</h1>
			<form>
				<input type="number" name="number" placeholder="1, 2, 3, etc" />
			</form>
		</main>
	);
}
