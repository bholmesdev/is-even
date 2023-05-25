export default function SignupLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-gray-100 h-screen">
			<main className="max-w-prose mx-auto bg-white p-8">
				<h1 className="text-2xl">
					How can we tell you about your number, when we don&apos;t{' '}
					<strong className="text-purple-600">even</strong> know you!
				</h1>
				{children}
			</main>
		</div>
	);
}
