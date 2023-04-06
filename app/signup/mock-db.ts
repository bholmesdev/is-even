import type { User } from './utils';

let mockUser: User | null = null;

export async function writeUser(user: User) {
	mockUser = user;
}

export async function readUser() {
	return mockUser;
}
