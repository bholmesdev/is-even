import { auth } from '@clerk/nextjs/app-beta';
import { FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const profilePicRouter = {
	imageUploader: f
		.fileTypes(['image'])
		.middleware((req) => {
			// TODO: clerk auth to place image on user table

			return { test: 'test' };
		})
		.maxSize('1MB')
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete!', metadata, file);
		})
} satisfies FileRouter;

export type ProfilePicRouter = typeof profilePicRouter;
