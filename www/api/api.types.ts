import type transformCart from './cart/lib/transformCart';
import type listAllCategories from './categories/listAllCategories';
import type transformProduct from './lib/transformProduct';
import type { operations } from './openapi.d.yaml';
import type getStock from './stock/getStock';
import type getStoreConfiguration from './store/getStoreConfiguration';

export type Product = ReturnType<typeof transformProduct>;
export type Stock = NonNullable<Awaited<ReturnType<typeof getStock>>>;
export type Cart = NonNullable<ReturnType<typeof transformCart>>;
export type CartItem = Cart['items'][number];

export type StoreConfiguration = NonNullable<
	Awaited<ReturnType<typeof getStoreConfiguration>>
>;

type Query = NonNullable<operations['listProducts']['parameters']['query']>;
export type ProductListCategory = NonNullable<Query['category']>;

// The API documentation makes a distinction between the list of categories
// returned by the "List Categories" endpoint, and the set of valid values for
// the "category" query parameter on the "List Products" endpoint.
//
// Is it supposed to be a subset? Is this distinction unintentional?
//
// Anyway, the documentation says it is two separate types, so here we are.
export type Categories = Awaited<ReturnType<typeof listAllCategories>>;
