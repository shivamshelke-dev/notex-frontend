import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful");
      navigate("/notes");
    } else {
      toast.error(
        resultAction.payload?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: "url('/bgImg.jpg')" }}
    >
      <div className="w-[1100px] h-[600px] bg-white rounded-xl shadow-xl flex overflow-hidden text-center">

        {/* LEFT */}
        <div className="w-1/2 flex flex-col justify-center px-14">
          <div className="text-black-600 text-3xl font-bold mb-6">
            <div className="flex justify-center items-center text-black-600 text-3xl font-bold">
              <img
                src="/NotexPNG.png"
                alt="logo"
                className="w-[20%]"
              />
            </div>
            Note<span className="text-blue-700">X</span>
          </div>

          <h1 className="text-3xl font-semibold mb-6">
            Welcome Back!
          </h1>

          

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 flex items-center justify-center bg-[#f8f8f8]">
          <img
            src="/sign up image.svg"
            alt="illustration"
            className="w-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
