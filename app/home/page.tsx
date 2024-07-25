'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import ProtectedPage from "../templates/protectedpage";
import CodeBlock from "../components/Codeblock";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { defaultFullscreenSnippet, languages } from "./constants";
import IconButton from "../components/IconButton";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import { Collection, Link, Snippet } from "./types";
import LanguageDropdown from "./_components/LanguageDropdown";
import DeleteCollectionConfirmationOverlayPage from "./_components/(overlay)/DeleteConfirmation";
import MoveOverlayPage from "./_components/(overlay)/MoveOverlayContent";
import SearchOverlayPage from "./_components/(overlay)/SearchOverlayContent";
import SettingsOverlayPageWrapper from "./_components/(overlay)/SettingsOverlayContent";
import ShareOverlayPage from "./_components/(overlay)/ShareOverlayContent";
import SignOutOverlayPage from "./_components/(overlay)/SignOutOverlayContent";
import { fetchAllCollections, fetchAllSnippets } from "./_utility/fetchData";
import { handleDeleteCollection, handleDeleteSnippets } from "./_utility/deleteData";
import { handleUpdateCollectionTitle, handleUpdateSnippetCode, handleUpdateSnippetDescription, handleUpdateSnippetLanguage, handleUpdateSnippetTitle } from "./_utility/updateData";
import Sidebar from "./(sections)/Sidebar";
import Toolbar from "./(sections)/Toolbar";
import Snippets from "./(sections)/Snippets";
import OverlayMenu from "./(sections)/OverlayMenu";

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
    const [query, setQuery] = useState('');
    const [linkId, setLinkId] = useState('');
    const [disableSnippets, setDisableSnippets] = useState(false);
    
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
                        toDeleteCollection={activeCollection}
                        setShowOverlayMenuPage={setShowOverlayMenuPage}
                        setCollections={setCollections}
                        buttonOnClick={async () => {
                            const { error } = await supabase
                                .from('collection')
                                .delete()
                                .eq('id', activeCollection?.id);

                            if (error) {
                                console.log(error);
                            } else {
                                setCollections((prevItems) => {
                                    return prevItems.filter((item) => item.id !== activeCollection?.id);

                                });
                                setSnippets((prevValues) => (prevValues.filter((value) => {
                                    value.collection_id !== activeCollection?.id
                                     return value;
                                })));
                                setDisableSnippets(true);
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
                    <ShareOverlayPage 
                        linkId={linkId} 
                        setShowOverlayMenuPage={setShowOverlayMenuPage} 
                        setCollections={setCollections}
                        collections={collections}
                        activeCollection={activeCollection}
                        setActiveCollection={setActiveCollection}
                        />
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
            <OverlayMenu showOverlayMenuPage={showOverlayMenuPage} displayCurrentOverlayMenuPage={displayCurrentOverlayMenuPage} />

            <div className="relative z-1 bg-slate-100 text-black h-screen flex font-sans">
                <Sidebar
                    orientation={orientation}
                    setShowOverlayMenuPage={setShowOverlayMenuPage}
                    setFilteredSnippets={setFilteredSnippets}
                    setCurrentOverlayMenuPage={setCurrentOverlayMenuPage}
                    handleSignOut={handleSignOut}
                    handleAddCollection={handleAddCollection}
                    loadingAddCollection={loadingAddCollection}
                    collections={collections}
                    setSelectedSnippetsId={setSelectedSnippetsId}
                    setActiveCollection={setActiveCollection}
                    activeCollection={activeCollection}
                    handleDeleteCollection={handleDeleteCollection}
                    setDisableSnippets={setDisableSnippets}
                />

                <div className="flex-1 flex flex-col">
                    <Toolbar
                        activeCollection={activeCollection}
                        loadingAddSnippet={loadingAddSnippet}
                        handleUpdateCollectionTitle={handleUpdateCollectionTitle}
                        handleAddSnippet={handleAddSnippet}
                        handleShare={handleShare}
                        handleDeleteSnippets={handleDeleteSnippets}
                        selectedSnippetsId={selectedSnippetsId}
                        handleMoveSnippets={handleMoveSnippets}
                        setCollections={setCollections}
                        setActiveCollection={setActiveCollection}
                        setSnippets={setSnippets}
                    />

                    <Snippets
                        activeCollection={activeCollection}
                        snippets={snippets}
                        singleColumn={singleColumn}
                        scrollableDiv={scrollableDiv}
                        handleUpdateSnippetTitle={handleUpdateSnippetTitle}
                        handleUpdateSnippetDescription={handleUpdateSnippetDescription}
                        handleUpdateSnippetLanguage={handleUpdateSnippetLanguage}
                        handleUpdateSnippetCode={handleUpdateSnippetCode}
                        setSelectedSnippetsId={setSelectedSnippetsId}
                        setIsFullscreen={setIsFullscreen}
                        setFullScreenSnippet={setFullScreenSnippet} 
                        copyTrigger={copyTrigger} 
                        setSnippets={setSnippets}
                        languages={languages}
                        disable={disableSnippets}
                    />
                </div>
            </div>

        </ProtectedPage>
    );
}