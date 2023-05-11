'use client';

import { UploadButton } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import React from 'react';
import { Suspense } from 'react';
import { ProfilePicRouter } from '~/app/api/uploadthing/core';

export function Uploader() {
	return (
		<Suspense fallback={<p>Did NOT uploadthing.</p>}>
			<UploadButton<ProfilePicRouter>
				endpoint="imageUploader"
				onClientUploadComplete={() => {
					alert('Upload complete!');
				}}
			/>
		</Suspense>
	);
}

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }
// }
