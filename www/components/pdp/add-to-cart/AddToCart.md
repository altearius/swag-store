# AddToCart Notes

## First Attempt

I was originally using streaming to load the stock information and pipe it into
the client component using `use`.

However, because this data has a very small cache duration, I became concerned
that handling it in this way would affect the cache duration of the product
detail page as a whole.

So I refactored to use a server action to fetch the stock information on demand
from the client component instead, under the assumption that the product detail
page's cache lifecycle can now be tied to the much longer cache duration for the
product details themselves.

The last git commit that contained the previous implementation is
c66758cd513567b23c5d197efd1755b13f399d52.

## Second Attempt

I think the above refactor was unsuccessful because I still observe the
following headers on the PDP in production mode (`yarn build && yarn start`):

```
HTTP/1.1 200 OK
x-nextjs-stale-time: 300
x-nextjs-prerender: 1
x-nextjs-postponed: 1
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
Transfer-Encoding: chunked
```

The `Cache-Control` in particular makes me think I have failed to configure
the cache properly.

The delivered HTML contains the "disabled" version of the AddToCart control:

```html
<input
  type="number"
  min="1"
  required=""
  step="1"
  disabled=""
  name="quantity"
  value="1"
/>
```

Therefore, I think the HTML is being delivered to the browser without waiting
for the call to `getStock` to complete -- which is good! Therefore, I think the
HTML should therefore be fully cachable, but clearly I am missing something.

Notably, the home page headers look like this:

```
HTTP/1.1 200 OK
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=900, stale-while-revalidate=85500
ETag: "16867gkodgcrl2"
```

The issue may be the presence of the `www/app/products/[slug]/loading.tsx` file.

I've considered removing this file, but I'm not convinced that I should:
nothing on the product detail page is meaningful until a product has been
loaded.

Perhaps I should generate static parameters?

## Third Attempt

Ah ha, that seems to have helped. After adding static params for a subset of
products, I now observe:

```
HTTP/1.1 200 OK
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=900, stale-while-revalidate=85500
ETag: "vd384nqy0oet0"
```

But this only happens for the subset of products for which I am generating
static parameters! A product out of the subset still says:

```
HTTP/1.1 200 OK
x-nextjs-stale-time: 300
x-nextjs-prerender: 1
x-nextjs-postponed: 1
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```

But, despite having `Cache-Control: no-cache`, I've confirmed with
`console.log` statements that it is functioning the way my mental model
says it should: the out-of-subset product is rendered at runtime on demand
only once, and subsequent requests do not re-render (at least as long as the
cache is valid, I guess?). There must be some internal cache instead, but if
that is the case, why doesn't it set the `Cache-Control` header differently?
