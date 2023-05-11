import { SignIn } from '@clerk/nextjs/app-beta';

export default function Login() {
	return <SignIn path="/signup/login" />;
}
