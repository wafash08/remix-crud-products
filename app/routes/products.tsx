import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export const loader = async () => {
	return json({
		products: await db.product.findMany(),
	});
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return (
		<>
			<Link to='/new' data-type='new-product'>
				Tambah Produk
			</Link>
			<Outlet />
			<ul className='product-list'>
				{data.products.map(({ harga, id, nama_produk }) => {
					return (
						<li key={id} className='product'>
							<div className='product-header'>
								<h2 className='product-name'>{nama_produk}</h2>
								<form action={`/products/${id}/destroy`} method='post'>
									<button type='submit' data-type='delete-product'>
										Hapus
									</button>
								</form>
							</div>
							<p className='product-price'>{harga}</p>
							<Link to={`/products/${id}/edit`} data-type='edit-product'>
								Edit
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}
