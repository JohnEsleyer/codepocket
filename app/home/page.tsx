'use client'

import { useEffect, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import { testCollections, testSnippets } from "./testdata";
import CodeBlock from "./codeblock";


interface Collection {
    id: number;
    title: string;
    description: string;

}

interface Snippet{
    id: number;
    title: string;
    code: string;
    language: string;
    description: string;
}

export default function Home() {

    const [collections, setCollections] = useState<Collection[]>(testCollections)
    const [snippets, setSnippets] = useState<Snippet[]>(testSnippets);
    const [orientation, setOrientation] = useState<string>('');
    const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

    useEffect(() => {
        const checkOrientation = () => {
            if (window.matchMedia("(orientation: portrait)").matches) {
              setOrientation('Portrait');
            } else if (window.matchMedia("(orientation: landscape)").matches) {
              setOrientation('Landscape');
            }
          };

          checkOrientation();

          const resizeListener = () => {
            checkOrientation();
          };
      


            // Set the first collection as the default active collection
        setActiveCollection(collections[0]);

          window.addEventListener('resize', resizeListener);
      
          return () => {
            window.removeEventListener('resize', resizeListener);
          };
          
         
         
    }, []);
    
 
    

    return (
        <ProtectedPage>
            <div className="bg-gray-200 text-black h-screen flex font-sans">
                <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col`}>
                    <div className="shadow">
                    <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
                    <div className="pt-4 flex flex-col">
                        <button className="p-1">
                        <p className="flex items-center pl-2 "> 
                        <span className="material-symbols-outlined">
                                        search
                                    </span>Search
                        </p>
                        </button>
                        <button className="p-1">
                        <p className="flex items-center pl-2 "> 
                        <span className="material-symbols-outlined">
                                        settings
                                    </span>Settings
                        </p>
                        </button>
                        <button className="p-1">
                        <p className="flex items-center pl-2"> 
                        <span className="material-symbols-outlined">
                                        logout
                        </span>Sign out
                        </p>
                        </button>
                         {/* // Add a collection Button */}
                         <button className="flex-initial pl-2" >
                            <span className="flex items-center">
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                Add a collection
                            </span>
                        </button>
                        {/* // End of Add a collection Button */}
                    </div>
                   
                    </div>
                   
                    <div className="flex flex flex-col overflow-y-auto pl-2">
                        {/* <p className="flex-initial">Collections</p> */}
                        {/* // Collections */}
                        {collections.map((value, index) => (
                            <div className="text-xl pl-2 hover:bg-gray-800 hover:text-white hover:rounded">
                                <button>
                                    <p>{value.title}</p>
                                </button>
                            </div>
                        ))}

                       
                    </div>
                    {/* // End of collections */}
                </div>
                {/* // Code Snippets Section */}
                <div className="flex-1 overflow-y-auto">
                        <div className=" p-2 shadow">
                        <p className="text-2xl font-bold">{activeCollection?.title}</p>
                        <button>
                        <div className="flex w-44 flex items-center">
                            
                            <span className="text-2xl material-symbols-outlined">
                                        add
                            </span>
                            <span className="flex items-center">New code snippet</span>
                        
                        </div>
                        </button>
                        <button>
                        <div className="flex w-44 flex items-center">
                            
                            <span className="text-2xl material-symbols-outlined">
                                        share
                            </span>
                            <span className="flex items-center">Share</span>
                        
                        </div>
                        </button>
                        </div>
                        
                        <div className="flex flex-wrap">
                        {snippets.map((value, index) => (
                            <div className="m-2 h-80 ">
                                <p className="text-2xl">{value.title}</p>
                                <p className="">{value.description}</p>
                                <div className="h-60 overflow-x-hidden rounded-2xl ">
                                <CodeBlock code={value.code}/>
                                </div>
                                
                            </div>
                        ))}
                        </div>
                </div>
                {/* // End Code Snippets Section */}
            </div>
        </ProtectedPage>
    );
}