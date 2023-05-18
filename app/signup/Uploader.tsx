'use client';

import { UploadButton } from '@uploadthing/react';
import { type ProfilePicRouter } from '~/app/api/uploadthing/core';
import React from 'react';
import { uploadProfilePic } from './upload-action';

export function Uploader({ userId }: { userId: string }) {
	const [image, setImage] = React.useState<string | undefined>(undefined);
	return (
		<main className="">
			<UploadButton<ProfilePicRouter>
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					setImage(res?.[0]?.fileUrl);
				}}
			/>
			{image ? (
				<>
					<h2>Preview</h2>
					<img src={image} alt="User uploaded image" />
					<button
						onClick={async () => {
							const res = await uploadProfilePic({ src: image, userId });
							console.log({ res });
						}}
						type="submit"
					>
						Confirm
					</button>
				</>
			) : null}
		</main>
	);
}
