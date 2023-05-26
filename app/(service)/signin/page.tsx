import { SignIn } from '@clerk/nextjs';

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const redirectUrl = typeof searchParams.redirectUrl === 'string' ? searchParams.redirectUrl : '/';
	return <SignIn redirectUrl={redirectUrl} />;
}
