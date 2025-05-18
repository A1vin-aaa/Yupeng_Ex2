import React from 'react';

export default function ProductDetailModal({ product, onClose, onAdd }) {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ background: 'white', padding: 20, width: 300 }}>
                <button onClick={onClose}>Close</button>
                <img src={product.image} alt="" style={{ width: '100%' }} />
                <h2>{product.name}</h2>
                <p style={{ margin: '10px 0', color: '#333' }}>
                    {product.description}
                </p>
                <p style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
                <button onClick={() => onAdd(product)}>Add to Cart</button>
            </div>
        </div>
    );
}
