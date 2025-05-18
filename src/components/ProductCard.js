import React from 'react';

export default function ProductCard({ product, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                margin: 10,
                padding: 10,
                width: 150,
                cursor: 'pointer'
            }}
        >
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>
                {product.description}
            </p>
        </div>
    );
}
