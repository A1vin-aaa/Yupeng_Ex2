import React from 'react';

export default function Header({ cartCount }) {
    return (
        <header style={{ padding: 20, background: '#282c34', color: 'white' }}>
            <h1>Sport Shop</h1>
            <span>Cart: {cartCount} items</span>
        </header>
    );
}
