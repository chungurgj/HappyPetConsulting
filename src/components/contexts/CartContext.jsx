import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    // Save the cartItems to local storage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, ) => {
    setCartItems((prevItems) => [...prevItems, { product, quantity  }]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (productId, updatedQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
