'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import CodeBlock from "../components/Codeblock";
import WhiteLoading from "/public/loadingWhite.svg";
import Image from "next/image";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { defaultFullscreenSnippet, languages } from "./constants";
import SidebarButton from "./_components/SidebarButton";
import IconButton from "../components/IconButton";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import { Collection, Link, Snippet } from "./types";
import SnippetCard from "./_components/SnippetCard";
import LanguageDropdown from "./_components/LanguageDropdown";
import DeleteCollectionConfirmationOverlayPage from "./_components/(overlay)/DeleteConfirmation";
import MoveOverlayPage from "./_components/(overlay)/MoveOverlayPage";
import SearchOverlayPage from "./_components/(overlay)/SearchOverlayPage";
import SettingsOverlayPageWrapper from "./_components/(overlay)/SettingsOverlayPage";
import ShareOverlayPage from "./_components/(overlay)/ShareOverlayPage";
import SignOutOverlayPage from "./_components/(overlay)/SignOutOverlayPage";
import { fetchAllCollections, fetchAllSnippets } from "./_utility/fetchData";
import { handleDeleteCollection, handleDeleteSnippets } from "./_utility/deleteData";
import { handleUpdateCollectionTitle, handleUpdateSnippetCode, handleUpdateSnippetDescription, handleUpdateSnippetLanguage, handleUpdateSnippetTitle } from "./_utility/updateData";

export default function Home() {

    const router = useRouter();
    const scrollableDiv = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [collections, setCollections] = useState<Collection[]>([])
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [orientation, setOrientation] = useState<string>('');
    const [activeCollection, setActiveCollection] = useState<Collection>();
    const [isFullScreen, setIsFullscreen] = useState(false);
    const [fullScreenSnippet, setFullScreenSnippet] = useState<Snippet>(defaultFullscreenSnippet);
    const [singleColumn, setSingleColumn] = useState(false);
    const [showOverlayMenuPage, setShowOverlayMenuPage] = useState(false);
    const [currentOverlayMenuPage, setCurrentOverlayMenuPage] = useState('search');
    const [selectedSnippetsId, setSelectedSnippetsId] = useState<number[]>([]);
    const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
    const [toDeleteCollection, setToDeleteCollection] = useState<Collection>();
    const [query, setQuery] = useState('');
    const [linkId, setLinkId] = useState('');


    // Loading indicator states
    const [loadingAddCollection, setLoadingAddCollection] = useState(false);
    const [loadingAddSnippet, setLoadingAddSnippet] = useState(false);

    const fetchDbData = async () => {
        fetchAllCollections(setCollections);
        fetchAllSnippets(setSnippets);
    };

    useEffect(() => {
        const checkOrientation = () => {
            const screenRatio = window.innerWidth / window.innerHeight;
            if (screenRatio > 1.150) {
                setOrientation('Landscape');
            } else {
                setOrientation('Portrait');
            }

            if (window.innerWidth < 950) {
                setSingleColumn(true);
            } else {
                setSingleColumn(false);
            }
        };

        checkOrientation();

        const resizeListener = () => {
            checkOrientation();
        };

        fetchDbData();
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

        const { data, error } = await supabase
            .from('collection')
            .insert({
                title: "New Collection",
            }).select();

        if (error) {
            console.log(error);
        } else {
            // console.log(data[0].id);
            setCollections([...collections, {
                id: data[0].id,
                title: data[0].title,
                shared: false,
            }]);

        }


        setTimeout(() => {
            setLoadingAddCollection(false);
        }, 1000);
    };

   
    
    



    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const filtered = snippets.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredSnippets(filtered);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [query]);


    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleAddSnippet = async () => {
        setLoadingAddSnippet(true);

        const { data, error } = await supabase
            .from('snippet')
            .insert({
                title: "New Snippet",
                description: "Provide a brief description here.",
                collection_id: activeCollection?.id,
                code: '',
                language: 'python',
            }).select();

        if (error) {
            console.log(error);
        } else {
            console.log("success adding snippet to db");
            // console.log('add:' + data[0].id);
            setSnippets([...snippets, {
                id: data[0].id,
                title: data[0].title,
                collection_id: data[0].collection_id,
                code: data[0].code,
                description: data[0].description,
                language: data[0].language,
            }]);
        }


        setTimeout(() => {
            setLoadingAddSnippet(false);
            scrollToBottom();
        }, 1000);

    };

    const handleSignOut = async () => {
        setShowOverlayMenuPage(true);
        setCurrentOverlayMenuPage("signout");
    };

    const displayCurrentOverlayMenuPage = () => {
        switch (currentOverlayMenuPage) {
            case "search":
                return (
                    <SearchOverlayPage
                        filteredSnippets={filteredSnippets}
                        collections={collections}
                        setShowOverlayMenuPage={setShowOverlayMenuPage}
                        handleInputChange={handleInputChange}
                        setActiveCollection={setActiveCollection}
                    />
                );
            case "settings":
                return (
                    <SettingsOverlayPageWrapper setShowOverlayMenuPage={setShowOverlayMenuPage} />
                );
            case "signout":
                return (
                    <SignOutOverlayPage setShowOverlayMenuPage={setShowOverlayMenuPage} />
                );
            case "deleteCollectionConfirmation":
                return (
                    <DeleteCollectionConfirmationOverlayPage
                        toDeleteCollection={toDeleteCollection}
                        setShowOverlayMenuPage={setShowOverlayMenuPage}
                        setCollections={setCollections}
                        buttonOnClick={async () => {
                            const { error } = await supabase
                                .from('collection')
                                .delete()
                                .eq('id', toDeleteCollection?.id);

                            if (error) {
                                console.log(error);
                            } else {
                                setCollections((prevItems) => {
                                    return prevItems.filter((item) => item.id !== toDeleteCollection?.id);

                                });
                            }
                            setShowOverlayMenuPage(false);
                        }}
                    />
                );
            case "move":
                return (
                    <MoveOverlayPage
                        collections={collections}
                        setShowOverlayMenuPage={setShowOverlayMenuPage}
                        setSnippets={setSnippets}
                        selectedSnippetsId={selectedSnippetsId}
                        onClick={(value, index) => {
                            setSnippets((prevItems) =>
                                prevItems.map((item) => {
                                    const updateDb = async () => {
                                        const { data, error } = await supabase
                                            .from('snippet')
                                            .update({ collection_id: value.id })
                                            .eq('id', item.id);
                                    }


                                    if (selectedSnippetsId.includes(item.id)) {
                                        updateDb();
                                        return { ...item, collection_id: value.id }
                                    }
                                    return item;
                                })
                            );
                            setShowOverlayMenuPage(false);
                        }}
                    />
                );
            case "share":
                return (
                    <ShareOverlayPage linkId={linkId} setShowOverlayMenuPage={setShowOverlayMenuPage} />
                );
        }
    };




    const handleMoveSnippets = () => {
        setCurrentOverlayMenuPage('move');
        setShowOverlayMenuPage(true);
    };

    const copyTrigger = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const handleShare = async () => {

        if (!activeCollection?.shared) {
            const updateCollectionAccessibility = async () => {
                const { data, error } = await supabase
                    .from('collection')
                    .update({ shared: true })
                    .eq('id', activeCollection?.id)
                    .select();
            };

            const insertLink = async () => {
                const { data, error } = await supabase
                    .from('link')
                    .insert([
                        {
                            accessibility: 'public',
                            collection_id: activeCollection?.id,

                        },
                    ])
                    .select()

                console.log((data as Link[])[0].id);
                setLinkId((data as Link[])[0].id);
            };


            updateCollectionAccessibility();
            insertLink();

            // Update the active collection shared attribute
            const tempCollection = { ...activeCollection, shared: true } as Collection;
            setActiveCollection(tempCollection);
            setCollections((prevValue) => (
                prevValue.map((value) => {
                    if (value.id == activeCollection?.id) {
                        return { ...value, shared: true };
                    } else {
                        return value;
                    }
                })
            ));
        } else {

            let { data: link, error } = await supabase
                .from('link')
                .select('*')
                .eq('collection_id', activeCollection.id);

            if (error) {
                console.log(error);
            } else {
                setLinkId((link as Link[])[0].id);
            }

        }

        setShowOverlayMenuPage(true);
        setCurrentOverlayMenuPage("share");


    }

    if (isFullScreen) {
        return (
            <ProtectedPage>
                <div >
                    <div className="p-2 bg-white space-x-4 flex">
                        <IconButton icon="close_fullscreen" text="Close full screen" onClick={() => {
                            setIsFullscreen(false);

                        }} />
                        {/* // Fullscreen language selection dropdown */}
                        <div className="hover:bg-slate-100 rounded w-26 text-black">
                            <LanguageDropdown
                                buttonText={fullScreenSnippet.language}
                                languages={languages}
                                fullScreenSnippet={fullScreenSnippet}
                                setSnippets={setSnippets}
                                setFullScreenSnippet={setFullScreenSnippet}
                                supabase={supabase}
                            />
                        </div>
                        {/* //  Fullscreen delete button */}
                        <IconButton icon="delete" text="Delete" onClick={() => {
                            setSnippets((prevItems) => {
                                return prevItems.filter((item) => item.id !== fullScreenSnippet.id);
                            });
                        }} />
                        <CopyToClipboard text={fullScreenSnippet.code} onCopy={() => {
                            copyTrigger();
                        }}>
                            <IconButton icon="content_copy" text="Copy" onClick={() => { }} elementAfterClick={(
                                <p className="pt-1">
                                    Copied!
                                </p>
                            )} />

                        </CopyToClipboard>
                        {fullScreenSnippet.code.length >= 3000 && <p className="flex items-center text-red-500">Max characters reached!</p>}

                    </div>
                    <CodeBlock
                        full={true}
                        codeValue={fullScreenSnippet.code}
                        language={fullScreenSnippet?.language == null ? '' : fullScreenSnippet.language}
                        onCodeChange={async (codeValue) => {
                            setSnippets((prevItems) =>
                                prevItems.map((item) => (item.id === fullScreenSnippet?.id ? { ...item, code: codeValue } : item))
                            );
                            setFullScreenSnippet((value) => {
                                return {
                                    ...value,
                                    code: codeValue,
                                }
                            });

                            const { error } = await supabase
                                .from('snippet')
                                .update({ code: codeValue })
                                .eq('id', fullScreenSnippet.id);


                            if (error) {
                                console.log(error);
                            }

                        }} />
                </div>
            </ProtectedPage>
        );
    }

    return (
        <ProtectedPage>
            <div className={`${!showOverlayMenuPage && "hidden"} z-10 absolute top-0 left-0 w-full h-full bg-neutral-800 opacity-50`}>
            </div>
            <div className={`${!showOverlayMenuPage && "hidden"} z-20 h-full w-full p-4 font-sans absolute flex justify-center items-center opacity-100`}>
                {displayCurrentOverlayMenuPage()}
            </div>

            <div className="relative z-1 bg-slate-100 text-black h-screen flex font-sans">
                <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col border-r border-black`}>
                    <div className="shadow">
                        <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
                        <div className="pt-4 pb-2 flex flex-col">
                            {/* // Search */}
                            <SidebarButton
                                icon="search"
                                text="Search"
                                onClick={() => {
                                    setShowOverlayMenuPage(true);
                                    setFilteredSnippets([]);
                                    setCurrentOverlayMenuPage("search");
                                }}
                            />
                            {/* // Settings */}
                            <SidebarButton
                                icon="settings"
                                text="Settings"
                                onClick={() => {
                                    setShowOverlayMenuPage(true);
                                    setCurrentOverlayMenuPage("settings");
                                }}
                            />
                            {/* // Signout */}
                            <SidebarButton
                                icon="logout"
                                text="Sign out"
                                onClick={handleSignOut}
                            />
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
                                    setSelectedSnippetsId([]);
                                    setActiveCollection(value);
                                }}
                            >
                                <div className={`w-full flex text-xl pl-2 ${activeCollection?.id == value.id ? "bg-neutral-900 text-white" : "hover:bg-slate-300 text-black"} hover:rounded`}>
                                    <div className="flex overflow-x-auto w-80">
                                        <div className="truncate flex">
                                            <div className="flex items-center">
                                                <span className="material-symbols-outlined">folder</span>
                                            </div>

                                            <p className="truncate">{value.title}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex justify-end pr-2 ">
                                        <button onClick={() => handleDeleteCollection(value, setShowOverlayMenuPage, setCurrentOverlayMenuPage, setToDeleteCollection)}>
                                            <span className="material-symbols-outlined flex items-center">delete</span>

                                        </button>

                                    </div>
                                </div>
                            </button>

                        ))}


                    </div>
                    {/* // End of collections */}
                </div>
                {/* // Right Section */}
                <div className="flex-1 flex flex-col">
                    <div className="p-2 border-b border-black bg-neutral-900  text-white ">
                        <p className="text-2xl font-bold flex">
                            <input
                                className="text-2xl bg-neutral-900 w-full text-2xl font-bold"
                                name="title"
                                type="text"
                                disabled={activeCollection ? false : true}
                                value={activeCollection?.title}
                                onChange={(event) => {
                                    handleUpdateCollectionTitle(event, activeCollection, setCollections, setActiveCollection);
                                }}
                            />{loadingAddSnippet && <span className="pl-2">

                                <Image
                                    src={WhiteLoading}
                                    alt={''}
                                    width={30}
                                    height={30}

                                />
                            </span>} </p>

                        <div className="flex space-x-4">
                            {/* // New code snippet */}
                            <IconButton icon="add" text="New code snippet" onClick={handleAddSnippet} disabled={!activeCollection} isDark={true} />
                            {/* // Share collection */}
                            {activeCollection?.shared ? <IconButton icon="public" text="Public" isDark={true} onClick={handleShare} /> : <IconButton icon="share" text="Share" isDark={true} disabled={!activeCollection} onClick={handleShare} />}
                            <IconButton icon="delete" text="Delete" isDark={true} disabled={selectedSnippetsId.length == 0} onClick={()=>{
                                handleDeleteSnippets(selectedSnippetsId, setSnippets);
                            }} />
                            <IconButton icon="folder" text="Move" isDark={true} disabled={selectedSnippetsId.length == 0} onClick={handleMoveSnippets} />
                        </div>
                    </div>

                    {/* // Snippets Section */}
                    {!activeCollection ? <div className="bg-slate-300 flex-1 flex justify-center items-center text-gray-800">
                        <span>Select or create a collection to start adding new code snippets</span>
                    </div> :
                        <div className={`swapy-container flex-1 bg-slate-300 grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-2'} p-2 gap-2 overflow-y-auto justify-center`} ref={scrollableDiv}>
                            {snippets.map((value, index) => {

                                if (value.collection_id != activeCollection.id){
                                    return;
                                }
                                return (
                                    <SnippetCard
                                        key={index}
                                        index={index}
                                        value={value}
                                        languages={languages}
                                        handleUpdateSnippetTitle={handleUpdateSnippetTitle}
                                        handleUpdateSnippetDescription={handleUpdateSnippetDescription}
                                        handleUpdateSnippetLanguage={handleUpdateSnippetLanguage}
                                        handleUpdateSnippetCode={handleUpdateSnippetCode}
                                        setSelectedSnippetsId={setSelectedSnippetsId}
                                        setIsFullscreen={setIsFullscreen}
                                        setFullScreenSnippet={setFullScreenSnippet}
                                        copyTrigger={copyTrigger}
                                        setSnippets={setSnippets}
                                    />);

                            })}
                        </div>
                    }

                </div>
                {/* // End Code Snippets Section */}
            </div>

        </ProtectedPage>
    );
}