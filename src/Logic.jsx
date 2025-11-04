import { useState, useEffect, useReducer, createContext } from "react";
import { useParams } from "react-router";
import ShopRender from "./Shop";
import CartRender from "./Cart";
import Home from "./Home";
import ErrorPage from "./ErrorPage";


export const shopContext = createContext({
    cartState: {},
    fetchedData: {},
    handlerFunctions: {}
});

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
                return [...cart, { ...action.product, cartAmount: 1 }];
            }
        }
        case "decrease_amount": {
            const existing = cart.find(el => el.id === action.id);
            if (!existing) {
                return cart;
            } else if (existing.cartAmount === 1) {
                return cart.filter(el => el.id !== action.id);
            } else {
                return cart.map(el => {
                    return el.id === action.id
                        ? { ...el, cartAmount: el.cartAmount - 1 }
                        : el;
                });
            }
        }
        case "set_amount": {
            const existing = cart.find(el => el.id === action.id);
            if (existing) {
                return cart.map(el => {
                    const newAmount = Math.min(action.setAmount, 10);
                    return el.id === action.id
                        ? { ...el, cartAmount: newAmount }
                        : el;
                });
            } else {
                return [...cart, { ...action.product, cartAmount: action.setAmount }];
            }
        }
        case "delete": {
            const existing = cart.find(el => el.id === action.id);
            if (existing) {
                return cart.filter(el => el.id !== action.id);
            } else {
                return cart;
            }
        }
        default:
            return cart;
    }
}

const AppLogic = () => {
    const [cart, dispatch] = useReducer(reducer, []);
    const { section } = useParams();
    console.log("Section is", section);

    const [fetchedData, setfetchedData] = useState(null);
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

    // CONDITIONAL RENDERING

    if (section === "shop") {
        console.log("Changed section to shop");
        return (
            <shopContext.Provider value={{ cart, fetchedData }}>
                <ShopRender
                    renderData={fetchedData}
                    cart={cart}
                    handleDecreaseCart={(id, product) => {dispatch({ type: "decrease_amount", id, product })}}
                    handleSetCart={(id, product, value) => {dispatch({ type: "set_amount", id, product, setAmount: value })}}
                    handleIncreaseCart={(id, product) => {dispatch({ type: "increment_amount", id, product })}}
                />
            </shopContext.Provider>
        )
    } else if (section === "cart") {
        console.log("Changed section to cart");
        return (
            <shopContext.Provider value={{ cart }}>
                <CartRender
                    cart={cart}
                    handleDecreaseCart={(id, product) => {dispatch({ type: "decrease_amount", id, product })}}
                    handleSetCart={(id, product, value) => {dispatch({ type: "set_amount", id, product, setAmount: value })}}
                    handleIncreaseCart={(id, product) => {dispatch({ type: "increment_amount", id, product })}}
                    handleRemoveCart={(id) => {dispatch({ type: "delete", id })}}
                />
            </shopContext.Provider>
        )
    } else {
        console.log("Changed section to home");
        return (
            <Home />
        )
    }
}

export default AppLogic;