import { auth } from '@clerk/nextjs';
import { FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export class NotLoggedInError extends Error {}
export class UpdateClerkTableError extends Error {}

export const profilePicRouter = {
	imageUploader: f
		.fileTypes(['image'])
		.middleware(async () => {
			const { userId } = auth();
			if (!userId) throw new NotLoggedInError();

			return { userId };
		})
		.maxSize('1MB')
		.onUploadComplete(async ({ metadata, file }) => {
			const res = await fetch(`https://api.clerk.com/v1/users/${metadata.userId}/metadata`, {
				method: 'PATCH',
				body: JSON.stringify({
					public_metadata: { profilePicSrc: file.url }
				}),
				headers: {
					Authorization: 'Bearer ' + process.env.CLERK_SECRET_KEY,
					'Content-Type': 'application/json'
				}
			});

			if (res.status !== 200) throw new UpdateClerkTableError();
		})
} satisfies FileRouter;

export type ProfilePicRouter = typeof profilePicRouter;
