import { Atkinson_Hyperlegible } from 'next/font/google';
import './globals.css';

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

const sansFont = Atkinson_Hyperlegible({
	weight: ['400', '700'],
	style: ['italic', 'normal'],
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'auto'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={sansFont.variable}>
			<body className={sansFont.className}>{children}</body>
		</html>
	);
}
