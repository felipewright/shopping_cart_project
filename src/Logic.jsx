import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ShopRender from "./Shop";
import CartRender from "./Cart";
import Home from "./Home";
import ErrorPage from "./Error_page";

export const shopContext = React.createContext({
    cartState: {},
    fetchedData: {},
    handlerFunctions: {}
});

const AppLogic = () => {
    const [cart, dispatch] = useReducer(reducer, []);
    // REFACTOR ALL THE HANDLE FUNCTION INTO THE REDUCER TO MAKE THE CODE CLEANER

    const { section } = useParams();

    const [fetchedData, setfetchedData] = useState(null);
    // const [cart, setCart] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // FETCH DATA

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', { mode: "cors" })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json()
            })
            .then((res) => {

                const dataArr = res.map(el => ({
                    key: crypto.randomUUID(),
                    id: el.id,
                    name: el.title,
                    price: el.price,
                    cartAmount: 0,
                    imageUrl: el.image
                }));


                setfetchedData(dataArr);
            })
            .catch(error => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <ErrorPage />;

    // HANDLE CART FUNCTIONS

    function reducer(cart, action) {
        switch (action.type) {
            case "increment_amount": {
                const existing = cart.find(el => el.id === action.id);
                if (existing) {
                    return cart.map(el => {
                        const newAmount = el.cartAmount + 1;
                        return el.id === action.id && newAmount < 11
                            ? { ...el, cartAmount: newAmount }
                            : el;
                    });
                } else {
                    if (!action.product) return cart;
                    return [...cart, { ...action.product, cartAmount: 1 }];
                }
            }
            case "decrease_amount": {
                const existing = cart.find(el => el.id === action.id);
                if (existing) {
                    return cart.map(el => {
                        const newAmount = el.cartAmount - 1;
                        return el.id === action.id && newAmount > 0
                            ? { ...el, cartAmount: newAmount }
                            : el;
                    });
                }
            }
            case "set_amount": {
                const existing = cart.find(el => el.id === action.id);
                if (existing) {
                    return cart.map(el => {
                        const newAmount = action.setAmount;
                        newAmount > 10 ? newAmount = 10 : newAmount;
                        return el.id === action.id
                            ? { ...el, cartAmount: newAmount }
                            : el;
                    });
                } else {
                    !action.product
                        ? cart
                        : [...cart, { ...action.product, cartAmount: action.setAmount }];
                }
            }
            case "delete": {
                const existing = cart.find(el => el.id === action.id);
                if (existing) {
                    cart.filter(el => el.id !== id)
                }
            }
            default:
                return cart;
        }
    }

    const handleSetCart = (value, id) => {
        value = Math.min(value, 10);

        setCart(prev => {
            const existing = prev.find(el => el.id === id)
            if (existing) {
                return prev.map(el =>
                    el.id === id ? { ...el, cartAmount: value } : el
                )
            } else {
                const product = fetchedData.find(el => el.id === id)
                if (!product) return prev
                return [...prev, { ...product, cartAmount: value }]
            }
        })
    }

    const handleIncreaseCart = (id) => {
        setCart(prev => {
            const existing = prev.find(el => el.id === id)
            if (existing) {
                return prev.map(el => {
                    const newAmount = el.cartAmount + 1;
                    return el.id === id && newAmount < 11 ? { ...el, cartAmount: newAmount } : el
                }
                )
            } else {
                const product = fetchedData.find(el => el.id === id)
                if (!product) return prev
                return [...prev, { ...product, cartAmount: 1 }]
            }
        })
    }

    const handleDecreaseCart = (id) => {
        setCart(prev => {
            const existing = prev.find(el => el.id === id);
            if (!existing) return prev;

            if (existing.cartAmount > 1) {
                return prev.map(el =>
                    el.id === id ? { ...el, cartAmount: el.cartAmount - 1 } : el
                );
            }
            return prev.filter(el => el.id !== id);
        });
    };


    const handleRemoveCart = (id) => {
        console.log(handleRemoveCart);
        setCart(prev => prev.filter(el => el.id !== id));
    };


    // CONDITIONAL RENDERING

    if (section === "shop") {
        return (
            <shopContext.Provider value={{ cart, fetchedData }}>
                <ShopRender
                    renderData={fetchedData}
                    cart={cart}
                    handleDecreaseCart={handleDecreaseCart}
                    handleSetCart={handleSetCart}
                    handleIncreaseCart={handleIncreaseCart}
                />
            </shopContext.Provider>
        )
    } else if (section === "cart") {
        return (
            <shopContext.Provider value={{ cart }}>
                <CartRender
                    cart={cart}
                    handleDecreaseCart={handleDecreaseCart}
                    handleSetCart={handleSetCart}
                    handleIncreaseCart={handleIncreaseCart}
                    handleRemoveCart={handleRemoveCart}
                />
            </shopContext.Provider>
        )
    } else {
        return (
            <Home />
        )
    }
}

export default AppLogic;