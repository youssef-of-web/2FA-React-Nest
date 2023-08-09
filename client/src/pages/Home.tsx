import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">
            Welcome to 2FA Tutorial
          </h1>
          <p className="mb-6">Please select an option:</p>
          <div className="flex space-x-4">
            <Link to={"/login"}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Sign In
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
