import "./css/ProductDetail.css";

const ProductDetail = () => {
    return (
        <div className="productDetail">

            <div className="productContainer">

                <div className="productImages">
                    <div className="mainImage">🌾</div>
                    <div className="imageGallery">
                        <div className="galleryImage">🌾</div>
                        <div className="galleryImage">🌾</div>
                        <div className="galleryImage">🌾</div>
                        <div className="galleryImage">🌾</div>
                    </div>
                </div>

                <div className="productInfo">

                    <h1>Premium Rice</h1>

                    <div className="rating">⭐⭐⭐⭐⭐ (4.9)</div>

                    <h2>৳55 / kg</h2>

                    <p>
                        Premium quality rice harvested directly from
                        Green Valley Farm. Naturally grown and carefully
                        processed for superior taste.
                    </p>

                    <table>
                        <tbody>
                            <tr><td>Stock</td><td>2500 kg</td></tr>
                            <tr><td>Harvest Date</td><td>28 June 2026</td></tr>
                            <tr><td>Quality</td><td>Grade A</td></tr>
                            <tr><td>Location</td><td>Gazipur, Dhaka</td></tr>
                            <tr><td>Organic</td><td>Yes</td></tr>
                        </tbody>
                    </table>

                    <div className="quantity">
                        <label>Quantity</label>
                        <input type="number" min="1" defaultValue="100" />
                        <span>kg</span>
                    </div>

                    <div className="actionButtons">
                        <button className="cartBtn">Add To Cart</button>
                        <button className="buyBtn">Buy Now</button>
                    </div>

                </div>

            </div>

            <div className="farmerCard">
                <h2>Farmer Profile</h2>
                <table>
                    <tbody>
                        <tr><td>Farm Name</td><td>Green Valley Farm</td></tr>
                        <tr><td>Farmer</td><td>Md. Hasan</td></tr>
                        <tr><td>Experience</td><td>12 Years</td></tr>
                        <tr><td>Rating</td><td>4.8 ⭐</td></tr>
                        <tr><td>Verified</td><td>✔ Verified Seller</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="relatedSection">
                <h2>Related Products</h2>
                <div className="relatedGrid">
                    <div className="relatedCard">🌾<h3>Organic Rice</h3><p>৳58/kg</p></div>
                    <div className="relatedCard">🌾<h3>Golden Rice</h3><p>৳60/kg</p></div>
                    <div className="relatedCard">🌾<h3>Premium Wheat</h3><p>৳48/kg</p></div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;
