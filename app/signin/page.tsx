import { SignIn } from '@clerk/nextjs/app-beta';

export default function Page({ searchParams }) {
	const { redirectUrl } = searchParams;
	return <SignIn redirectUrl={redirectUrl ?? '/'} />;
}
