import { Outlet } from "react-router-dom";

function AuthLayout() {
  console.log("AuthLayout is rendering");
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side (hidden on smaller screens) */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-gray-300">
            Sign in or register to start your shopping journey.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet /> {/* Placeholder for child routes */}
      </div>
    </div>
  );
}

export default AuthLayout;
