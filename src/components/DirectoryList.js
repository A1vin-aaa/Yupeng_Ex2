// src/components/DirectoryList.js
import React from 'react';

export default function DirectoryList({ directories, onSelect }) {
    return (
        <div style={{ padding: 20 }}>
            <h3>Directories</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {directories.map(dir => (
                    <li key={dir.id} style={{ margin: '8px 0' }}>
                        <button
                            onClick={() => onSelect(dir)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                border: '1px solid #888',
                                borderRadius: 4,
                                background: '#f0f0f0'
                            }}
                        >
                            {dir.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
