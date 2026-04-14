# Categories Notes

I'm facing a bug with the categories dropdown.

When the page is loaded with a query string; e.g. `/search?category=books`,
the value of the dropdown is correctly set to the chosen category.

If the user selects a new category and hits the `Search` button, the form
action handler pushes a new query string into the router, triggering
client-side navigation to the new value; e.g. `/search?category=hoodies`.

The search results now shows the results matching the newly chosen category,
but the dropdown visually reverts to the original value: it changes back
to `books` rather than `hoodies`.

This happens whether the dropdown is controlled or uncontrolled. For the
purposes of logging, I have converted the dropdown to be a controlled
component -- it otherwise would be fine being uncontrolled.

## Diagnosis

I've added some `console.log` statements to trace this behavior:

1. `[rendering]` fires in the body of the component function.
2. `[layout]` fires in a `useLayoutEffect` hook.
3. `[effect]` fires in a `useEffect` hook.
4. `[changed]` fires in an `onChange` event handler.

I created this helper function to log the value of the DOM node directly:

```ts
function readDomValue() {
  if (typeof document === 'undefined') {
    return null;
  }

  // @ts-expect-error - just for logs
  return document.forms[0]?.elements.namedItem('category')?.value;
}
```

Here are the logs I observed. I have removed unrelated and duplicate logs, such
as from React's double-render behavior.

### First Render (reload `/search?category=hoodies`)

```
[rendering] {category: 'hoodies', selected: 'hoodies', isPending: false, domValue: 'hoodies'}
[layout]    {category: 'hoodies', selected: 'hoodies', isPending: false, domValue: 'hoodies'}
[effect]    {category: 'hoodies', selected: 'hoodies', isPending: false, domValue: 'hoodies'}
```

### User Action: Select New Value

```
[changed]   {newValue: 'books',                      isPending: false, domValue: 'books'}
[rendering] {category: 'hoodies', selected: 'books', isPending: false, domValue: 'books'}
[layout]    {category: 'hoodies', selected: 'books', isPending: false, domValue: 'books'}
[effect]    {category: 'hoodies', selected: 'books', isPending: false, domValue: 'books'}
```

### User Action: Search

```
[rendering] {category: 'hoodies', selected: 'books', isPending: true,  domValue: 'books'}
[layout]    {category: 'hoodies', selected: 'books', isPending: true,  domValue: 'books'}
[effect]    {category: 'hoodies', selected: 'books', isPending: true,  domValue: 'books'}
[rendering] {category: 'books',   selected: 'books', isPending: false, domValue: 'books'}
[layout]    {category: 'books',   selected: 'books', isPending: false, domValue: 'hoodies'}
[effect]    {category: 'books',   selected: 'books', isPending: false, domValue: 'hoodies'}
```

The problem happens after the second render, once the transition completes and
`isPending` returns to `false`. At this point, all three values correctly
agree. The query string (`category`), the state (`selected`), and the DOM
all believe the value is `books`, which is good, because that is the value
I submitted.

But somewhere between the end of that render and the firing of the
`useLayoutEffect` hook, _something_ changes the DOM node from `books` back
to `hoodies` -- even though the query string and state values don't change.

The React state is now out of sync with the DOM.

## Theory

I think there must be an RSC reconciliation happening between the end of that
rendering and the firing of the `useLayoutEffect` hook, which sounds a little
crazy because I thought `useLayoutEffect` hooks were supposed to fire
synchronously after the rendering.

I also think the reconciliation is using the payload from the _initial_
rendering of the page -- the `?category=hoodies` version. Perhaps this is
happening because the category dropdown would typically not change as part
of the client-side navigation in this case, so some code somewhere believes it
is safe to reconcile against the original HTML from the initial page load.

## Rejected Option: `useRef`

I've considered using a `ref` to imeratively fix the DOM. I think this would
work because I could use either `useLayoutEffect` or `useEffect` to detect
when the `domValue` is not equal to the state value, and just fix it.

I've rejected this for now because it requires the dropdown to be controlled,
which increases overall complexity. The form is otherwise designed to use
uncontrolled inputs.

## Successful Option: `key`

If I add a `key={category}` property to the `select` element, I can force the
reconciliation process to consider the elements to be different nodes.

My working theory here is that the reconciliation process is resetting the
value of the `<select />` to that of the initial page load. It is comparing the
attributes and children thereof, understanding that the node should be identical
to how it existed initially (based on the DOM alone since `defaultValue` is not
a "real" attribute), and ensuring that the DOM matches accordingly.

I say that out loud and it sounds dodgy to me. Except the fix works: the
presence of `key={category}` is enough to fix the bug.
