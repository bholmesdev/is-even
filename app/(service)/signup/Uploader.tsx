'use client';

import { useUser } from '@clerk/clerk-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spinner } from '../icons';

const errorToMessageMap = {
	clerkerror: 'Failed to upload image. Try again later!',
	squarerror: "Image must be a square. No, I won't crop it for you. Do it yourself :)"
};

type Status =
	| { type: 'idle' }
	| { type: 'uploading' }
	| { type: 'success' }
	| { type: 'error'; message: string };

export function Uploader() {
	const { user } = useUser();
	const [uploadStatus, setUploadStatus] = useState<Status>({ type: 'idle' });

	const onDrop = useCallback(
		async ([image]: File[]) => {
			// TODO: crop for you??
			const isSquare = await validateIsSquare(image);

			if (!isSquare) {
				setUploadStatus({
					type: 'error',
					message: errorToMessageMap.squarerror
				});
				return;
			}
			setUploadStatus({ type: 'uploading' });
			const res = await user?.setProfileImage({ file: image });
			if (!res) {
				setUploadStatus({
					type: 'error',
					message: errorToMessageMap.clerkerror
				});
				return;
			}
			setUploadStatus({ type: 'success' });
		},
		[user]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 5 * 1024 * 1024, // 5 MB
		accept: { 'image/*': [] }
	});

	return (
		<>
			<div className="grid grid-cols-[1fr,6rem] gap-4 cursor-pointer">
				<div
					{...getRootProps()}
					className={`border-2 rounded-sm flex items-center justify-center bg-slate-50 text-slate-700 transition-colors ${
						isDragActive ? 'border-blue-600' : 'border-slate-200'
					}`}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop your image here...</p>
					) : (
						<p>Drag and drop image here, or click to select files</p>
					)}
				</div>

				{user?.profileImageUrl ? (
					<div className="relative">
						<img
							className={`rounded-sm transition-opacity ${
								uploadStatus.type === 'uploading' ? 'opacity-60' : ''
							}`}
							src={user.profileImageUrl}
							alt="User uploaded image"
						/>
						{uploadStatus.type === 'uploading' ? (
							<div className="absolute inset-0 flex items-center justify-center">
								<Spinner />
							</div>
						) : null}
					</div>
				) : (
					<p>No profile picture set.</p>
				)}
			</div>

			{uploadStatus.type === 'error' ? (
				<p className="mt-4 bg-red-200 text-red-950 px-3 py-1 rounded-md">{uploadStatus.message}</p>
			) : null}
		</>
	);
}

async function validateIsSquare(file: File): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			if (img.width === img.height) {
				resolve(true);
			} else {
				resolve(false);
			}
		};
		img.onerror = () => {
			reject('Invalid image');
		};
		img.src = URL.createObjectURL(file);
	});
}
