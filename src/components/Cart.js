// src/components/Cart.js
import React from 'react';
import CartItem from './CartItem';

export default function Cart({ items }) {
    // 1. Calculate subtotal
    const subtotal = items.reduce((sum, p) => sum + p.price, 0);
    // 2. Calculate tax at 13%
    const tax = subtotal * 0.13;
    // 3. Calculate total including tax
    const total = subtotal + tax;

    return (
        <aside style={{ padding: 20, borderTop: '1px solid #ccc' }}>
            <h3>Your Cart</h3>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {items.map((p, i) => (
                        <CartItem key={i} product={p} />
                    ))}
                    <hr />
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax (13%): ${tax.toFixed(2)}</p>
                    <p><strong>Total: ${total.toFixed(2)}</strong></p>
                </>
            )}
        </aside>
    );
}
