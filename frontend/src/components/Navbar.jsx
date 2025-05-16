import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-semibold text-gray-800">EduPayout</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-500">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-500">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-500">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
         <Link to="/login" className=" nav-item text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              Log In
            </Link>
            <Link to="/signup" className="nav-item text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

  )
}

export default Navbar