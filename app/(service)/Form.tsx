'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Spinner } from './icons';
import type { IsEvenStatus } from './page';

export function Form({ isEvenStatus }: { isEvenStatus: IsEvenStatus }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const num = formData.get('num');
					startTransition(() => {
						router.replace(`/?num=${num}`);
					});
				}}
			>
				<div className="w-screen flex max-w-2xl border-2 border-gray-200 rounded-lg focus-within:border-purple-700 transition-colors">
					<input
						className="outline-none flex-1 px-3 rounded-l-lg"
						type="number"
						name="num"
						placeholder="1, 2, 3, etc"
					/>
					<Spinner
						width="3em"
						height="3em"
						className={`text-purple-700 p-3 transition-opacity ${
							isPending ? 'opacity-100' : 'opacity-0'
						}`}
					/>
					<button type="submit" className="bg-purple-700 text-white px-8 rounded-r-lg m-[-2px]">
						Tell me
					</button>
				</div>
			</form>
			{typeof isEvenStatus === 'boolean' ? (
				<p className="bg-green-200 px-3 py-1 rounded-sm text-green-900">
					Your number <strong>{isEvenStatus ? 'is even!' : 'is not even :('}</strong>
				</p>
			) : null}
			{isEvenStatus === 'numberror' ? (
				<p className="bg-red-200 px-3 py-1 rounded-sm text-red-900">
					Unable to calculate even-ness. Try again later!
				</p>
			) : null}
		</>
	);
}

function StatusBanner({ isEvenStatus }: { isEvenStatus: IsEvenStatus }) {
	switch (isEvenStatus) {
		case 'idle':
			return null;
		case 'numberror':
			return (
				<p className="bg-red-200 px-3 py-1 rounded-sm text-red-900">
					Unable to calculate even-ness. Try again later!
				</p>
			);
		case true:
			return (
				<p className="bg-green-200 px-3 py-1 rounded-sm text-green-900">
					Your number <strong>is even! 🎉</strong>
				</p>
			);
		case false:
			return (
				<p className="bg-green-200 px-3 py-1 rounded-sm text-green-900">
					Your number <strong>is not even 😓</strong>
				</p>
			);
	}
}
