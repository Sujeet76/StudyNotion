import { useSelector } from "react-redux";
import {
  RouteThoughClickComponent,
  CartCard,
  ButtonDashboard,
} from "../../Components";

const CartPage = () => {
  const { cartItem, totalPrice, cartLength } = useSelector(
    (store) => store.cart
  );

  console.log(cartItem);

  return (
    <div className="w-11/12 mx-auto pb-32">
      <RouteThoughClickComponent title="My Cart" />
      <div className="mt-9 border-b border-b-richblack-700">
        <p className="text-richblack-400 font-semibold p-1 pl-0 mb-3">
          {cartLength} Courses in Wishlist
        </p>
      </div>

      {cartItem.length > 0 ? (
        <div className="mt-7 flex gap-x-10">
          <div className="flex flex-col gap-y-10">
            {cartItem.map((content) => (
              <CartCard content={content} key={content._id} />
            ))}
          </div>
          <div className="p-6 bg-richblack-800 border border-richblack-700 self-start rounded-lg flex flex-col gap-4 w-[30%]">
            <p className="text-richblack-200 font-semibold">Total:</p>
            <p className="text-2xl font-semibold text-yellow-50">
              Rs. {totalPrice}
            </p>
            <ButtonDashboard isActive={true}>Buy Now</ButtonDashboard>
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center text-3xl font-semibold text-richblack-400">
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default CartPage;
