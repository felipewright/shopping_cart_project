const CartComponent = ({ name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart, handleRemoveCart, id }) => {
    return (
        <div>
            <div>
                <img src={imageUrl}></img>
            </div>
            <div>
                <p>{name}</p>
                <p>${price}</p>
            </div>
            <div>
                <button onClick={() => decreaseCart(id)}>-</button>
                <input onChange={(event) => setCart(id, parseInt(event.target.value))} type="number" max={10} value={cartAmount}></input>
                <button onClick={() => increaseCart(id)}>+</button>
            </div>
            <button onClick={() => handleRemoveCart(id)}>Remove</button>
        </div>
    )
}

const CartRender = ({ cart, handleDecreaseCart, handleSetCart, handleIncreaseCart, handleRemoveCart }) => {
    console.log("RenderShop says that cart is", cart);

    return (
        cart && <>
            <h2>CART</h2>
            <div>
                {cart.map(el => {
                    const cartItem = cart?.find((item) => item.id === el.id);
                    const amount = cartItem ? cartItem.cartAmount : 0;

                    return (
                        <CartComponent
                            key={el.key}
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
                    )
                }
                )}
            </div>
        </>
    )
}

export default CartRender;