import { connect } from '@planetscale/database';

const config = {
	url: process.env['DATABASE_URL'] || 'mysql://user:pass@host'
};

export async function GET() {
	const conn = connect(config);
	const users = await conn.execute('SELECT * FROM users');
	console.log({ users: users.headers });
	return new Response(JSON.stringify(users.headers), {
		status: 200
	});
}
