const Item = ({ item, onDelete }) => {
    return (
        <div className="item">
            <div className="item-details">
                <h3>{item.name}</h3>
                <p>Status: {item.status}</p>
                <p>Location: {item.location}</p>
            </div>
            <div className="item-actions">
                <button 
                    onClick={onDelete}
                    className="delete-btn"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Item;
