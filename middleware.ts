import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/mockups']
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
