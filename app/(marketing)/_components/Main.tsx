import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="flex-1 p-4 ">
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold mb-4">Stop Memorizing Code</h2>
        <p className="text-lg">Fetch Your Snippets Anytime, Anywhere</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">Supports Many Programming Languages</h3>
          <p>Supports a wide array of programming languages such as Python, JavaScript, Java, C++ TypeScript, and many more.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">Free and Open Source</h3>
          <p>CodePocket is completely free to use and open source. This means you can access all our features without any cost.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">Share your code online</h3>
          <p>Create shareable links for other people to see your code snippets.</p>
        </div>
      </section>
    </div>
  );
}

export default Main;
