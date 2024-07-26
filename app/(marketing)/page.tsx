
'use client'
import CodePocketScreenshot from '/public/codepocket.png';
import Image from 'next/image';

const Home: React.FC = () => {

  return (
   
      <div className="flex flex-col pt-20 items-center w-screen bg-slate-700 h-screen overflow-auto ">
        <a href='/'><h1 className="text-2xl font-bold text-white">CodePocket</h1></a>
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-4 text-white">Stop Memorizing Code</h2>
          <p className="text-white text-lg">Fetch Your Code Snippets Anytime, Anywhere</p>
          <div>
            <button className="text-xl font-bold bg-white rounded-full p-2 mt-4">
              <a href="/register">Try it now</a>
            </button>
            <div className="flex justify-center">
            <a className="underline flex justify-center text-white p-2" href="/login">
              Login
            </a>
            </div>
          </div>
          <div className="flex justify-center">
          <div className="rounded p-2 lg:w-1/2  bg-slate-300">
            <Image 
              src={CodePocketScreenshot} 
              width={1920} 
              height={820} 
              alt="CodePocket"
              />
          </div>
          </div>
         
        </div>
      </div>
  );
}

export default Home;
