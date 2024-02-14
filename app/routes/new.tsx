import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const action = async ({ request }: ActionFunctionArgs) => {
	const form = await request.formData();
	const nama_produk = form.get('nama_produk');
	const keterangan = form.get('keterangan');
	const harga = Number(form.get('harga'));
	const jumlah = Number(form.get('jumlah'));

	console.log(typeof nama_produk);
	console.log(typeof keterangan);
	console.log(typeof harga);
	console.log(typeof jumlah);

	if (
		typeof nama_produk !== 'string' ||
		typeof keterangan !== 'string' ||
		typeof harga !== 'number' ||
		typeof jumlah !== 'number'
	) {
		throw new Error('Form not submitted correctly.');
	}

	await db.product.create({
		data: { harga, jumlah, keterangan, nama_produk },
	});
	return redirect('/products');
};

export default function NewProductRoute() {
	return (
		<>
			<Link to='/products' data-type='back-to-home'>
				Kembali
			</Link>
			<form method='post' className={`form-add-product`}>
				<div>
					<label htmlFor='nama_produk'>Nama produk</label>
					<input required type='text' name='nama_produk' id='nama_produk' />
				</div>
				<div>
					<label htmlFor='keterangan'>Keterangan produk</label>
					<input required type='text' name='keterangan' id='keterangan' />
				</div>
				<div>
					<label htmlFor='harga'>Harga</label>
					<input required min={100000} type='number' name='harga' id='harga' />
					<span>*Minimal 100.000</span>
				</div>
				<div>
					<label htmlFor='jumlah'>Stok</label>
					<input required type='number' name='jumlah' id='jumlah' min={0} />
					<span>*Minimal 0</span>
				</div>
				<div className='form-add-product__control'>
					<button type='submit'>Simpan</button>
				</div>
			</form>
			<p className='alert'>*Mohon isi input dengan nilai yang sesuai</p>
		</>
	);
}
