import "./css/MarketplaceHome.css";

const MarketplaceHome = () => {

    const products = [
        { id: 1, name: "Premium Rice", farmer: "Green Valley Farm", location: "Gazipur", price: "৳55/kg", quality: "Grade A", organic: true, stock: "2500 kg" },
        { id: 2, name: "Organic Tomato", farmer: "Fresh Agro", location: "Jessore", price: "৳70/kg", quality: "Grade A", organic: true, stock: "900 kg" },
        { id: 3, name: "Potato", farmer: "Agri Farm", location: "Rangpur", price: "৳35/kg", quality: "Grade B", organic: false, stock: "5000 kg" },
        { id: 4, name: "Mango", farmer: "Rajshahi Orchard", location: "Rajshahi", price: "৳140/kg", quality: "Premium", organic: true, stock: "1200 kg" },
        { id: 5, name: "Corn", farmer: "Golden Harvest", location: "Dinajpur", price: "৳42/kg", quality: "Grade A", organic: false, stock: "3200 kg" },
        { id: 6, name: "Wheat", farmer: "North Bengal Farm", location: "Bogura", price: "৳48/kg", quality: "Grade A", organic: false, stock: "4200 kg" }
    ];

    return (
        <div className="marketplace">

            <h1>Marketplace</h1>

            <div className="searchBar">
                <input type="text" placeholder="Search crops..." />
                <button>Search</button>
            </div>

            <div className="filterBar">
                <select><option>Category</option><option>Rice</option><option>Vegetables</option><option>Fruits</option></select>
                <select><option>Price</option><option>Low to High</option><option>High to Low</option></select>
                <select><option>Location</option><option>Dhaka</option><option>Rajshahi</option><option>Khulna</option></select>
                <select><option>Quality</option><option>Premium</option><option>Grade A</option><option>Grade B</option></select>
                <select><option>Organic</option><option>Yes</option><option>No</option></select>
            </div>

            <div className="categorySection">
                <h2>Browse Categories</h2>
                <div className="categoryGrid">
                    <div className="categoryCard">🌾<span>Rice</span></div>
                    <div className="categoryCard">🍅<span>Vegetables</span></div>
                    <div className="categoryCard">🥭<span>Fruits</span></div>
                    <div className="categoryCard">🌽<span>Grains</span></div>
                    <div className="categoryCard">🫘<span>Pulses</span></div>
                    <div className="categoryCard">🌿<span>Organic</span></div>
                </div>
            </div>

            <div className="productGrid">
                {products.map((product) => (
                    <div className="marketCard" key={product.id}>
                        <div className="imagePlaceholder">🌾</div>
                        <h2>{product.name}</h2>
                        <p><strong>Farmer:</strong> {product.farmer}</p>
                        <p><strong>Location:</strong> {product.location}</p>
                        <p><strong>Price:</strong> {product.price}</p>
                        <p><strong>Quality:</strong> {product.quality}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        {product.organic && <span className="organicBadge">Organic</span>}
                        <button>View Details</button>
                    </div>
                ))}
            </div>

            <div className="trendingSection">
                <h2>Trending Products</h2>
                <div className="trendingGrid">
                    <div className="trendCard">🌾 Premium Rice<p>Most Ordered This Week</p></div>
                    <div className="trendCard">🍅 Organic Tomato<p>Highest Rated</p></div>
                    <div className="trendCard">🥭 Fresh Mango<p>Seasonal Bestseller</p></div>
                </div>
            </div>

            <div className="marketStats">
                <div className="statCard"><h3>Products</h3><h2>520+</h2></div>
                <div className="statCard"><h3>Farmers</h3><h2>140</h2></div>
                <div className="statCard"><h3>Organic Products</h3><h2>210</h2></div>
                <div className="statCard"><h3>Today's Deals</h3><h2>35</h2></div>
            </div>

        </div>
    );
};

export default MarketplaceHome;
