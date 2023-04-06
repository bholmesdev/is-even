'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent, ReactNode } from 'react';
import type { User } from '../utils';

type BadKeys = (keyof User)[];

export function Form({ badKeys = [] }: { badKeys?: BadKeys }) {
	console.log({ badKeys });

	const router = useRouter();

	async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		router.push('/signup/account?' + new URLSearchParams(formData).toString());
	}

	return (
		<form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
			<label htmlFor="email">Email</label>
			<input
				className="border-2 border-gray-200 px-4 py-2 rounded-md"
				type="email"
				id="email"
				name="email"
			/>
			{badKeys.includes('email') ? <FormError>Email is invalid.</FormError> : null}
			<label htmlFor="password">Password</label>
			<input
				className="border-2 border-gray-200 px-4 py-2 rounded-md"
				type="password"
				id="password"
				name="password"
			/>
			{badKeys.includes('password') ? <FormError>Password is required.</FormError> : null}
			<label htmlFor="name">Name</label>
			<input
				className="border-2 border-gray-200 px-4 py-2 rounded-md"
				type="text"
				id="name"
				name="name"
			/>
			{badKeys.includes('name') ? <FormError>Name is required.</FormError> : null}
			<button className="rounded-md px-4 py-2 bg-purple-600 text-white">Next</button>
		</form>
	);
}

function FormError({ children }: { children: ReactNode }) {
	return <p className="text-red-500">{children}</p>;
}
