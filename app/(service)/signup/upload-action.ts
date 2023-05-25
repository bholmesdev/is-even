'use server';
export async function uploadProfilePic({ src, userId }: { src: string; userId: string }) {
	const res = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
		method: 'PATCH',
		body: JSON.stringify({
			public_metadata: { profilePicSrc: src }
		}),
		headers: {
			Authorization: 'Bearer ' + process.env.CLERK_SECRET_KEY,
			'Content-Type': 'application/json'
		}
	});

	return res.status === 200;
}
