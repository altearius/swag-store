# Item Component Notes

The requirements include this line:

> Users can increase or decrease the quantity of items in the cart.

I thought about whether this should interact with the stock API, meaning, maybe
I should go check to see if each item is actually in stock, and set a "max" on
the quantity selector.

I've rejected that because:

1. The cart is stored client-side, so the necessary information is not
   available server-side during the initial page load.

   I would need to do at least one round-trip to the server to get the stock
   information, then the server would need to make O(n) calls to the stock API
   before responding.

2. The stock API is slow, 4+ seconds per request for me!

3. The stock API appears to be returning more or less random values anyway,
   probably because this is just a demo API.

4. This wasn't identified as a requirement anyway.

5. Maybe I'll come back to it later.
