import type { MetaFunction } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export default function Index() {
	return (
		<>
			<Link to='products' data-type='view-products'>
				lihat Produk
			</Link>
		</>
	);
}
