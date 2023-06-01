import { Uploader } from '../signup/Uploader';

export default function Profile() {
	return (
		<main className="max-w-prose mx-auto">
			<h2>Set profile image</h2>
			<Uploader />
		</main>
	);
}
