import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const nama_produk = formData.get('nama_produk');
	const keterangan = formData.get('keterangan');
	const harga = Number(formData.get('harga'));
	const jumlah = Number(formData.get('jumlah'));

	if (
		typeof nama_produk !== 'string' ||
		typeof keterangan !== 'string' ||
		typeof harga !== 'number' ||
		typeof jumlah !== 'number'
	) {
		throw new Error('Form not submitted correctly.');
	}

	await db.product.update({
		where: { id: Number(params.productId) },
		data: { harga, jumlah, keterangan, nama_produk },
	});
	return redirect(`/products`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const product = await db.product.findUnique({
		where: { id: Number(params.productId) },
	});
	if (!product) {
		throw new Response('Not Found', { status: 404 });
	}
	return json({ product });
};

export default function EditProductRoute() {
	const { product } = useLoaderData<typeof loader>();
	const navigate = useNavigate();
	return (
		<div className='edit-product'>
			<form method='post' className={`form-edit-product`}>
				<div>
					<label htmlFor='nama_produk'>Nama produk</label>
					<input
						required
						type='text'
						name='nama_produk'
						id='nama_produk'
						defaultValue={product.nama_produk}
					/>
				</div>
				<div>
					<label htmlFor='keterangan'>Keterangan produk</label>
					<input
						required
						type='text'
						name='keterangan'
						id='keterangan'
						defaultValue={product.keterangan}
					/>
				</div>
				<div>
					<label htmlFor='harga'>Harga</label>
					<input
						required
						min={1000000}
						type='number'
						name='harga'
						id='harga'
						defaultValue={product.harga}
					/>
				</div>
				<div>
					<label htmlFor='jumlah'>Stok</label>
					<input
						required
						type='number'
						name='jumlah'
						id='jumlah'
						defaultValue={product.jumlah}
					/>
				</div>
				<div className='form-add-product__control'>
					<button type='submit'>Simpan</button>
					<button
						type='button'
						onClick={() => navigate(-1)}
						data-type='delete-product'
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
