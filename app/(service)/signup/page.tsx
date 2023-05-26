import { SignUp, auth, currentUser } from '@clerk/nextjs';
import { Uploader } from './Uploader';

export default async function Page() {
	const { userId } = auth();
	const user = await currentUser();
	if (userId && !user?.publicMetadata.profilePicSrc) {
		return <Uploader userId={userId} />;
	}

	return <SignUp />;
}
