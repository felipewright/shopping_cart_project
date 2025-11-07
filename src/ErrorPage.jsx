import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center h-full bg-gray-950 text-gray-100">
            <h2 className="text-7xl font-semibold mb-4 tracking-wide text-purple-400">We couldn’t load this page.</h2>
            <Link to="/" className="text-5xl text-gray-300">Click here to return home.</Link>
        </div>
    )
}

export default ErrorPage;