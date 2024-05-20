'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import { testCollections, testSnippets } from "./testdata";
import CodeBlock from "../components/Codeblock";
import WhiteLoading from "/public/loadingWhite.svg";
import Image from "next/image";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DropdownMenu from "../components/DropdownMenu";
import { languages } from "./constants";
import SidebarButton from "./SidebarButton";
import IconButton from "../components/IconButton";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import OverlayMenuPage from "./OverlayMenuPage";
import { Collection, Link, Snippet } from "./types";
import SettingsOverlayPage from "./SettingsOverlayPage";

export default function Home() {

    const defaultFullscreenSnippet = {
        id: 0,
        title: 'untitled',
        collection_id: 0,
        code: '',
        language: 'python',
        description: '',
    };

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
        async function fetchAllCollections() {
            // Fetch all collections by current user
            let { data: collection, error } = await supabase
                .from('collection')
                .select('*')

            if (error) {
                console.log(error);
            } else {
                setCollections(collection as Collection[]);
            }
        }

        async function fetchAllSnippets() {
            // Fetch all snippets by current user
            let { data: snippets, error } = await supabase
                .from('snippet')
                .select('*')

            if (error) {
                console.log(error);
            } else {
                setSnippets(snippets as Snippet[]);
            }
        }

        fetchAllCollections();
        fetchAllSnippets();

    };


    useEffect(() => {
        const checkOrientation = () => {
            const screenRatio = window.innerWidth / window.innerHeight;

            console.log(screenRatio);
            if (screenRatio > 1.150) {
                setOrientation('Landscape');
            } else {
                setOrientation('Portrait');
            }

            console.log(window.innerWidth);
            if (window.innerWidth < 950) {
                setSingleColumn(true)
            } else {
                setSingleColumn(false);
            }
        };

        checkOrientation();

        const resizeListener = () => {
            checkOrientation();
        };

        // Fetch all user data
        fetchDbData();

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

    const handleDeleteCollection = async (value: Collection) => {

        setShowOverlayMenuPage(true);
        setCurrentOverlayMenuPage("deleteCollectionConfirmation");
        setToDeleteCollection(value);

    }

    const handleDeleteSnippets = async () => {

        selectedSnippetsId.map(async (itemId) => {
            console.log('itemId:' + itemId);
            const { error } = await supabase
                .from('snippet')
                .delete()
                .eq('id', itemId);

            if (error) {
                console.log(error);
            } else {
                setSnippets((prevItems) => (
                    prevItems.filter((item, index) => (
                        !selectedSnippetsId.includes(item.id)
                    ))
                ));
            }
        });

        setSelectedSnippetsId([]);

    };

    // This handler does not execute from fullscreen mode, only preview.
    const handleUpdateSnippetLanguage = async (value: Snippet, language: string) => {
        setSnippets((prevItems) =>
            prevItems.map((item) => (item.id === value.id ? { ...item, language: language } : item))
        );

        const { error } = await supabase
            .from('snippet')
            .update({ language: language })
            .eq('id', value.id)


        if (error) {
            console.log(error);
        }

    };

    const handleUpdateCollectionTitle = async (event: any) => {


        setCollections((prevItems) =>
            prevItems.map((item) => (item.id === activeCollection?.id ? { ...item, title: event.target.value } : item))
        );
        setActiveCollection((prevValue) => {
            return { ...prevValue!, title: event.target.value }
        }
        );
        const { error } = await supabase
            .from('collection')
            .update({ title: event.target.value })
            .eq('id', activeCollection?.id)

        if (error) {
            console.log(error);
        }

    }

    // This handler does not execute from fullscreen mode, only preview.
    const handleUpdateSnippetCode = async (value: Snippet, code: string) => {
        setSnippets((prevItems) =>
            prevItems.map((item) => (item.id === value.id ? { ...item, code: code } : item))
        );
        const { error } = await supabase
            .from('snippet')
            .update({ code: code })
            .eq('id', value.id);


        if (error) {
            console.log(error);
        }
    };

    const handleUpdateSnippetDescription = async (event: any, value: Snippet) => {
        setSnippets((prevItems) =>
            prevItems.map((item) => (item.id === value.id ? { ...item, description: event?.target.value } : item))
        );

        const { error } = await supabase
            .from('snippet')
            .update({ description: event.target.value })
            .eq('id', value.id);


        if (error) {
            console.log(error);
        }
    };

    const handleUpdateSnippetTitle = async (event: any, value: Snippet) => {
        setSnippets((prevItems) =>
            prevItems.map((item) => (item.id === value.id ? { ...item, title: event.target.value } : item))
        );

        const { error } = await supabase
            .from('snippet')
            .update({ title: event.target.value })
            .eq('id', value.id)

        if (error) {
            console.log(error);
        }

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
                    <OverlayMenuPage width="w-4/5" title="Search" onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <p>What are you looking for?</p>
                        <input
                            className="text-2xl p-1 bg-slate-100 border border-black rounded w-full text-2xl"
                            name="search"
                            type="text"
                            placeholder="Type the snippet's title or description"
                            onChange={handleInputChange}
                        />

                        <ul className="h-80 overflow-y-auto">
                            {filteredSnippets.length !== 0 ? filteredSnippets.map(item => (

                                <li key={item.id} className="shadow hover:bg-slate-200 bg-slate-100 p-1 border m-1 ">
                                    <button
                                        className="w-full flex flex-col "
                                        onClick={() => {
                                            setShowOverlayMenuPage(false);
                                            setActiveCollection(collections.find(obj => obj.id === item.collection_id));
                                        }}
                                    >
                                        <div className="w-full flex flex-col">
                                            <p className="flex justify-start"><strong>{item.title}</strong></p>
                                            <p className="flex justify-start truncate">{item.description}</p>
                                        </div>
                                        <p className="flex items-center ">
                                            <span className="material-symbols-outlined">folder</span>
                                            {collections.find(obj => obj.id === item.collection_id)?.title}
                                        </p>
                                    </button>
                                </li>

                            )) : <p className="flex justify-center items-center p-16">Press Enter to request a search result</p>}
                        </ul>
                    </OverlayMenuPage>);
            case "settings":
                return (
                    <OverlayMenuPage width="w-4/5" title="Settings" onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <SettingsOverlayPage />
                    </OverlayMenuPage>);
            case "signout":
                return (
                    <OverlayMenuPage width="w-80" title="Sign Out" disableCloseButton={true} onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <p>Are you sure, you want to sign out?</p>
                        <button
                            className="bg-black text-white p-2 border rounded"
                            onClick={async () => {
                                const { error } = await supabase.auth.signOut();
                                router.replace('/');
                            }}
                        >Continue</button>
                        <button
                            className=" p-2 border rounded"
                            onClick={async () => {

                                setShowOverlayMenuPage(false);
                            }}

                        >Cancel</button>
                    </OverlayMenuPage>);
            case "deleteCollectionConfirmation":
                return (
                    <OverlayMenuPage width="w-80" title="Delete collection"  disableCloseButton={true} onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <p>Are you sure, you want to delete this collection?</p>
                        <button
                            className="bg-black text-white p-2 border rounded"
                            onClick={async () => {
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

                        >Continue</button>
                        <button
                            className=" p-2 border rounded"
                            onClick={async () => {

                                setShowOverlayMenuPage(false);
                            }}

                        >Cancel</button>
                    </OverlayMenuPage>);
            case "move":
                return (
                    <OverlayMenuPage width="w-4/5" title="Move to collection" onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <p>Select a collection</p>
                        <div>
                            {collections.map((value, index) => (
                                <button
                                    key={index}
                                    className="flex justify-start w-full"
                                    onClick={() => {

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
                                >
                                    <div className={`w-full space-x-10 flex text-xl pl-2 hover:bg-neutral-900 hover:text-white hover:rounded`}>
                                        <div className="flex overflow-x-auto ">
                                            <p className="flex items-center">
                                                <span className=" material-symbols-outlined">folder</span>
                                                {value.title}
                                            </p>
                                        </div>


                                    </div>
                                </button>

                            ))}
                        </div>

                    </OverlayMenuPage>);
            case "share":
                return (
                    <OverlayMenuPage width="w-96" title="Share" onClose={() => {
                        setShowOverlayMenuPage(false);
                    }}>
                        <div>
                            <p className="">Collection is shared publicly.</p>
                            <p> You can access it here:</p>
                            
                            <input ref={inputRef} className="p-2 w-full border border-black rounded" value={(window.location.hostname as string) + '/share/' + linkId}/>
                            <div className="flex gap-2">
                            <CopyToClipboard text={(window.location.hostname as string) + '/share/' + linkId}>
                            <IconButton icon="content_copy" text="Copy" onClick={()=>{
                                if (inputRef.current){
                                    inputRef.current.select();
                                }
                            }} elementAfterClick={(
                                <p className="pt-1">
                                    Copied!
                                </p>
                            )} />
                            </CopyToClipboard>
                            <a href={'/share/' + linkId} target="_blank"><IconButton icon="open_in_new" text="Visit" onClick={()=>{}}/></a>
                            </div>
                        </div>
                    </OverlayMenuPage>
                );
        }

    }


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
        }else{

            let { data: link, error } = await supabase
            .from('link')
            .select('*')
            .eq('collection_id', activeCollection.id);

            if (error){
                console.log(error);
            }else{
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
                            <DropdownMenu buttonText={fullScreenSnippet.language} >

                                <div className="h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
                                    {languages.map((lang, index) => (
                                        <button key={index} onClick={async () => {
                                            setSnippets((prevItems) =>
                                                prevItems.map((item) => (item.id === fullScreenSnippet.id ? { ...item, language: lang } : item))
                                            );
                                            setFullScreenSnippet((prevValue) => {
                                                return { ...fullScreenSnippet, language: lang }
                                            });
                                            const { error } = await supabase
                                                .from('snippet')
                                                .update({ language: lang })
                                                .eq('id', fullScreenSnippet.id);


                                            if (error) {
                                                console.log(error);
                                            }
                                        }}><p className=" hover:bg-slate-300 p-1">{lang}</p></button>
                                    ))}
                                </div>
                            </DropdownMenu>
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
                            <IconButton icon="content_copy" text="Copy" onClick={()=>{}} elementAfterClick={(
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
                                        <button onClick={() => handleDeleteCollection(value)}>
                                            <span className="material-symbols-outlined flex items-center">delete</span>

                                        </button>

                                    </div>
                                </div>
                            </button>

                        ))}


                    </div>
                    {/* // End of collections */}
                </div>
                {/* // Left Section */}
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
                                    handleUpdateCollectionTitle(event);
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
                            <IconButton icon="delete" text="Delete" isDark={true} disabled={selectedSnippetsId.length == 0} onClick={handleDeleteSnippets} />
                            <IconButton icon="folder" text="Move" isDark={true} disabled={selectedSnippetsId.length == 0} onClick={handleMoveSnippets} />
                        </div>
                    </div>

                    {/* // Snippets Section */}
                    <div className={`flex-1 bg-slate-300 grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-2'} p-2 gap-2 overflow-y-auto justify-center`} ref={scrollableDiv}>
                        {snippets.map((value, index) => (
                            <>
                                {value.collection_id == activeCollection?.id &&
                                    <div
                                        key={index}
                                        className="bg-slate-100 border border-black rounded h-96">
                                        <div key={index} className="m-2">
                                            <form className="flex flex-col">
                                                <div className="flex ">
                                                    {/* // Snippet's Title */}
                                                    <input
                                                        className="flex-1 text-2xl bg-slate-100"
                                                        name="title"
                                                        type="text"
                                                        disabled={false}
                                                        value={value.title}
                                                        onChange={(event) => {
                                                            handleUpdateSnippetTitle(event, value);
                                                        }}
                                                    />
                                                    <input
                                                        className="w-6 accent-black"
                                                        type="checkbox"
                                                        id="Checkbox"
                                                        name="myCheckbox"
                                                        key={value.id}
                                                        onChange={(event) => {
                                                            setSelectedSnippetsId((prevItemsId) => {
                                                                if (prevItemsId.includes(value.id)) {
                                                                    return prevItemsId.filter((snippetId) => (
                                                                        snippetId !== value.id
                                                                    ));
                                                                } else {
                                                                    return [...prevItemsId, value.id];
                                                                }
                                                            });
                                                            // console.log('Selected:' + selectedSnippetsId);

                                                        }} />

                                                </div>
                                                {/* // Snippet's Description */}
                                                <textarea
                                                    className="bg-slate-100 w-full"
                                                    name="description"
                                                    maxLength={110}
                                                    value={value.description}
                                                    onChange={(event) => {
                                                        handleUpdateSnippetDescription(event, value);
                                                    }}
                                                />


                                            </form>
                                            
                                            <div className="flex justify-end items-center space-x-2">
                                            {value.code.length >= 3000 && <p className="text-red-500">Max characters reached!</p>}
                                                <div className="hover:bg-slate-300 rounded">
                                                    <DropdownMenu buttonText={value.language} >

                                                        <div className="h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
                                                            {languages.map((lang, index) => (
                                                                <button key={index} onClick={() => {
                                                                    handleUpdateSnippetLanguage(value, lang);
                                                                }}><p className=" hover:bg-slate-300 p-1">{lang}</p></button>
                                                            ))}
                                                        </div>
                                                    </DropdownMenu>
                                                </div>
                                                <IconButton icon="open_in_full" text="Full screen" onClick={() => {
                                                    setIsFullscreen(true);
                                                    setFullScreenSnippet(value);
                                                }} />

                                                <CopyToClipboard text={value.code} onCopy={() => {
                                                    copyTrigger();
                                                }}>
                                                    <IconButton icon="content_copy" text="Copy" onClick={()=>{}} elementAfterClick={
                                                        (<p>
                                                            Copied!
                                                        </p>)
                                                    } />

                                                </CopyToClipboard>
                                            </div>

                                        

                                            <div className="h-60 overflow-x-hidden rounded-2xl ">
                                                <CodeBlock codeValue={value.code} language={value.language} onCodeChange={(codeValue) => {

                                                    handleUpdateSnippetCode(value, codeValue);
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