import { Link } from "react-router";

const CartComponent = ({ id, name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart, handleRemoveCart }) => {
    return (
        <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-lg hover:cursor-pointer
      transition-transform duration-500 hover:scale-[1.02]">
            <img
                src={imageUrl}
                alt={name}
                className="object-cover rounded-xl mb-4 bg-white"
            />
            <div className="text-center mb-4">
                <p className="font-semibold text-xl leading-snug">{name}</p>
                <p className="text-gray-400 text-xl mt-1">${price}</p>
            </div>

            <div className="flex items-center justify-center gap-2 w-full max-w-[150px] mb-3">
                <button
                    onClick={() => decreaseCart(id)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-md text-xl py-1 transition"
                >
                    −
                </button>
                <input
                    type="number"
                    max={10}
                    min={0}
                    value={cartAmount}
                    onChange={(e) => setCart(id, Number(e.target.value))}
                    className="flex-1 text-center bg-gray-800 rounded-md text-xl py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <button
                    onClick={() => increaseCart(id)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-md text-xl py-1 transition"
                >
                    +
                </button>
            </div>

            <button
                onClick={() => handleRemoveCart(id)}
                className="w-full bg-red-700 hover:bg-red-600 text-gray-100 rounded-md py-2 text-lg transition"
            >
                Remove
            </button>
        </div>
    );
};

const CartRender = ({ cart, handleDecreaseCart, handleSetCart, handleIncreaseCart, handleRemoveCart }) => {
    console.log("This is the cart", cart);

    if (!cart) {
        return (
            <main className="flex-1 flex flex-col justify-center items-center h-full bg-gray-950 text-gray-100">
                <h2 className="text-9xl font-semibold mb-4 tracking-wide text-purple-400">
                    Welcome to the Home Page!
                </h2>
                <p className="text-5xl text-gray-300">Shop smart. Shop easy. Shop here.</p>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="flex-1 flex flex-col justify-center items-center h-full bg-gray-950 text-gray-100">
                <h2 className="text-7xl font-semibold mb-4 tracking-wide text-purple-400">
                    Your cart is empty.
                </h2>
                <Link to="/shop" className="text-5xl text-gray-300">
                    Click here to browse products.
                </Link>
            </main>
        );
    }

    return (
        <main className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-9 px-60">
            {cart.map((el) => {
                const cartItem = cart.find((item) => item.id === el.id);
                const amount = cartItem ? cartItem.cartAmount : 0;

                return (
                    <CartComponent
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        price={el.price}
                        cartAmount={amount}
                        imageUrl={el.imageUrl}
                        decreaseCart={handleDecreaseCart}
                        setCart={handleSetCart}
                        increaseCart={handleIncreaseCart}
                        handleRemoveCart={handleRemoveCart}
                    />
                );
            })}
        </main>
    );
};

export default CartRender;
