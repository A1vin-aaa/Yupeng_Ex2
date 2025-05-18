import React from 'react';

export default function CartItem({ product }) {
    return (
        <div style={{ marginBottom: 10 }}>
            {product.name} — ${product.price}
        </div>
    );
}
