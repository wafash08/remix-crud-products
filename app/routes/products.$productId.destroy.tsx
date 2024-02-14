import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const action = async ({ params }: ActionFunctionArgs) => {
	if (!params.productId) {
		throw new Error('Produk tidak ditemukan');
	}
	console.log(params.productId);
	await db.product.delete({ where: { id: Number(params.productId) } });
	return redirect('/products');
};
