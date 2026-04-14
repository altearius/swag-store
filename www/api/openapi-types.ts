export interface paths {
    readonly "/cart": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get cart contents
         * @description Retrieves the full cart with product details and calculated totals. Requires the `x-cart-token` header.
         */
        readonly get: operations["getCart"];
        readonly put?: never;
        /**
         * Add an item to a cart
         * @description Adds a product to an existing cart. Requires the `x-cart-token` header and a JSON body with `productId` and `quantity`.
         */
        readonly post: operations["addItemToCart"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/cart/{itemId}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        readonly post?: never;
        /**
         * Remove item from cart
         * @description Remove a specific item from the cart entirely.
         */
        readonly delete: operations["removeCartItem"];
        readonly options?: never;
        readonly head?: never;
        /**
         * Update item quantity
         * @description Update the quantity of a specific item in the cart. Set quantity to 0 to remove the item.
         */
        readonly patch: operations["updateCartItem"];
        readonly trace?: never;
    };
    readonly "/cart/create": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly get?: never;
        readonly put?: never;
        /**
         * Create a new cart
         * @description Creates a new empty cart. The response includes the cart token in the `x-cart-token` response header. Store this token and include it in all subsequent cart requests.
         */
        readonly post: operations["createCart"];
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/categories": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List all categories
         * @description Returns all product categories with their product counts.
         */
        readonly get: operations["listCategories"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/health": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Health check
         * @description Returns the health status of the API and its dependent services (Redis).
         */
        readonly get: operations["healthCheck"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/products": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * List products
         * @description Returns a paginated list of products. Supports filtering by category, search term, and featured status.
         */
        readonly get: operations["listProducts"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/products/{id}": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get product details
         * @description Returns a single product by its ID or slug.
         */
        readonly get: operations["getProduct"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/products/{id}/stock": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get real-time stock availability
         * @description Returns the current stock level for a product. Stock levels are dynamic and may change on every request.
         */
        readonly get: operations["getProductStock"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/promotions": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get active promotion
         * @description Returns a randomly selected active promotional banner. May return a different promotion on each request.
         */
        readonly get: operations["getActivePromotion"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
    readonly "/store/config": {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        /**
         * Get store configuration
         * @description Returns store configuration including enabled features, social links, and SEO defaults.
         */
        readonly get: operations["getStoreConfig"];
        readonly put?: never;
        readonly post?: never;
        readonly delete?: never;
        readonly options?: never;
        readonly head?: never;
        readonly patch?: never;
        readonly trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        readonly AddToCartRequest: {
            /** @example tshirt_001 */
            readonly productId: string;
            /**
             * @default 1
             * @example 2
             */
            readonly quantity: number;
        };
        readonly CartItemWithProduct: {
            /** Format: date-time */
            readonly addedAt?: string;
            /**
             * @description price * quantity in cents
             * @example 5600
             */
            readonly lineTotal?: number;
            readonly product?: components["schemas"]["Product"];
            /** @example tshirt_001 */
            readonly productId?: string;
            /** @example 2 */
            readonly quantity?: number;
        };
        readonly CartResponse: {
            readonly data?: components["schemas"]["CartWithProducts"];
            /** @example true */
            readonly success?: boolean;
        };
        readonly CartWithProducts: {
            /** Format: date-time */
            readonly createdAt?: string;
            /** @example USD */
            readonly currency?: string;
            readonly items?: readonly components["schemas"]["CartItemWithProduct"][];
            /**
             * @description Total in cents
             * @example 5600
             */
            readonly subtotal?: number;
            /** Format: uuid */
            readonly token?: string;
            /** @example 2 */
            readonly totalItems?: number;
            /** Format: date-time */
            readonly updatedAt?: string;
        };
        readonly Category: {
            /** @example T Shirts */
            readonly name?: string;
            /** @example 6 */
            readonly productCount?: number;
            /** @example t-shirts */
            readonly slug?: string;
        };
        readonly CategoryListResponse: {
            readonly data?: readonly components["schemas"]["Category"][];
            /** @example true */
            readonly success?: boolean;
        };
        readonly ErrorResponse: {
            readonly error?: {
                /** @example NOT_FOUND */
                readonly code?: string;
                /** @description Additional error details (validation errors, etc.) */
                readonly details?: unknown;
                /** @example Product with id 'xyz' not found */
                readonly message?: string;
            };
            /** @example false */
            readonly success?: boolean;
        };
        readonly PaginationMeta: {
            /** @example true */
            readonly hasNextPage?: boolean;
            /** @example false */
            readonly hasPreviousPage?: boolean;
            /** @example 20 */
            readonly limit?: number;
            /** @example 1 */
            readonly page?: number;
            /** @example 31 */
            readonly total?: number;
            /** @example 2 */
            readonly totalPages?: number;
        };
        readonly Product: {
            /** @example t-shirts */
            readonly category?: string;
            /**
             * Format: date-time
             * @example 2025-01-10T10:00:00Z
             */
            readonly createdAt?: string;
            /** @example USD */
            readonly currency?: string;
            /** @example Plain black crewneck tee with a small solid white equilateral triangle facing upward on the left chest... */
            readonly description?: string;
            /**
             * @description Whether this product is featured on the homepage
             * @example true
             */
            readonly featured?: boolean;
            /** @example tshirt_001 */
            readonly id?: string;
            readonly images?: readonly string[];
            /** @example Black Crewneck T-Shirt */
            readonly name?: string;
            /**
             * @description Price in cents
             * @example 3000
             */
            readonly price?: number;
            /** @example black-crewneck-t-shirt */
            readonly slug?: string;
            /**
             * @example [
             *       "black",
             *       "tee",
             *       "crewneck",
             *       "triangle"
             *     ]
             */
            readonly tags?: readonly string[];
        };
        readonly ProductListResponse: {
            readonly data?: readonly components["schemas"]["Product"][];
            readonly meta?: {
                readonly pagination?: components["schemas"]["PaginationMeta"];
            };
            /** @example true */
            readonly success?: boolean;
        };
        readonly ProductResponse: {
            readonly data?: components["schemas"]["Product"];
            /** @example true */
            readonly success?: boolean;
        };
        readonly Promotion: {
            /** @example true */
            readonly active?: boolean;
            /** @example SHIPIT20 */
            readonly code?: string;
            /** @example Get 20% off all t-shirts and hoodies. Use code at checkout. */
            readonly description?: string;
            /** @example 20 */
            readonly discountPercent?: number;
            /** @example promo_001 */
            readonly id?: string;
            /** @example Summer Ship-a-thon */
            readonly title?: string;
            /**
             * Format: date-time
             * @example 2025-06-01T00:00:00Z
             */
            readonly validFrom?: string;
            /**
             * Format: date-time
             * @example 2025-09-01T00:00:00Z
             */
            readonly validUntil?: string;
        };
        readonly PromotionResponse: {
            readonly data?: components["schemas"]["Promotion"];
            /** @example true */
            readonly success?: boolean;
        };
        readonly StockInfo: {
            /** @example true */
            readonly inStock?: boolean;
            /**
             * @description True when stock is between 1 and 5
             * @example false
             */
            readonly lowStock?: boolean;
            /** @example tshirt_001 */
            readonly productId?: string;
            /**
             * @description Current stock quantity (changes on every request)
             * @example 12
             */
            readonly stock?: number;
        };
        readonly StockResponse: {
            readonly data?: components["schemas"]["StockInfo"];
            /** @example true */
            readonly success?: boolean;
        };
        readonly UpdateCartItemRequest: {
            /**
             * @description Set to 0 to remove the item
             * @example 3
             */
            readonly quantity: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    readonly getCart: {
        readonly parameters: {
            readonly query?: never;
            readonly header: {
                /** @description The cart token received when creating a cart */
                readonly "x-cart-token": string;
            };
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Cart with product details and totals */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Missing x-cart-token header */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Cart not found or expired */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly addItemToCart: {
        readonly parameters: {
            readonly query?: never;
            readonly header: {
                /** @description The cart token received when creating a cart via POST /cart/create */
                readonly "x-cart-token": string;
            };
            readonly path?: never;
            readonly cookie?: never;
        };
        /** @description The product and quantity to add to the cart. */
        readonly requestBody: {
            readonly content: {
                /**
                 * @example {
                 *       "productId": "tshirt_001",
                 *       "quantity": 2
                 *     }
                 */
                readonly "application/json": components["schemas"]["AddToCartRequest"];
            };
        };
        readonly responses: {
            /** @description Item added to cart */
            readonly 201: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Bad request (missing header or invalid JSON) */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Cart or product not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation error */
            readonly 422: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly removeCartItem: {
        readonly parameters: {
            readonly query?: never;
            readonly header: {
                /** @description The cart token */
                readonly "x-cart-token": string;
            };
            readonly path: {
                /** @description The product ID of the item to remove (e.g. tshirt_001) */
                readonly itemId: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Updated cart without the removed item */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Bad request */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Cart or item not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly updateCartItem: {
        readonly parameters: {
            readonly query?: never;
            readonly header: {
                /** @description The cart token */
                readonly "x-cart-token": string;
            };
            readonly path: {
                /** @description The product ID of the item to update (e.g. tshirt_001) */
                readonly itemId: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody: {
            readonly content: {
                /**
                 * @example {
                 *       "quantity": 3
                 *     }
                 */
                readonly "application/json": components["schemas"]["UpdateCartItemRequest"];
            };
        };
        readonly responses: {
            /** @description Updated cart */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Bad request */
            readonly 400: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Cart or item not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation error */
            readonly 422: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly createCart: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description New empty cart created */
            readonly 201: {
                headers: {
                    /** @description The cart token to use for subsequent cart operations */
                    readonly "x-cart-token"?: string;
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["CartResponse"];
                };
            };
        };
    };
    readonly listCategories: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description List of categories */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "success": true,
                     *       "data": [
                     *         {
                     *           "slug": "bottles",
                     *           "name": "Bottles",
                     *           "productCount": 1
                     *         },
                     *         {
                     *           "slug": "cups",
                     *           "name": "Cups",
                     *           "productCount": 2
                     *         },
                     *         {
                     *           "slug": "mugs",
                     *           "name": "Mugs",
                     *           "productCount": 2
                     *         },
                     *         {
                     *           "slug": "desk",
                     *           "name": "Desk",
                     *           "productCount": 2
                     *         },
                     *         {
                     *           "slug": "stationery",
                     *           "name": "Stationery",
                     *           "productCount": 5
                     *         },
                     *         {
                     *           "slug": "accessories",
                     *           "name": "Accessories",
                     *           "productCount": 4
                     *         },
                     *         {
                     *           "slug": "bags",
                     *           "name": "Bags",
                     *           "productCount": 3
                     *         },
                     *         {
                     *           "slug": "hats",
                     *           "name": "Hats",
                     *           "productCount": 3
                     *         },
                     *         {
                     *           "slug": "t-shirts",
                     *           "name": "T Shirts",
                     *           "productCount": 1
                     *         },
                     *         {
                     *           "slug": "hoodies",
                     *           "name": "Hoodies",
                     *           "productCount": 1
                     *         },
                     *         {
                     *           "slug": "socks",
                     *           "name": "Socks",
                     *           "productCount": 1
                     *         },
                     *         {
                     *           "slug": "tech",
                     *           "name": "Tech",
                     *           "productCount": 2
                     *         },
                     *         {
                     *           "slug": "books",
                     *           "name": "Books",
                     *           "productCount": 1
                     *         }
                     *       ]
                     *     }
                     */
                    readonly "application/json": components["schemas"]["CategoryListResponse"];
                };
            };
        };
    };
    readonly healthCheck: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Service health status */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly data?: {
                            readonly services?: {
                                /**
                                 * @example connected
                                 * @enum {string}
                                 */
                                readonly redis?: "connected" | "error";
                            };
                            /** @example ok */
                            readonly status?: string;
                            /**
                             * Format: date-time
                             * @example 2025-06-01T12:00:00Z
                             */
                            readonly timestamp?: string;
                        };
                        /** @example true */
                        readonly success?: boolean;
                    };
                };
            };
        };
    };
    readonly listProducts: {
        readonly parameters: {
            readonly query?: {
                /** @description Filter by category slug */
                readonly category?: "bottles" | "cups" | "mugs" | "desk" | "stationery" | "accessories" | "bags" | "hats" | "t-shirts" | "hoodies" | "socks" | "tech" | "books";
                /** @description Filter by featured status */
                readonly featured?: "true" | "false";
                /** @description Items per page (max 100) */
                readonly limit?: number;
                /** @description Page number (starts at 1) */
                readonly page?: number;
                /** @description Search products by name, description, or tags */
                readonly search?: string;
            };
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Paginated product list */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "success": true,
                     *       "data": [
                     *         {
                     *           "id": "tshirt_001",
                     *           "name": "Black Crewneck T-Shirt",
                     *           "slug": "black-crewneck-t-shirt",
                     *           "description": "Plain black crewneck tee with a small solid white equilateral triangle facing upward on the left chest...",
                     *           "price": 3000,
                     *           "currency": "USD",
                     *           "category": "t-shirts",
                     *           "images": [
                     *             "https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/storefront/black-crewneck-t-shirt.png"
                     *           ],
                     *           "featured": true,
                     *           "tags": [
                     *             "black",
                     *             "tee",
                     *             "crewneck",
                     *             "triangle"
                     *           ],
                     *           "createdAt": "2026-02-10T16:00:00Z"
                     *         }
                     *       ],
                     *       "meta": {
                     *         "pagination": {
                     *           "page": 1,
                     *           "limit": 20,
                     *           "total": 31,
                     *           "totalPages": 2,
                     *           "hasNextPage": true,
                     *           "hasPreviousPage": false
                     *         }
                     *       }
                     *     }
                     */
                    readonly "application/json": components["schemas"]["ProductListResponse"];
                };
            };
            /** @description Validation error */
            readonly 422: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly getProduct: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Product ID (e.g. tshirt_001) or slug (e.g. black-crewneck-t-shirt) */
                readonly id: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Product details */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ProductResponse"];
                };
            };
            /** @description Product not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly getProductStock: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path: {
                /** @description Product ID (e.g. tshirt_001) or slug (e.g. black-crewneck-t-shirt) */
                readonly id: string;
            };
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Stock availability */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "success": true,
                     *       "data": {
                     *         "productId": "tshirt_001",
                     *         "stock": 12,
                     *         "inStock": true,
                     *         "lowStock": false
                     *       }
                     *     }
                     */
                    readonly "application/json": components["schemas"]["StockResponse"];
                };
            };
            /** @description Product not found */
            readonly 404: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    readonly getActivePromotion: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Active promotion */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "success": true,
                     *       "data": {
                     *         "id": "promo_001",
                     *         "title": "Summer Ship-a-thon",
                     *         "description": "Get 20% off all t-shirts and hoodies. Use code at checkout.",
                     *         "discountPercent": 20,
                     *         "code": "SHIPIT20",
                     *         "validFrom": "2025-06-01T00:00:00Z",
                     *         "validUntil": "2025-09-01T00:00:00Z",
                     *         "active": true
                     *       }
                     *     }
                     */
                    readonly "application/json": components["schemas"]["PromotionResponse"];
                };
            };
        };
    };
    readonly getStoreConfig: {
        readonly parameters: {
            readonly query?: never;
            readonly header?: never;
            readonly path?: never;
            readonly cookie?: never;
        };
        readonly requestBody?: never;
        readonly responses: {
            /** @description Store configuration */
            readonly 200: {
                headers: {
                    readonly [name: string]: unknown;
                };
                content: {
                    readonly "application/json": {
                        readonly data?: {
                            /** @example USD */
                            readonly currency?: string;
                            /** @description Feature flags indicating which store features are enabled. */
                            readonly features?: {
                                /** @example true */
                                readonly liveChat?: boolean;
                                /** @example true */
                                readonly productComparison?: boolean;
                                /** @example true */
                                readonly recentlyViewed?: boolean;
                                /** @example true */
                                readonly reviews?: boolean;
                                /** @example true */
                                readonly wishlist?: boolean;
                            };
                            readonly seo?: {
                                /** @example Official Vercel merchandise. Premium developer apparel, accessories, and gear. */
                                readonly defaultDescription?: string;
                                /** @example Vercel Swag Store */
                                readonly defaultTitle?: string;
                                /** @example %s | Vercel Swag Store */
                                readonly titleTemplate?: string;
                            };
                            readonly socialLinks?: {
                                /**
                                 * Format: uri
                                 * @example https://discord.gg/vercel
                                 */
                                readonly discord?: string;
                                /**
                                 * Format: uri
                                 * @example https://github.com/vercel
                                 */
                                readonly github?: string;
                                /**
                                 * Format: uri
                                 * @example https://twitter.com/vercel
                                 */
                                readonly twitter?: string;
                            };
                            /** @example Vercel Swag Store */
                            readonly storeName?: string;
                        };
                        /** @example true */
                        readonly success?: boolean;
                    };
                };
            };
        };
    };
}
