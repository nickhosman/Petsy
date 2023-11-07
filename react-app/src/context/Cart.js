import React, { useState, useContext } from "react";

const CartContext = React.createContext();

export function CartProvider({ children }) {
    const [showCart, setShowCart] = useState(false);

    const contextValue = {
        showCart,
        setShowCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);
