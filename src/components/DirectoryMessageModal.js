// src/components/DirectoryMessageModal.js
import React from 'react';
import ProductCard from './ProductCard';

export default function DirectoryMessageModal({ directory, products, onClose }) {
    if (!directory) return null;

    // Filter products by the selected directory/category
    const filteredProducts = products.filter(
        product => product.category === directory.name
    );

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ background: 'white', padding: 20, borderRadius: 6, maxWidth: 500 }}>
                <h2>{directory.name}</h2>
                <p>{directory.message}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 16 }}>
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => {}}
                        />
                    ))}
                    {filteredProducts.length === 0 && <p>No products in this category.</p>}
                </div>
                <button onClick={onClose} style={{ marginTop: 12 }}>Close</button>
            </div>
        </div>
    );
}
