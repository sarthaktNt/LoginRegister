import React, { useState } from 'react';
import './../HomePage.css';

const HomePage = () => {
  const [cart, setCart] = useState([]);

  // Sample product data
  const products = [
    { id: 1, name: 'Product 1', price: 10 ,url:"https://5.imimg.com/data5/SELLER/Default/2021/10/ZE/HN/SE/43134548/picasa-gr-tablet-500x500-500x500.jpeg" },
    { id: 2, name: 'Product 2', price: 20 , url :'https://5.imimg.com/data5/SELLER/Default/2021/10/ZE/HN/SE/43134548/picasa-gr-tablet-500x500-500x500.jpeg'},
    { id: 3, name: 'Product 3', price: 30 ,url :'https://5.imimg.com/data5/SELLER/Default/2021/10/ZE/HN/SE/43134548/picasa-gr-tablet-500x500-500x500.jpeg'},
  ];

  // Function to add item to cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const productIndex = cart.findIndex(item => item.id === product.id);
  
    if (productIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className='container'>
      <h2>Products</h2>
      <div className='product-container'>
        {products.map(product => (
          <div key={product.id} className='product-item'>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div><img src={product.url} alt={product.name} /></div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <hr />
      <h2>Shopping Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}{' '}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
