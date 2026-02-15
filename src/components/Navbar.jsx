import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${location.pathname === path
        ? "text-blue-600"
        : "text-gray-600 hover:text-blue-600"
        }`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transform transition-all duration-300 ${location.pathname === path
          ? "scale-x-100"
          : "scale-x-0 group-hover:scale-x-100"
          } origin-left`}
      />
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-lg bg-white/70 shadow-md"
        : "bg-white/50 backdrop-blur"
        } border-b border-gray-200`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        {/* LOGO */}
        <Link to="/" className="flex flex-row items-center justify-center leading-none group">
          <img
            src="/favicon.png"
            alt="logo"
            className="w-10 "
          />
          <div className="flex flex-col leading-none group">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Note</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                X
              </span>
            </span>

            <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition">
              Your Digital Notebook
            </span>
          </div>

        </Link>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/notes", "Notes")}
          {navLink("/trash", "Trash")}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {!token ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-md bg-blue-600 text-white text-md font-medium hover:bg-blue-700 transition-all shadow-md"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-all duration-200"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name (optional — remove if you want super minimal) */}
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>

                {/* Arrow */}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${dropdown ? "rotate-180" : ""
                    }`}
                />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-4 animate-fadeIn">

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="h-[1px] bg-gray-100"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-red-500 hover:text-red-600 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {navLink("/", "Home")}
          {navLink("/notes", "Notes")}
          {navLink("/trash", "Trash")}
        </div>
      )}
    </header>
  );
};

export default Navbar;


