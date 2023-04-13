import { SignUp } from '@clerk/nextjs/app-beta/client';

export default function Signup() {
	return <SignUp path="/signup" signInUrl="signin" redirectUrl="/signup/confirm" />;
}
