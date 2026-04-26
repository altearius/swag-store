# Observations on Cache Life

These are my notes taken while exploring various aspects of cache components.

These are included for my personal reference and should not be taken to be
complete or even meaningful in any other context.

## Goal

I am currently testing the effects of various cache directives.

My focus is on the home page, which is made up of various components that all
have different cache requirements:

| Structure | Cache Life | Why                              |
| --------- | ---------- | -------------------------------- |
| Layout    | Weeks      | Footer contains the current year |
| Banner    | None       | API documentation                |
| Hero      | Max        | No indication that this changes  |
| Products  | Hours      | Arbitrary but seems reasonable   |

I want to develop a plan that hits these goals:

- The banner is refreshed on every page load.
- The products are refreshed on every hour.
- Otherwise, the static shell is cached as long as possible.

I specifically want to understand which strategies I need to use if I want
to hit specific `Cache-Control` header values.

### Max / Weeks

The default `Cache-Control` for a page rendered as static generation is
`Cache-Control: s-maxage=604800, stale-while-revalidate=1987200`.

The `s-maxage=604800` value corresponds to one week.

There is probably some longer value but I don't think I care much about it
because it is unlikely to make a measurable difference in any real-world
scenario that I am likely to encounter.

If I want this `Cache-Control` value, I need to assume the banner and products
are excluded from the static shell. In this case, _something_ will need to be
responsible for loading them. Is that a client-side data fetch?

### Hours

It could be reasonable to settle for a `Cache-Control` of hours instead of
weeks. In this case, the products could be included in the static shell,
perhaps with streaming enabled.

In a real-world case, I might decide this is necessary because I would want
the products to be included in the initial HTML for SEO / LLM reasons.

I would still need some way to load the banner dynamically.

### None

If I am willing to permit `no-cache` then everything could be rendered
server-side on each request. This eliminates the need for client-side data
fetching.

### Decision

Let's aim at a home page that delivers a `Cache-Control` in the "hours" range,
and includes the product list in the delivered HTML from the server, using
streaming. I'll also aim at loading the banner using client-side data fetching.

I think this means:

- The home page route handler should include `cacheLife("hours")`.
- Success means seeing an `s-maxage=3600` value in the response headers.
- The banner still need to load dynamically, so a server action will be needed.

## Testing

I know of three ways to test the cache:

1. Adding `console.log` statements and watching for the presence of the `Cache`
   prefix.

2. Using Prism to proxy the upstream API and watching for log activity.

3. Use of `NEXT_PRIVATE_DEBUG_CACHE`. Despite my best efforts, the information
   provided by this remains opaque to me. It certainly shows a lot of log
   information but I've no idea how to make sense of it.

## Observations of Interest

I want to understand the expected values of the cache headers under various
conditions, specifically the Cache-Control header, but also whatever other
headers look like they might be interesting.

- SSG
- Opting out of the static shell (SSR mode?)
- Cache Components (Single Component)
- Cache Components (Nested Components)
- Streaming Uncached Data
- Client-side data loading

## SSG

I've created a new route at `/cache-testing/ssg` which does not specify any
sort of cache behavior at all. During `next build`, it emits as:

```
Route (app)             Revalidate  Expire
┌ ○ /                          15m      1d
└ ○ /cache-testing/ssg          1w     30d

○  (Static)             prerendered as static content
```

I believe this is successful in generating a fully static page. When accessing
this route using `next start`, I observe these headers (truncated):

```
HTTP/1.1 200 OK
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=604800, stale-while-revalidate=1987200
ETag: "2u9hha6ycn8im"
```

### SSG Observations

The `Cache-Control` header is consistent with the revalidation time.

Why are there two `x-nextjs-prerender` headers?

Under what conditions would the `rsc`, `next-router-state-tree`,
`next-router-prefetch`, and `next-router-segment-prefetch` request headers
actually vary? The specific page here should generally _not_ vary, I would
think, but I do not fully understand these headers, so maybe I am wrong.

How is that `ETag` being generated?

## SSR

### Attempt 1

This one is a little more difficult to test. What I am aiming at would be the
Cache Component equivalent of putting `export const dynamic = 'force-dynamic';`
in a route. That is not supported under the Cache Components model. Instead,
the documentation states:

> Placing a `<Suspense>` boundary with an empty fallback above the document body
> in your Root Layout causes the entire app to defer to request time.

That sounds like it would yield the same effect. Sadly, I've decided to test
this cache behavior _after_ having already built the rest of the app, including
a root layout that certainly doesn't do this.

I considered a multiple-layout situation but I've discarded the idea as I do
not really want to clutter up the code base to support a test harness. Instead,
I'll test this by manually adding the `<Suspense>` to my existing layout, then
removing it when I am done testing.

I was _expecting_ this to change the build summary for my SSG page, but it
did not:

```
Route (app)             Revalidate  Expire
┌ ○ /                          15m      1d
└ ○ /cache-testing/ssg          1w     30d

○  (Static)             prerendered as static content
```

The response headers are likewise unaffected:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=604800, stale-while-revalidate=1987200
ETag: "cke9utyn88kd"
```

There _is_ a new `ETag` value. Does that just vary per-build? Yes. I re-did
a build and confirmed that I got a new `ETag` value without having changed
anything.

Notably, **my `console.log` statement was only called at build time**, and is
not hit at runtime at all -- not even on the first request. I reason that
simply wrapping the `<body>` in a `<Suspense>` in the layout was not enough.
My observations about the headers should be discarded.

### Attempt 2

Maybe I need to do something non-deterministic in the page before SSR kicks in?

I tried adding a `new Date()` to my console log, but received this build error:

> Error: Route "/cache-testing/ssr" used `new Date()` before accessing either
> uncached data (e.g. `fetch()`) or Request data (e.g. `cookies()`, `headers()`,
> `connection()`, and `searchParams`). Accessing the current time in a Server
> Component requires reading one of these data sources first. Alternatively,
> consider moving this expression into a Client Component or Cache Component.
> See more info here:
> https://nextjs.org/docs/messages/next-prerender-current-time

### Attempt 3

I changed `new Date()` to `performance.now()`. The build error cleared, but
there is otherwise no change in the observed behavior. My `console.log` messages
only appear at build-time, not at run-time. The response cache headers do not
show any significant difference.

### Attempt 4

I've gone back to `new Date()` but also added an `await connection()` prior to
the `new Date()` call. This has changed the build summary:

```
Route (app)             Revalidate  Expire
┌ ○ /                          15m      1d
├ ○ /cache-testing/ssg          1w     30d
└ ƒ /cache-testing/ssr          1w     30d

○  (Static)             prerendered as static content
ƒ  (Dynamic)            server-rendered on demand
```

Also, my `console.log` messages are no longer emitted at build-time. They _are_
emitted at run-time, with the value differing according to the request time,
as expected.

The response headers look like this:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-stale-time: 300
x-nextjs-prerender: 1
x-nextjs-postponed: 1
X-Powered-By: Next.js
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```

### Observations

- Contrary to the documentation, adding `<Suspense>` around the `<body>` in the
  layout was not enough to force the page into SSR mode. It remained as SSG
  until I actually had the page do something non-deterministic.

- I am not clear on the heuristic used to determine determinism. `new Date()`
  counts as non-deterministic but `performance.now()` does not. The best clue
  is the documentation on the error description page:
  https://nextjs.org/docs/messages/next-prerender-current-time, but the
  language used there suggests:
  - Something inside the compiler is scanning the code for specific calls that
    are white-listed as known to be non-deterministic.

  - The while-list is partially documented, the documentation uses weasel words
    to suggest that only a subset is documented.

  - `performance.now()` was intentionally excluded from the white-list.

### Cleanup

I had added `<Suspense>` around the `<body>` element in the layout, so I removed
it again after testing. This causes a build error:

> Error: Route "/cache-testing/ssr": Uncached data was accessed outside of
> `<Suspense>`. This delays the entire page from rendering, resulting in a slow
> user experience. Learn more: https://nextjs.org/docs/messages/blocking-route

So I'll simply delete the entire `/cache-testing/ssr` route as well.

For posterity, this is the test page I was using:

```tsx
import { connection } from 'next/server';

export default async function Page() {
  await connection();
  console.log('Rendering page...', new Date().toISOString());

  return (
    <main>
      <h1>Cache Testing</h1>

      <p>This page is generated on every request at run time.</p>
    </main>
  );
}
```

## Cache Components

I've created a new route at `/cache-testing/all-cached`. This `page.tsx` uses
the `use cache` directive and sets `cacheLife("minutes")`. It contains no
nested components.

The build summary is:

```
Route (app)                    Revalidate  Expire
┌ ○ /                                 15m      1d
└ ○ /cache-testing/all-cached          1m      1h

○  (Static)             prerendered as static content
```

The headers on the first request are:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: STALE
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=60, stale-while-revalidate=3540
ETag: "bmuaopumml8iw"
```

The `console.log` statement was emitted at run-time in response to this first
request. I have the understanding that it actually ran in the background due
to the stale-while-revalidate behavior.

Note: I had some confusion at this point that was later clarified in subsequent
testing. Because this first-request behavior matched my expectations for a fully
stale request (e.g., it reports STALE and it triggered the log statements at
run-time), I imagined it was disregarding the build-time value and rendering
the first hit as though it were uncached. Later testing has changed my mind
on this, and now I think the build-time value _is_ respected by the cache, and
I simply took too long to issue the request.

A fast-follow request shows headers of:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=60, stale-while-revalidate=3540
ETag: "bmuaopumml8iw"
```

The `console.log` statement was _not_ observed for this cache hit.

If I wait a few minutes, I can observe a follow-up request showing the stale
cache behavior:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: STALE
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=60, stale-while-revalidate=3540
ETag: "bmuaopumml8iw"
```

This stale follow-up resulted in the `console.log` message being emitted at
run-time.

I made this request at 13:50:32 local time. I observe the stale-while-revalidate
header suggests I may see a different result if I wait for the that time to
expire before the next request. My assumption is that this header implies that
it is ok to serve a stale response (while doing revalidation in the background)
for the next 3,540 seconds (59 minutes). I will make another test
after 14:52:00.

I took a lunch break and made another request afterwards, about two and a half
hours later:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: STALE
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=60, stale-while-revalidate=3540
ETag: "bmuaopumml8iw"
```

These headers are identical to the previous ones. I observed my `console.log`
statement in the runtime logs, as expected. Since I understand the
`x-nextjs-cache: STALE` header to indicate that a stale response was
delivered, I conclude that the stale-while-revalidate behavior took place.
This is not what I guessed would happen. Since I made the new request well
after the stale-while-revalidate window had expired, I had wondered if this
would actually serve _fresh_ data. Based on these headers, I think that
probably was not the case.

I suppose it is possible that I _was_ served fresh data and I just cannot
tell by looking at the headers.

### Observations

- The `console.log` statement is emitted at build time.

- The first requested reported the "Stale" behavior despite having been built
  at run-time. I did not time it, but I am reasonably sure I took less than a
  minute to make that first request. **Update:** I have changed my mind on this,
  and now I think I must have taken over a minute to make the first request.

- The second requested worked as I expected it would.

- The `stale-while-revalidate` value in the `Cache-Control` header makes me
  think I will see a different behavior if I am willing to wait a full hour
  before making another request.

## Nested Components

I would like to better understand how the cache life of nested components
can affect the cache life of a route as a whole.

### Attempt 1

I've created a new route at `/cache-testing/nested`. This route contains a
static shell with `cacheLife("hours")` and a nested component with
`cacheLife("minutes")`.

The build summary for this is:

```
Route (app)                    Revalidate  Expire
┌ ○ /                                 15m      1d
└ ○ /cache-testing/nested              1h      1d

○  (Static)             prerendered as static content
```

I observed my `console.log` statements firing during build-time.

The headers are:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=3600, stale-while-revalidate=82800
ETag: "zic0acnf6i8oc"
```

I did _not_ observe my `console.log` statements firing at run-time.

Note this differs in important ways from the observed behavior of the previous
test, in which the static shell had no nested components and a `cacheLife` of
minutes. In the previous test, the first hit resulted in `x-nextjs-cache: STALE`
and the `console.log` statements firing.

### Exploration: Build-time vs Run-time Cache Values

I've changed the `cacheLife` of the outer component to match the `minutes` used
by the inner component. All components now have a cache life of `minutes`.

The build summary is now:

```
Route (app)                    Revalidate  Expire
┌ ○ /                                 15m      1d
└ ○ /cache-testing/nested              1m      1h

○  (Static)             prerendered as static content
```

The first-hit headers are:

```
HTTP/1.1 200 OK
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=60, stale-while-revalidate=3540
ETag: "sa16kqsek28oc"
```

Though the values for `s-maxage` and `stale-while-revalidate` have indeed
changed, this looks like a cache hit, implying it is using the result generated
at build-time.

So why did I observe different behavior for the first-hit result when no nested
component was involved?

I re-tested the `/cache-testing/all-cached` and made sure I waited less than a
minute before making the first request. I observed a `x-nextjs-cache: HIT`
value, and I am now convinced that the cache is respecting the build-time value.
There is no significant difference between the first hit and any other hit with
regards to whether the cached value needs to be revalidated or not.

Now that I understand how this works, I will restore the `cacheLife("hours")`
for the outer component.

### Attempt 3

## Layout

For the layout, I've set:

```ts
'use cache';
cacheLife('weeks');
```

Using `console.log` statements, I believe this is now working as expected.
At least, I am not inclined to wait around for a week to see if the cache
expires.

## Streaming Uncached Data

I would like to explore a configuration that permits:

- A long cache duration on the static shell,
- Streaming of content with a shorter duration (or no duration)

### Attempt 1

```tsx
import { connection } from 'next/server';
import { Suspense } from 'react';

export default async function Page() {
  console.log('Rendering route that streams uncached data', performance.now());

  return (
    <main>
      <h1>Cache Testing</h1>

      <p>This page streams uncached data.</p>

      <Suspense fallback={<p>Loading streamed data...</p>}>
        <NestedComponent />
      </Suspense>
    </main>
  );
}

async function NestedComponent() {
  await connection();
  const now = new Date();
  console.log('Rendering nested component', now.toISOString());

  return (
    <p>
      {now.valueOf()} - This is a nested component that I think should be
      streamed?
    </p>
  );
}
```

```
Build summary:

Route (app)                    Revalidate  Expire
┌ ○ /                                 15m      1d
└ ◐ /cache-testing/streaming           1w     30d

○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
```

At build time, the outer component emits `console.log` statements but the
inner component does not. I understand this to mean that build-time is
rendering the suspense fallback only.

At run-time, I observe these headers:

```
HTTP/1.1 200 OK
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-stale-time: 300
x-nextjs-prerender: 1
x-nextjs-postponed: 1
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
```

I also observe the `console.log` statements emitted server-side for both the
inner and outer components.

This is not acceptable because the `Cache-Control` header indicates this cannot
be cached.

### Attempt 2

I attempted to specify a longer cache duration by adding `"use cache"` and
`cacheLife("minutes")` to the outer component.

This resulted in a build-time error:
https://nextjs.org/docs/messages/next-request-in-use-cache

### Conclusion

I suspect the outer component's result actually _is_ cached at some level, but
not in a way that is exposed through the cache headers. I struggle to see the
usefulness of this; is it simply to memoize the static shell?

If so, I do not see this as being particularly useful outside of some edge
cases.

### Conclusion - Update 1

Note: it occurs to me that my test harness may be limiting my understanding
of the usefulness. Probably my test cases are all small enough to fit into
a single chunk, so I am not observing any real streaming effect at all.

I can imagine a real-world page that contains a much larger amount of HTML,
enough to be significant over the wire. In that case, there could be a real
performance improvement if we can cache the outer shell and stream inner bits
as they become available. The browser can start rendering the shell before
the inner bits are fully ready. In this case, would I see different
`Cache-Control` headers? I don't think so, but I _might_ see a difference
in lighthouse scores if the browser is able to start rendering before the
last byte is actually received.

### Conclusion - Update 2

I tried harder to test this:

1. I created the `scripts/streamObserver.ts` file to log chunks.
2. I added a 5,000ms delay to the `listProducts` API call.

My hope was that the chunks would start appearing, then I would see a five
second delay, then more chunks containing the featured products.

This did not happen. I realize now that the home page still has cache headers
that trigger stale-while-revalidate behavior. This behavior means that
the delay _does_ happen, but only during the background revalidation. The
browser gets the stale version, which is still all in one chunk from the
last time the page was rendered.

I think this might have some benefit if these cases are all true:

- I'm willing to accept a `no-cache` in the `Cache-Control`.
- The static shell is still cached internally by Next.js.
- One or more slow APIs are involved in rendering uncached data.

Perhaps if I need to render a page that is specific to an authenticated user.

Update: Verified -- I removed the `use cache` directive from the home page's
route component, and now I see multiple chunks being delivered when I
test using the `streamObserver`, including timing information that shows
the 5-second delay is active.

But since I want the home page to generally be cached, I no longer think
the streaming solution is appropriate for the featured products.

## Client-side Data Loading

I would like to explore a configuration that permits:

- A long cache duration on the route,
- Data loading using `"use server"`.

### Attempt 1

```tsx
import { Suspense } from 'react';

export default async function Page() {
  console.log('Rendering cache testing page', performance.now());

  return (
    <main>
      <h1>Cache Testing</h1>

      <p>This page uses a server action to load data.</p>

      <Suspense fallback={<p>Loading data from server action...</p>}>
        <ServerActionComponent />
      </Suspense>
    </main>
  );
}

async function ServerActionComponent() {
  const time = await getCurrentHRTime();
  console.log('Rendering server component', time);

  return <p>The process HR time is: {time.toString()}</p>;
}

async function getCurrentHRTime() {
  'use server';
  return process.hrtime();
}
```

## Banner Example

I'm working through the idea of having an `"hours"` cache life on the home
page, which should let met stream the products, but I will need to ensure
the banner's promotional information loads on each page load.

### Attempt 1

```tsx
// www/app/page.tsx
export async function Page() {
  'use cache';
  cacheLife('hours');
  return <Home />;
}

// www/components/home/Home.tsx
export function Home() {
  return (
    <main>
      <Banner />
      <Hero />
      <FeaturedProducts />
    </main>
  );
}

// www/components/home/banner/Banner.tsx
export function Banner() {
  return (
    <Suspense fallback={<BannerSkeleton />}>
      <BannerContent />
    </Suspense>
  );
}

async function BannerContent() {
  const promo = await getActivePromotion();

  if (!promo || (!promo.title && !promo.description)) {
    return null;
  }

  return (
    <section className={styles['banner']}>
      <div className="layout-max-width">
        {promo.title ? <h2>{promo.title}</h2> : null}
        {promo.description ? <p>{promo.description}</p> : null}
        {promo.code ? (
          <p>
            Use code: <strong>{promo.code}</strong>
          </p>
        ) : null}
      </div>
    </section>
  );
}
```

I thought this would work because:

- I set `cacheLife("hours")` on the outermost route component.
- I used `<Suspense>` with a fallback for the banner component.
- I thought the suspense fallback would be included in the static shell and the
  content would not.

This failed because it just ends up going down the streaming route. I _think_
I was right about how the static shell ends up using the promo skeleton rather
than the contents. But this doesn't help the contents have a different cache
lifetime that the rest of the page.

If I want to do this, I need some way to ensure the banner is only loaded once
the page has rendered client-side. The most comfortable tool I have for that
is a `useEffect`, which I think I can combine with a server action? Let's
try it with one of these new transition things.

### Attempt 2

I've made the following changes:

1. Add `use client` to Banner.tsx.
2. Use `useTransition`, `useState`, `useEffect`, etc to manage client-side
   data loading.
3. Adjusted the `"use server"` directive in `getActivePromotion.tsx` to apply
   to the entire file rather than just the single function.

This works! I now see these headers on the home page:

```
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
x-nextjs-prerender: 1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=3600, stale-while-revalidate=82800
ETag: "171c77tfdn6qhf"
```

And I observe the loading skeleton when the page loads. I also observe the
value of the promotional banner changes on each load.

I think, were I to deploy this, the contents of the home page would be
cached for the expected hour, and the user would still see a dynamically-loaded
promotional banner on each page load.

`Banner.tsx` now looks like this:

```tsx
'use client';

// import statements omitted

export default function Banner() {
  const [isPending, startTransition] = useTransition();
  const [promo, setPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    startTransition(async () => {
      setPromo(await getActivePromotion());
    });
  }, []);

  if (isPending) {
    return <BannerSkeleton />;
  }

  if (!promo || (!promo.title && !promo.description)) {
    return null;
  }

  return <p>...banner contents same as before...</p>;
}
```

## Conclusions

- A fully SSG route with no other configuration emits headers that permit
  caching mostly as I would expect. The cache-control header for this is:
  `Cache-Control: s-maxage=604800, stale-while-revalidate=1987200`

- `ETag` values vary per-build, even if nothing else changes, even for a
  fully static page.

- It is possible to replicate SSR mode by wrapping the `<body>` in a
  `<Suspense>`, then ensuring the page does _something_ non-deterministic
  (perhaps simply `await connection()` might be enough). The header is:
  `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`

- When a page declares `use cache` and `cacheLife(...)` we can control
  the cache headers for the static shell; e.g., `cacheLife("minutes")` is:
  `Cache-Control: s-maxage=60, stale-while-revalidate=3540`.

- When a request is made well beyond the `stale-while-revalidate` window,
  the response headers were indistinguishable from the response headers
  from a stale response from inside the window.

| Route   | Nested  | Mode | s-maxage         |
| ------- | ------- | ---- | ---------------- |
| blank   | blank   | ○    | 900              |
| blank   | seconds | ○    | [build error][1] |
| blank   | minutes | ○    | 60               |
| blank   | hours   | ○    | 900              |
| seconds | blank   | ○    | [build error][2] |
| seconds | seconds | ○    | [build error][2] |
| seconds | minutes | ○    | [build error][2] |
| seconds | hours   | ○    | [build error][2] |
| minutes | blank   | ○    | 60               |
| minutes | seconds | ○    | 60               |
| minutes | minutes | ○    | 60               |
| minutes | hours   | ○    | 60               |
| hours   | blank   | ○    | 3600             |
| hours   | seconds | ○    | 3600             |
| hours   | minutes | ○    | 3600             |
| hours   | hours   | ○    | 3600             |

- Short-duration cache times (`"seconds"`) have special treatment:
  - If the route component omits `cacheLife` and a nested component contains
    `cacheLife("seconds")`, this is a [build error][1] because we are expected
    to specify `cacheLife` on the outer cache. This is a safety feature to
    avoid misconfigurations.

  - If the route component specifies `cacheLife("seconds")`, it is necessary
    to provide a `loading.tsx` or include `<Suspense>` in the layout. It is
    not possible to use static mode with `cacheLife("seconds")`, but partial
    pre-render mode seems ok.

- The cache lifetime of a route's static shell is determined by the `cacheLife`
  directive on the route handler, and disregards `cacheLife` directives on
  nested components. If `use cache` is present but `cacheLife` is missing, the
  `cacheLife` of the nested component is used.

[1]: https://nextjs.org/docs/messages/nested-use-cache-no-explicit-cachelife 'Nested Use Cache with No Explicit CacheLife'
[2]: https://nextjs.org/docs/messages/blocking-route 'Blocking route'
