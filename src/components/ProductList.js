import React from 'react';
import products from '../data/products'; // array of 6 product objects

import ProductCard from './ProductCard';

export default function ProductList({ onProductClick }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.map(p => (
                <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
            ))}
        </div>
    );
}
