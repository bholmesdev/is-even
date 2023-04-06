import type { User } from './utils';

let mockUser: User | null = null;

export async function writeUser(user: User) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	mockUser = user;
}

export async function readUser() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return mockUser;
}
