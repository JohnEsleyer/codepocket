import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="flex flex-col pt-32 items-center h-screen w-screen bg-slate-700  ">
      <a href='/'><h1 className="text-2xl font-bold text-white">CodePocket</h1></a>
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-4 text-white">Stop Memorizing Code</h2>
        <p className="text-white text-lg">Fetch Your Code Snippets Anytime, Anywhere</p>
        <div>
            <button className="text-xl font-bold bg-white rounded-full p-2 mt-4">
                <a href="/register">Start now</a>
            </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
