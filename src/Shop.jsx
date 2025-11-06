const ShopComponent = ({ id, name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart }) => {
    const product = { id, name, price, imageUrl };
    return (
        <div>
            <div>
                <img src={imageUrl} alt={name} />
            </div>
            <div>
                <p>{name}</p>
                <p>${price}</p>
            </div>
            <div>
                <button onClick={() => decreaseCart(id, product)}>-</button>
                <input
                    type="number"
                    max={10}
                    min={0}
                    value={cartAmount}
                    onChange={(e) => setCart(id, product, Number(e.target.value))}
                />
                <button onClick={() => increaseCart(id, product)}>+</button>
            </div>
        </div>
    );
};


const ShopRender = ({ renderData, cart, handleDecreaseCart, handleSetCart, handleIncreaseCart }) => {
    console.log("RenderShop says that cart is", cart);

    return (
        renderData && <>
            <h2>PRODUCTS</h2>
            <div>
                {renderData.map(el => {
                    const cartItem = cart?.find((item) => item.id === el.id);
                    const amount = cartItem ? cartItem.cartAmount : 0;

                    return (
                        <ShopComponent
                            key={el.key}
                            id={el.id}
                            name={el.name}
                            price={el.price}
                            cartAmount={amount}
                            imageUrl={el.imageUrl}
                            decreaseCart={handleDecreaseCart}
                            setCart={handleSetCart}
                            increaseCart={handleIncreaseCart}
                        />
                    )
                }
                )}
            </div>
        </>
    )
}

export default ShopRender;