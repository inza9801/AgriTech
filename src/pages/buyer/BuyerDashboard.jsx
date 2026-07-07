import "./css/BuyerDashboard.css";

const BuyerDashboard = () => {

    const recentOrders = [
        { id: "ORD-1001", product: "Premium Rice", farmer: "Green Valley Farm", status: "Delivered", total: "৳12,500" },
        { id: "ORD-1002", product: "Fresh Tomatoes", farmer: "Sunrise Farm", status: "Shipping", total: "৳4,300" },
        { id: "ORD-1003", product: "Organic Potatoes", farmer: "Agro Life", status: "Pending", total: "৳8,200" }
    ];

    const featuredProducts = [
        { name: "Premium Rice", price: "৳55/kg", stock: "2500 kg" },
        { name: "Organic Tomato", price: "৳75/kg", stock: "800 kg" },
        { name: "Fresh Mango", price: "৳140/kg", stock: "1200 kg" }
    ];

    return (
        <div className="buyerDashboard">

            <h1>Buyer Dashboard</h1>

            <div className="summaryGrid">
                <div className="summaryCard"><h3>Total Orders</h3><h2>145</h2></div>
                <div className="summaryCard"><h3>Pending Deliveries</h3><h2>8</h2></div>
                <div className="summaryCard"><h3>Completed Orders</h3><h2>137</h2></div>
                <div className="summaryCard"><h3>Saved Products</h3><h2>22</h2></div>
            </div>

            <div className="dashboardGrid">

                <div className="ordersSection">
                    <h2>Recent Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Farmer</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.product}</td>
                                    <td>{order.farmer}</td>
                                    <td>
                                        <span className={`status ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="rightPanel">

                    <div className="quickActions">
                        <h2>Quick Actions</h2>
                        <button>Browse Marketplace</button>
                        <button>Track Orders</button>
                        <button>Go To Cart</button>
                        <button>Payments</button>
                    </div>

                    <div className="featuredProducts">
                        <h2>Featured Products</h2>
                        {featuredProducts.map((product, index) => (
                            <div className="productCard" key={index}>
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                                <p>Stock : {product.stock}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default BuyerDashboard;
