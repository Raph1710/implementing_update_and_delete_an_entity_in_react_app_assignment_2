import { useState, useEffect } from "react";
import Item from "./Item";

const API_BASE = import.meta.env.VITE_API_URI;

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Try the proxied URL first, if it fails, use the full URL
            try {
                const response = await fetch('/api/doors');
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                    return;
                }
            } catch (proxyError) {
                console.log('Proxy fetch failed, trying direct URL');
            }

            // Fallback to direct URL
            const response = await fetch(`${API_BASE}/doors`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Failed to fetch items: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setError(null);
            // Try the proxied URL first, if it fails, use the full URL
            try {
                const response = await fetch(`/api/doors/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setItems(items.filter(item => item.id !== id));
                    return;
                }
            } catch (proxyError) {
                console.log('Proxy delete failed, trying direct URL');
            }

            // Fallback to direct URL
            const response = await fetch(`${API_BASE}/doors/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            console.error('Delete error:', err);
            setError(`Failed to delete item: ${err.message}`);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={fetchItems} className="retry-btn">Retry</button>
            </div>
        );
    }

    return (
        <div className="item-list">
            {items.length === 0 ? (
                <p>No items found</p>
            ) : (
                items.map((item) => (
                    <Item 
                        key={item.id} 
                        item={item} 
                        onDelete={() => handleDelete(item.id)}
                    />
                ))
            )}
        </div>
    );
};

export default ItemList;
