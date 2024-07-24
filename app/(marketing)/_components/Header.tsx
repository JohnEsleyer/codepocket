import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-300  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CodePocket</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/login" className="hover:underline">Sign In</a></li>
            <li><a href="/register" className="hover:underline">Sign Up</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
