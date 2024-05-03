'use client'

import { useEffect, useRef, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import { testCollections, testSnippets } from "./testdata";
import CodeBlock from "./codeblock";
import Loading from "/public/loading.svg";
import Image from "next/image";

interface Collection {
    id: number;
    title: string;
    description: string;

}

interface Snippet {
    id: number;
    title: string;
    collection_id: number;
    code: string;
    language: string;
    description: string;
}

export default function Home() {

    const scrollableDiv = useRef<HTMLDivElement>(null);

    const [collections, setCollections] = useState<Collection[]>(testCollections)
    const [snippets, setSnippets] = useState<Snippet[]>(testSnippets);
    const [orientation, setOrientation] = useState<string>('');
    const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

    // Loading indicator states
    const [loadingAddCollection, setLoadingAddCollection] = useState(false);
    const [loadingAddSnippet, setLoadingAddSnippet] = useState(false);


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

    const scrollToBottom = () => {
        if (scrollableDiv.current){
            scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
        }
    }

    const handleAddCollection = async () => {
        setLoadingAddCollection(true);
    
        
        setCollections([...collections, {
            id: collections.length + 1,
            title: "Collection " + collections.length + 1,
            description: "Description"
        }]);

  
        setTimeout(() => {
            setLoadingAddCollection(false);
        }, 1000);
    };

    const handleAddSnippet = async () => {
        
        setLoadingAddSnippet(true);
        
        setSnippets([...snippets, {
            id: snippets.length + 1,
            title: "Snippet " + snippets.length + 1,
            collection_id: 1,
            code: ``,
            language: "Python",
            description: "Description"
        }]);

  
        setTimeout(() => {
            setLoadingAddSnippet(false);
            scrollToBottom();
        }, 1000);
        
    };




    return (
        <ProtectedPage>
            <div className="bg-gray-200 text-black h-screen flex font-sans">
                <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col`}>
                    <div className="shadow">
                        <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
                        <div className="pt-4 pb-2 flex flex-col">
                            {/* // Search */}
                            <button className="p-1 hover:bg-gray-400">
                                <p className="flex items-center pl-2 ">
                                    <span className="material-symbols-outlined">
                                        search
                                    </span>Search
                                </p>
                            </button>
                            {/* // Settings */}
                            <button className="p-1 hover:bg-gray-400">
                                <p className="flex items-center pl-2 ">
                                    <span className="material-symbols-outlined">
                                        settings
                                    </span>Settings
                                </p>
                            </button>
                            {/* // Signout */}
                            <button className="p-1 hover:bg-gray-400">
                                <p className="flex items-center pl-2">
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>Sign out
                                </p>
                            </button>
                            {/* // Add a collection Button */}
                            <button 
                            className="flex-initial pl-2 hover:bg-gray-400" 
                            onClick={handleAddCollection}
                            >
                                <span className="flex items-center">
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                    Add a collection
                                    {loadingAddCollection && <span className="pl-2">
                                        <Image 
                                            src={Loading}
                                            alt={''}
                                            width={30}
                                            height={30}
                                        />
                                    </span>}
                                </span>
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-col overflow-y-auto pl-2">
                        {/* <p className="flex-initial">Collections</p> */}
                        {/* // Collections */}
                        {collections.map((value, index) => (
                            <button 
                            key={index}
                            className="flex justify-start"
                            onClick={() => {
                                setActiveCollection(value);
                            }}
                            >
                                <div className="w-full flex text-xl pl-2 hover:bg-gray-800 hover:text-white hover:rounded">
                                    <p>{value.title}</p>
                                </div>
                            </button>

                        ))}


                    </div>
                    {/* // End of collections */}
                </div>
                {/* // Code Snippets Section */}
                <div className="flex-1 flex flex-col">
                    <div className="p-2 shadow">
                        <p className="text-2xl font-bold flex"><span>{activeCollection?.title}</span>{loadingAddSnippet && <span className="pl-2">
                                        <Image 
                                            src={Loading}
                                            alt={''}
                                            width={30}
                                            height={30}
                                        />
                                    </span>} </p> 
                        {/* // New code snippet */}
                        <div className="flex space-x-4">
                        <button 
                            className="hover:bg-gray-400 rounded"
                            onClick={handleAddSnippet}
                            >
                            <div className="flex w-44 flex items-center">

                                <span className="text-2xl material-symbols-outlined">
                                    add
                                </span>
                                <span className="flex items-center ">New code snippet </span>

                            </div>
                        </button>
                        {/* // Share collection */}
                        <button className="hover:bg-gray-400 rounded ">
                            <div className="flex w-20 flex items-center">

                                <span className="text-2xl material-symbols-outlined">
                                    share
                                </span>
                                <span className="flex items-center">Share</span>

                            </div>
                        </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-wrap overflow-y-auto" ref={scrollableDiv}>
                        {snippets.map((value, index) => (
                            <div>
                                {
                                    value.collection_id == activeCollection?.id &&
                                     <div key={index} className="m-2 h-80 fade-in visible">
                                     <form className="flex flex-col">
                                         <input 
                                             className="text-2xl bg-gray-200"
                                             name="title"
                                             type="text"
                                             disabled={false}
                                             value={value.title}
                                             onChange={(event) => {
                                                 setSnippets((prevItems) =>
                                                     prevItems.map((item) => (item.id === value.id ? { ...item, title: event.target.value} : item))
                                                   );
                                             }}
                                         />
                                         <input
                                             className="bg-gray-200"
                                             name="description"
                                             type="text"
                                             value={value.description}
                                             onChange={(event) => {
                                                 setSnippets((prevItems) =>
                                                     prevItems.map((item) => (item.id === value.id ? { ...item, description: event?.target.value} : item))
                                                   );
                                             }}
                                         />
                                     </form>
                                   
                                     <div className="h-60 overflow-x-hidden rounded-2xl ">
                                         <CodeBlock codeValue={value.code} onCodeChange={(codeValue) => {
                                             console.log(codeValue);
                                              setSnippets((prevItems) =>
                                                 prevItems.map((item) => (item.id === value.id ? { ...item, code: codeValue} : item))
                                               );
                                         }}/>
                                     </div>
     
                                 </div>
                                }
                            </div>
                           
                        ))}
                    </div>
                </div>
                {/* // End Code Snippets Section */}
            </div>
        </ProtectedPage>
    );
}