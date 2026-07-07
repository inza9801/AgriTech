import "./css/BuyerNavbar.css";

const BuyerNavbar = () => {
    return (

        <header className="buyerNavbar">

            <div className="navbarLeft">
                <h2>Buyer Dashboard</h2>
            </div>

            <div className="navbarCenter">
                <input type="text" placeholder="Search products..." />
            </div>

            <div className="navbarRight">

                <button className="iconBtn">🔔</button>

                <button className="iconBtn">🛒</button>

                <div className="buyerProfile">
                    <img src="https://i.pravatar.cc/40" alt="Buyer" />
                    <span>Buyer</span>
                </div>

            </div>

        </header>

    );
};

export default BuyerNavbar;
