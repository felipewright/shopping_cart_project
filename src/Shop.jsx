const ShopComponent = ({ name, imageUrl, price, cartAmount, decreaseCart, setCart, increaseCart, id }) => {
    return (
        <div className={styles.product}>
            <div className={styles.productImageContainer}>
                <img className={styles.productImage} src={imageUrl}></img>
            </div>
            <div>
                <p className={styles.productName}>{name}</p>
                <p className={styles.productPrice}>${price}</p>
            </div>
            <div className={styles.cartInput}>
                <button onClick={() => decreaseCart(id)}>-</button>
                <input onChange={(event) => setCart(id, parseInt(event.target.value))} type="number" max={10} value={cartAmount}></input>
                <button onClick={() => increaseCart(id)}>+</button>
            </div>
        </div>
    )
}

const ShopRender = ({ renderData, cart, handleDecreaseCart, handleSetCart, handleIncreaseCart }) => {
    console.log("RenderShop says that cart is", cart);

    return (
        renderData && <>
            <h2 className={styles.sectionTitle}>PRODUCTS</h2>
            <div className={styles.productsContainer}>
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