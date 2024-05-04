'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import { testCollections, testSnippets } from "./testdata";
import CodeBlock from "./codeblock";
import Loading from "/public/loading.svg";
import WhiteLoading from "/public/loadingWhite.svg";
import Image from "next/image";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DropdownMenu from "./dropdownmenu";
import { languages } from "./constants";
import SidebarButton from "./sidebarbutton";
import IconButton from "../components/iconbutton";

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
    const [isFullScreen, setIsFullscreen] = useState(false);
    const [fullScreenSnippet, setFullScreenSnippet] = useState<Snippet>({
        id: 0,
        title: 'untitled',
        collection_id: 0,
        code: '',
        language: 'python',
        description: ''
    });
    const [singleColumn, setSingleColumn] = useState(false);

    // Loading indicator states
    const [loadingAddCollection, setLoadingAddCollection] = useState(false);
    const [loadingAddSnippet, setLoadingAddSnippet] = useState(false);





    useEffect(() => {
        const checkOrientation = () => {
          
            const screenRatio = window.innerWidth / window.innerHeight;

            if (screenRatio > 1){
                setOrientation('Landscape');
            }else{
                setOrientation('Portrait');
            }

            console.log(window.innerWidth);
            if (window.innerWidth < 850){
                console.log("single");
                setSingleColumn(true)
            }else{
                console.log("double");
                setSingleColumn(false);
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
        if (scrollableDiv.current) {
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
            collection_id: activeCollection?.id as number,
            code: ``,
            language: "python",
            description: "Description"
        }]);


        setTimeout(() => {
            setLoadingAddSnippet(false);
            scrollToBottom();
        }, 1000);

    };


    if (isFullScreen) {
        return (
            <ProtectedPage>
                <div >
                    <div className="p-2 bg-white">
                        <IconButton icon="close_fullscreen" text="Close full screen" onClick={() => {
                            setIsFullscreen(false);

                        }} />
                    </div>
                    <CodeBlock
                        full={true}
                        codeValue={fullScreenSnippet.code}
                        language={fullScreenSnippet?.language == null ? '' : fullScreenSnippet.language}
                        onCodeChange={(codeValue) => {
                            setSnippets((prevItems) =>
                                prevItems.map((item) => (item.id === fullScreenSnippet?.id ? { ...item, code: codeValue } : item))
                            );
                            setFullScreenSnippet((value) => {
                                return {
                                    ...value,
                                    code: codeValue,
                                }
                            });
                      
                        }} />
                </div>
            </ProtectedPage>
        );
    }


    return (
        <ProtectedPage>
            <div className="bg-gray-200 text-black h-screen flex font-sans">
                <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col border-r border-black`}>
                    <div className="shadow">
                        <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
                        <div className="pt-4 pb-2 flex flex-col">
                            {/* // Search */}
                            <SidebarButton icon="search" text="Search" />
                            {/* // Settings */}
                            <SidebarButton icon="settings" text="Settings" />
                            {/* // Signout */}
                            <SidebarButton icon="logout" text="Sign out" />
                            {/* // Add a collection Button */}
                            <SidebarButton
                                icon="add"
                                text="Add a collection"
                                onClick={handleAddCollection}
                                loading={loadingAddCollection}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col overflow-y-auto pl-2">
                        {/* // Collections */}
                        {collections.map((value, index) => (
                            <button
                                key={index}
                                className="flex justify-start"
                                onClick={() => {
                                    setActiveCollection(value);
                                }}
                            >
                                <div className="w-full flex text-xl pl-2 hover:bg-neutral-900 hover:text-white hover:rounded">
                                    <p>{value.title}</p>
                                </div>
                            </button>

                        ))}


                    </div>
                    {/* // End of collections */}
                </div>
                {/* // Left Section */}
                <div className="flex-1 flex flex-col">
                    <div className="p-2 border-b border-black bg-neutral-900  text-white ">
                        <p className="text-2xl font-bold flex"><span>{activeCollection?.title}</span>{loadingAddSnippet && <span className="pl-2">
                            <Image
                                src={WhiteLoading}
                                alt={''}
                                width={30}
                                height={30}

                            />
                        </span>} </p>

                        <div className="flex space-x-4">
                            {/* // New code snippet */}
                            <IconButton icon="add" text="New code snippet" onClick={handleAddSnippet} isDark={true} />
                            {/* // Share collection */}
                            <IconButton icon="share" text="Share" isDark={true} />
                        </div>
                    </div>

                    {/* // Snippets Section */}
                    <div className={`flex-1 bg-gray-300 grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-2'} p-2 gap-2 overflow-y-auto justify-center`} ref={scrollableDiv}>
                        {snippets.map((value, index) => (
                            <>
                                { value.collection_id == activeCollection?.id &&
                                    <div key={index} className="bg-gray-200 border border-black rounded h-96">

                                        <div key={index} className="m-2 ">
                                            <form className="flex flex-col">
                                                {/* // Snippet's Title */}
                                                <input
                                                    className="text-2xl bg-gray-200"
                                                    name="title"
                                                    type="text"
                                                    disabled={false}
                                                    value={value.title}
                                                    onChange={(event) => {
                                                        setSnippets((prevItems) =>
                                                            prevItems.map((item) => (item.id === value.id ? { ...item, title: event.target.value } : item))
                                                        );
                                                    }}
                                                />
                                                {/* // Snippet's Description */}
                                                <textarea
                                                    className="bg-gray-200 w-full"
                                                    name="description"


                                                    maxLength={110}
                                                    value={value.description}
                                                    onChange={(event) => {
                                                        setSnippets((prevItems) =>
                                                            prevItems.map((item) => (item.id === value.id ? { ...item, description: event?.target.value } : item))
                                                        );
                                                    }}
                                                />


                                            </form>
                                            <div className="flex justify-end items-center space-x-2">
                                                <div className="hover:bg-gray-300 rounded">
                                                <DropdownMenu buttonText={value.language} >

                                                    <div className="h-44 grid grid-cols-1 w-24 bg-gray-200 overflow-y-auto">
                                                        {languages.map((lang, index) => (
                                                            <button key={index} onClick={() => {
                                                                setSnippets((prevItems) =>
                                                                    prevItems.map((item) => (item.id === value.id ? { ...item, language: lang } : item))
                                                                );
                                                            }}><p className=" hover:bg-gray-300 p-1">{lang}</p></button>
                                                        ))}
                                                    </div>
                                                </DropdownMenu>
                                                </div>
                                                <IconButton icon="open_in_full" text="Full screen" onClick={() => {
                                                    setIsFullscreen(true);
                                                    setFullScreenSnippet(value);
                                                }} />
                                                <IconButton icon="delete" text="Delete" onClick={() => {
                                                    setSnippets((prevItems) => {
                                                        return prevItems.filter((item, index2) => index2 !== index)
                                                    });
                                                }} />
                                                <CopyToClipboard text={value.code} onCopy={() => { }}>
                                                    <IconButton icon="content_copy" text="Copy" />
                                                </CopyToClipboard>
                                            </div>


                                            <div className="h-60 overflow-x-hidden rounded-2xl ">
                                                <CodeBlock codeValue={value.code} language={value.language} onCodeChange={(codeValue) => {
                                                    console.log(codeValue);
                                                    setSnippets((prevItems) =>
                                                        prevItems.map((item) => (item.id === value.id ? { ...item, code: codeValue } : item))
                                                    );
                                                }} />
                                            </div>

                                        </div>

                                    </div>
                                }
                            </>
                        ))}
                    </div>
                </div>
                {/* // End Code Snippets Section */}
            </div>
        </ProtectedPage>
    );
}