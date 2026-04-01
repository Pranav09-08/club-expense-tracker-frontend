import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="text-center space-y-8 max-w-xl p-8 rounded-3xl shadow-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md">
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-pink-400 shadow-lg">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14" />
            </svg>
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">
          Club Expense Tracker
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Effortlessly manage your club's finances, track expenses, and empower your team with transparency and control.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-gradient-to-tr from-blue-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-pink-600 transition-transform duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border border-blue-400 text-blue-600 font-semibold bg-white/70 dark:bg-black/40 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}