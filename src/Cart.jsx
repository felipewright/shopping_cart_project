const CartComponent = ({ name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart, handleRemoveCart, id }) => {
    return (
        <div className={shopStyles.product}>
            <div className={shopStyles.productImageContainer}>
                <img className={shopStyles.productImage} src={imageUrl}></img>
            </div>
            <div>
                <p className={shopStyles.productName}>{name}</p>
                <p className={shopStyles.productPrice}>${price}</p>
            </div>
            <div className={shopStyles.cartInput}>
                <button onClick={() => decreaseCart(id)}>-</button>
                <input onChange={(event) => setCart(id, parseInt(event.target.value))} type="number" max={10} value={cartAmount}></input>
                <button onClick={() => increaseCart(id)}>+</button>
            </div>
            <button className={CartStyles.removeButton} onClick={() => handleRemoveCart(id)}>Remove</button>
        </div>
    )
}

const CartRender = ({ cart, handleDecreaseCart, handleSetCart, handleIncreaseCart, handleRemoveCart }) => {
    console.log("RenderShop says that cart is", cart);

    return (
        cart && <>
            <h2 className={shopStyles.sectionTitle}>CART</h2>
            <div className={CartStyles.productsContainer}>
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