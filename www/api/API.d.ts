import type {
	components as ApiComponents,
	operations as ApiOperations,
	paths as ApiPaths,
} from './openapi.d.yaml.ts';

declare global {
	namespace API {
		export type paths = ApiPaths;
		export type components = ApiComponents;
		export type operations = ApiOperations;
	}
}
