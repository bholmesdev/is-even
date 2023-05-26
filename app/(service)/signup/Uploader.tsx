'use client';

import { UploadButton } from '@uploadthing/react';
import { type ProfilePicRouter } from '../api/uploadthing/core';
import React from 'react';

export function Uploader() {
	const [image, setImage] = React.useState<string | undefined>(undefined);
	return (
		<main className="">
			<UploadButton<ProfilePicRouter>
				endpoint="imageUploader"
				onUploadError={(err) => {
					console.log({ err });
				}}
				onClientUploadComplete={(res) => {
					setImage(res?.[0]?.fileUrl);
				}}
			/>
			{image ? (
				<>
					<h2>Picture updated!</h2>
					<img src={image} alt="User uploaded image" />
				</>
			) : null}
		</main>
	);
}
