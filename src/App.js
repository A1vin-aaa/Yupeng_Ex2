// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetailModal from './components/ProductDetailModal';
import Cart from './components/Cart';
import DirectoryList from './components/DirectoryList';
import DirectoryMessageModal from './components/DirectoryMessageModal';

import products from './data/products';
import directories from './data/directories';

function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems]         = useState([]);
    const [selectedDirectory, setSelectedDirectory] = useState(null);

    const handleAddToCart = product => {
        setCartItems(prev => [...prev, product]);
        setSelectedProduct(null);
    };

    return (
        <div>
            <Header cartCount={cartItems.length} />

            {/* Shop Section */}
            <ProductList products={products} onProductClick={setSelectedProduct} />
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAdd={handleAddToCart}
                />
            )}
            <Cart items={cartItems} />

            {/* Directory Browser Section */}
            <DirectoryList directories={directories} onSelect={setSelectedDirectory} />
            <DirectoryMessageModal
                directory={selectedDirectory}
                products={products}
                onClose={() => setSelectedDirectory(null)}
            />
        </div>
    );
}

export default App;
