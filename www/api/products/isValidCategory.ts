import type { operations } from '../openapi.yaml';

const validCategories = new Set([
	'accessories',
	'bags',
	'books',
	'bottles',
	'cups',
	'desk',
	'hats',
	'hoodies',
	'mugs',
	'socks',
	'stationery',
	't-shirts',
	'tech',
]);

type Query = NonNullable<operations['listProducts']['parameters']['query']>;
type Category = NonNullable<Query['category']>;

// The API documentes the "category" query parameter as being an enum with
// a restricted set of values. I understand that to mean that I need to do
// validation on the value before I submit it.
//
// This is _also_ "list all categories" endpoint, which would return a list
// of all defined categories.
//
// This raises the question of whether I should be validating against the
// documented set of categories, or the actual set returned by the category
// list endpoint.
//
// I argue that this is an API design issue, and the API should accept a
// string value for the category. The documentation for the known valid
// values should be normative, not declarative.
//
// Since the documentation does not indicate that the set of valid categories
// on the "List Products" endpoint is necessarily related to the list of
// categories returned by the "List Categories" endpoint, I will validate
// against the documented set of categories.

/**
 * Validate a string as being a valid category.
 */
export function isValidCategory(value: string): value is Category {
	return validCategories.has(value);
}
