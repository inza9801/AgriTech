import { Link } from "react-router-dom";
import "./css/NotFound.css";

function NotFound() {

    return (

        <div className="notFound">

            <div className="notFoundCard">

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>

                    Sorry, the page you are looking for does not exist
                    or has been moved.

                </p>

                <Link
                    to="/"
                    className="homeButton"
                >

                    Go Back to Dashboard

                </Link>

            </div>

        </div>

    );

}

export default NotFound;