'use client'

import { useEffect, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import { testCollections, testSnippets } from "./testdata";

import MarkdownPreview from '@uiw/react-markdown-preview';


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
      
          window.addEventListener('resize', resizeListener);
      
          return () => {
            window.removeEventListener('resize', resizeListener);
          };
    }, []);
    
 
    return (
        <ProtectedPage>
            <div className="bg-gray-200 text-black h-screen flex font-sans">
                <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col`}>
                    <div className="shadow p-2">
                    <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
                    <p className="flex items-center pl-4"> <span className="material-symbols-outlined">
                                    settings
                                </span>Settings</p>
                    </div>
                   
                    <div className="flex pl-2 flex flex-col overflow-y-auto pl-4">
                        {/* <p className="flex-initial">Collections</p> */}
                        {/* // Collections */}
                        {collections.map((value, index) => (
                            <div className="text-2xl">
                                <button>
                                    <p>{value.title}</p>
                                </button>
                            </div>
                        ))}

                        {/* // Add a collection Button */}
                        <button className="flex-initial" >
                            <span className="flex items-center">
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                Add a collection
                            </span>
                        </button>
                        {/* // End of Add a collection Button */}
                    </div>
                    {/* // End of collections */}
                </div>

                <div className="flex-1 bg-gray-300 p-2 overflow-y-auto">
                        <p className="text-2xl font-bold">Collection name</p>
                        <div className=" flex flex-wrap">
                        {snippets.map((value, index) => (
                            <div className="m-2 w-80 h-80 p-4">
                                <p className="text-2xl">{value.title}</p>
                                <MarkdownPreview 
                                    style={{padding:2}}
                                    source={value.code}
                                />
                               
                            </div>
                        ))}
                        </div>
                        
                </div>
            </div>
        </ProtectedPage>
    );
}