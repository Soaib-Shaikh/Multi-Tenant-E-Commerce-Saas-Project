import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('ecommerce_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'prod-1',
        name: 'Aura Sound Pro Wireless Headphones',
        category: 'Electronics',
        price: 249.99,
        originalPrice: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        quantity: 1,
        selectedColor: '#1e293b'
      },
      {
        id: 'prod-3',
        name: 'Minimalist Leather Urban Backpack',
        category: 'Fashion',
        price: 129.50,
        originalPrice: 160.00,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        quantity: 1,
        selectedColor: '#78350f'
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ecommerce_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-5'];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevItems,
        {
          ...product,
          quantity,
          selectedColor: selectedColor || (product.colors ? product.colors[0] : null),
          selectedSize: selectedSize || (product.sizes ? product.sizes[0] : null)
        }
      ];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discountPercent: 20 });
      showToast('Coupon SAVE20 applied! 20% discount');
      return { success: true, message: '20% discount applied!' };
    } else if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discountAmount: 10 });
      showToast('Coupon WELCOME10 applied! $10 discount');
      return { success: true, message: '$10 discount applied!' };
    } else {
      showToast('Invalid coupon code', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed', 'info');
  };

  // Calculations
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const shippingCost = subtotal > 100 || cartItems.length === 0 ? 0 : 15.00;
  const tax = (subtotal - discount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + shippingCost + tax);

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlist,
      appliedCoupon,
      toastMessage,
      quickViewProduct,
      setQuickViewProduct,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      applyCoupon,
      removeCoupon,
      totalCount,
      subtotal,
      discount,
      shippingCost,
      tax,
      grandTotal,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};
