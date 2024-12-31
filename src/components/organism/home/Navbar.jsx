import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-gray-800 text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">AozoraNime</h1>
            <form className="flex space-x-2">
                <input type="text" className="border border-gray-300 rounded px-2 py-1" placeholder="Search..."/>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Search</button>
            </form>
            <div>
                
            </div>
            <nav className="space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Login</Link>
                <Link to="/bookmark" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded">Bookmark</Link>
            </nav>
        </div>
    </header>
  )
}

export default Navbar
