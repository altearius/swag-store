import CartPage from '../../components/cart/Cart';

// I see the "Cart Functionality" description does _not_ have a Route associated
// with it. I think that implies that I could make this into a dialog or modal
// or something. I personally don't like modals very much so I'm going with a
// dedicated page for it instead.

export default function Page() {
	return <CartPage />;
}
