const ShopComponent = ({ id, name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart }) => {
  const product = { id, name, price, imageUrl };

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
      <div className="flex items-center justify-center gap-2 w-full max-w-[150px]">
        <button
          onClick={() => decreaseCart(id, product)}
          className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-md text-xl py-1 transition"
        >
          −
        </button>
        <input
          type="number"
          max={10}
          min={0}
          value={cartAmount}
          onChange={(e) => setCart(id, product, Number(e.target.value))}
          className="flex-1 text-center bg-gray-800 rounded-md text-xl py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
        />
        <button
          onClick={() => increaseCart(id, product)}
          className="flex-1 bg-gray-800 hover:bg-gray-700 rounded-md text-xl py-1 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};


const ShopRender = ({ renderData, cart, handleDecreaseCart, handleSetCart, handleIncreaseCart }) => {
  return (
    renderData && (
      <main className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 py-9 px-60">
        {renderData.map((el) => {
          const cartItem = cart?.find((item) => item.id === el.id);
          const amount = cartItem ? cartItem.cartAmount : 0;

          return (
            <ShopComponent
              key={el.id}
              id={el.id}
              name={el.name}
              price={el.price}
              cartAmount={amount}
              imageUrl={el.imageUrl}
              decreaseCart={handleDecreaseCart}
              setCart={handleSetCart}
              increaseCart={handleIncreaseCart}
            />
          );
        })}
      </main>
    )
  );
};

export default ShopRender;
