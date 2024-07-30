'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import ProtectedPage from "../../templates/protectedpage";
import CodeBlock from "../../_components/Codeblock";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { defaultFullscreenSnippet, languages } from "../constants";
import IconButton from "../../_components/IconButton";
import supabase from "../../utils/supabase";
import { useRouter } from "next/navigation";
import { Collection, Link, Snippet, Workspace } from "../types";
import LanguageDropdown from "../_components/LanguageDropdown";
import DeleteCollectionConfirmationOverlayPage from "../_components/(overlay)/DeleteConfirmation";
import MoveOverlayPage from "../_components/(overlay)/MoveOverlayContent";
import SearchOverlayPage from "../_components/(overlay)/SearchOverlayContent";
import SettingsOverlayPageWrapper from "../_components/(overlay)/SettingsOverlay";
import ShareOverlayPage from "../_components/(overlay)/ShareOverlayContent";
import SignOutOverlayPage from "../_components/(overlay)/SignOutOverlayContent";
import { fetchAllCollections, fetchAllSnippets } from "../_utility/fetchData";
import { handleDeleteCollection, handleDeleteSnippets } from "../_utility/deleteData";
import { handleUpdateCollectionTitle, handleUpdateSnippetCode, handleUpdateSnippetDescription, handleUpdateSnippetLanguage, handleUpdateSnippetTitle } from "../_utility/updateData";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Snippets from "./Snippets";
import OverlayMenu from "./OverlayMenu";
import { Copy, Divide, Minimize2, Trash2 } from "lucide-react";
import Loading from '/public/loading.svg';
import Image from 'next/image';
import { useAppContext } from "@/app/_context/AppContext";
import { copyTrigger } from "../_utility/otherHandlers";

export default function Main() {

    const router = useRouter();
    const scrollableDiv = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    
    // Loading indicator states
    const [isLoading, setIsLoading] = useState(true);
    const {
        collections, 
        setCollections, 
        snippets, 
        setSnippets,
        setWorkspaces,
        setOrientation,
        setSingleColumn,
        setActiveCollection,
        activeCollection,
        filteredSnippets,
        setFilteredSnippets,
        query,
        setQuery,
        showOverlayMenuPage,
        setShowOverlayMenuPage,
        currentOverlayMenuPage,
        setDisableSnippets,
        selectedSnippetsId,
        isFullScreen,
        setIsFullscreen,
        fullScreenSnippet,
        setFullScreenSnippet,
        setActiveWorkspace,
    } = useAppContext();


    const scrollToBottom = () => {
        if (scrollableDiv.current) {
            scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
        }
    }

    const fetchDbData = async () => {
        fetchAllCollections(setCollections);
        fetchAllSnippets(setSnippets);
    };

    const fetchWorkspace = async () => {
        let { data: workspace, error } = await supabase
        .from('workspace')
        .select('*');
        setWorkspaces(workspace as Workspace[]);
        if (workspace){
            setActiveWorkspace((workspace as Workspace[]).filter((value) => value.active == true));
        }
    }


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
        fetchWorkspace();

        
        setIsLoading(false);

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);



  




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
                    <SettingsOverlayPageWrapper  setShowOverlayMenuPage={setShowOverlayMenuPage} />
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
                                setCollections(
                                    collections.filter((item) => item.id !== activeCollection?.id)

                                );
                                setSnippets(snippets.filter((value) => {
                                    value.collection_id !== activeCollection?.id
                                     return value;
                                }));
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
                            setSnippets(snippets.map((item) => {
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
                    <ShareOverlayPage/>
                );
        }
    };



    if (isFullScreen) {
        return (
            <ProtectedPage>
                <div >
                    <div className="p-2 bg-white space-x-4 flex">
                        <IconButton icon={ <Minimize2 />} text="Close full screen" onClick={() => {
                            setIsFullscreen(false);

                        }} />
                        {/* // Fullscreen language selection dropdown */}
                        <div className="hover:bg-slate-100 rounded w-26 text-black">
                            <LanguageDropdown />
                        </div>
                        {/* //  Fullscreen delete button */}
                        <IconButton icon={<Trash2/>} text="Delete" onClick={() => {
                            setSnippets(snippets.filter((item) => item.id !== fullScreenSnippet.id));
                        }} />
                        <CopyToClipboard text={fullScreenSnippet.code} onCopy={() => {
                            copyTrigger();
                        }}>
                            <IconButton icon={<Copy/>} text="Copy" onClick={() => { }} elementAfterClick={(
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
                            setSnippets(snippets.map((item) => (item.id === fullScreenSnippet?.id ? { ...item, code: codeValue } : item)));
                            setFullScreenSnippet(
                                 {
                                    ...fullScreenSnippet,
                                    code: codeValue,
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

    if (isLoading){
        return (
            <div className="flex justify-center items-center h-screen">
                <Image 
                src={Loading}
                width={30}
                height={30}
                alt="Loading"
                />
            </div>
        )
    }

    return (
        <ProtectedPage>
            {/* <div className="bg-red-300 h-32">{activeWorkspace ? 'not empty' : 'empty'}</div> */}
            <OverlayMenu showOverlayMenuPage={showOverlayMenuPage} displayCurrentOverlayMenuPage={displayCurrentOverlayMenuPage} />

            <div className="relative z-1 bg-slate-100 text-black h-screen flex font-sans">
                <Sidebar />

                <div className="flex-1 flex flex-col">
                    <Toolbar
                        scrollToBottom={scrollToBottom}
                    />

                    <Snippets
                        scrollableDiv={scrollableDiv}
                    />
                </div>
            </div>

        </ProtectedPage>
    );
}