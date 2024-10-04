//  RRD
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-page __align-elements pt-5">
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
      <p>
        <Link to="/" className="btn btn-primary">
          Go To Home
        </Link>
      </p>
    </div>
  );
}

export default ErrorPage;
