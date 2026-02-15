import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully");
      navigate("/notes");
    } else {
      toast.error(result.payload?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/bgImg.jpg')" }}
    >
      <div className="w-[1100px] h-[600px] bg-white rounded-xl shadow-xl flex overflow-hidden">
        {/* Left part */}
        <div className="w-1/2 flex flex-col justify-center px-14">
          <div className="flex justify-center items-center text-green-600 text-3xl font-bold">
            <img
            src="/NotexPNG.png"
            alt="logo"
            className="w-[20%]"
          />
          </div>

          <h1 className="text-3xl font-semibold mb-2">
            Welcome to NoteX!
          </h1>

          <p className="text-gray-600 mb-6">
            Sign up and start taking your notes.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {loading ? "Creating..." : "Continue"}
          </button>

          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <div className="flex gap-4 mb-4">
            <button className="flex-1 border py-3 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50">
              <FcGoogle size={17} />
              Continue with Google
            </button>

            <button className="flex-1 border py-3 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50">
              <FaApple size={17} />
              Continue with Apple
            </button>
          </div>

        

          <p className="mt-3 mb-5 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
        {/* Right part */}
        <div className="w-1/2 flex items-center justify-center">
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

export default SignUp;
