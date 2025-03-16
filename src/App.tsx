import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { LogOut, GamepadIcon, User, Github, Linkedin, Twitter } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game1 from './pages/Game1';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';
import Profile from './components/Profile';

function App() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo & Title */}
              <div className="flex items-center">
                <GamepadIcon className="h-8 w-8 text-purple-400" />
                <Link to="/" className="ml-2 text-xl font-bold text-purple-300 hover:text-purple-200">
                  Mini Games
                </Link>
              </div>

              {/* Navbar Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-purple-200"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col items-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/game1" element={<Game1 />} />
            <Route path="/game2" element={<Game2 />} />
            <Route path="/game3" element={<Game3 />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-400 mb-6">
                    "Play. Compete. Win. Repeat!" 🎮🔥
                  </h1>
                  <p className="text-gray-300 mb-8 text-lg">
                    Challenge yourself with exciting mini-games and test your skills!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
                    <Link
                      to="/game1"
                      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 flex flex-col items-center"
                    >
                      <img src="/images/rock-paper-scissors.png" alt="Game 1" className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h2 className="text-xl font-bold mb-2 text-purple-300">Rock Paper Scissors</h2>
                      <p className="text-gray-400">Click to play</p>
                    </Link>
                    <Link
                      to="/game2"
                      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 flex flex-col items-center"
                    >
                      <img src="/images/man.png" alt="Game 2" className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h2 className="text-xl font-bold mb-2 text-purple-300">SuperHero Cards</h2>
                      <p className="text-gray-400">Click to play</p>
                    </Link>
                    <Link
                      to="/game3"
                      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 flex flex-col items-center"
                    >
                      <img src="https://raw.githubusercontent.com/Mahendran8080/Mini-Games/refs/heads/main/images/game.png" alt="Game 3" className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h2 className="text-xl font-bold mb-2 text-purple-300">Memory Match</h2>
                      <p className="text-gray-400">Click to play</p>
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} Mini Games.Developed my Mahendran</p>

              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/Mahendran8080?tab=overview&from=2024-12-01&to=2024-12-31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mahendran-d-36b703259/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                
              </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="/" className="hover:text-purple-400 text-sm">Home</Link>
                <Link to="/profile" className="hover:text-purple-400 text-sm">Profile</Link>
                <Link to="/login" className="hover:text-purple-400 text-sm">Login</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
