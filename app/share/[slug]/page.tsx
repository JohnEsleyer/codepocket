'use client'

import CodeBlock from "@/app/components/Codeblock";
import DropdownMenu from "@/app/components/DropdownMenu";
import IconButton from "@/app/components/IconButton";
import { languages } from "@/app/home/constants";
import { Collection, Link, Snippet } from "@/app/home/types";
import supabase from "@/app/utils/supabase";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Loading from "/public/loading.svg";
import Image from "next/image";
import { defaultFullscreenSnippet } from "./constants";
import { link } from "fs";

export default function Page({ params }: { params: { slug: string } }) {

    const [linkState, setLinkState] = useState<Link>();
    const [collection, setCollection] = useState<Collection>();
    const [snippets, setSnippets] = useState<Snippet[]>();
    const [singleColumn, setSingleColumn] = useState(false);
    const [isFullScreen, setIsFullscreen] = useState(false);
    const [fullScreenSnippet, setFullScreenSnippet] = useState<Snippet>(defaultFullscreenSnippet);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {

        const checkOrientation = () => {
            const screenRatio = window.innerWidth / window.innerHeight;

            console.log(window.innerWidth);
            if (window.innerWidth < 730) {
                setSingleColumn(true)
            } else {
                setSingleColumn(false);
            }
        };

        checkOrientation();

        const resizeListener = () => {
            checkOrientation();
        };


        const fetchSnippets = async (collection_id: number) => {

            let { data: snippet, error } = await supabase
                .from('snippet')
                .select('*')
                .eq('collection_id', collection_id);

            if (error) {
                console.log(error);
            } else {
                setSnippets(snippet as Snippet[]);
                setIsLoading(false);
            }
        }

        // Fetch collection asssociate with the link
        const fetchCollection = async (collection_id: number) => {

            console.log('link.collection_id: ' + collection_id);
            let { data: collection, error } = await supabase
                .from('collection')
                .select('*')
                .eq('id', collection_id);

            if (error) {
                console.log(error);
            } else {
                setCollection((collection as Collection[])[0]);
                fetchSnippets(collection_id);
            }
        };

        // Check if link exists in db
        const fetchLink = async () => {
            let { data: link, error } = await supabase
                .from('link')
                .select('*')
                .eq('id', params.slug);

            if (error) {
                console.log(error);
            } else {
                setLinkState((link as Link[])[0]);
                fetchCollection((link as Link[])[0].collection_id);
            }
        };


        fetchLink();

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Image
                    src={Loading}
                    alt={''}
                    width={30}
                    height={30}

                />
            </div>
        );
    }

    if (linkState) {

        if (isFullScreen) {
            return (

                <div >
                    <div className="p-2 bg-white space-x-4 flex">
                        <IconButton icon="close_fullscreen" text="Close full screen" onClick={() => {
                            setIsFullscreen(false);

                        }} />
                        <p className="p-1">{fullScreenSnippet.language}</p>

                        {/* //  Fullscreen delete button */}
                        <IconButton icon="delete" text="Delete" onClick={() => {
                            setSnippets((prevItems) => {
                                return prevItems?.filter((item) => item.id !== fullScreenSnippet.id);
                            });
                        }} />
                        <CopyToClipboard text={fullScreenSnippet.code}>
                            <IconButton icon="content_copy" text="Copy" onClick={() => { }} elementAfterClick={(
                                <p className="pt-1">
                                    Copied!
                                </p>
                            )} />

                        </CopyToClipboard>
                    </div>
                    <CodeBlock
                        full={true}
                        readOnly={true}
                        codeValue={fullScreenSnippet.code}
                        language={fullScreenSnippet?.language == null ? '' : fullScreenSnippet.language}
                        onCodeChange={async (codeValue) => {
                            setSnippets((prevItems) =>
                                prevItems?.map((item) => (item.id === fullScreenSnippet?.id ? { ...item, code: codeValue } : item))
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

            );
        }



        return <div>

            <div className="bg-black text-white p-4">
                <p className="text-2xl">{collection?.title}</p>
                <p>Creator: {linkState.owner_username}</p>
                <p className="text-xs">Read Only</p>
    
            </div>
            <div className={`grid ${singleColumn ? "grid-cols-1" : "grid-cols-2"} gap-2 p-2`}>
                {snippets?.map((value, index) => (
                    <>
                        <div
                            key={index}
                            className="bg-slate-100 border border-black rounded h-96">
                            <div key={index} className="m-2">
                                <form className="flex flex-col">
                                    <div className="flex ">
                                        {/* // Snippet's Title */}
                                        <input
                                            className="flex-1 text-2xl bg-slate-100 w-full"
                                            name="title"
                                            type="text"
                                            disabled={true}
                                            value={value.title}

                                        />


                                    </div>
                                    {/* // Snippet's Description */}
                                    <textarea
                                        className="bg-slate-100 w-full"
                                        name="description"
                                        maxLength={110}
                                        disabled={true}
                                        value={value.description}

                                    />


                                </form>
                                <div className="flex justify-end items-center space-x-2">

                                    <p>{value.language}</p>

                                    <IconButton icon="open_in_full" text="Full screen" onClick={() => {
                                        setIsFullscreen(true);
                                        setFullScreenSnippet(value);
                                    }} />

                                    <CopyToClipboard text={value.code}>
                                        <IconButton icon="content_copy" text="Copy" onClick={() => { }} elementAfterClick={
                                            (<p>
                                                Copied!
                                            </p>)
                                        } />

                                    </CopyToClipboard>
                                </div>


                                <div className="h-60 overflow-x-hidden rounded-2xl ">
                                    <CodeBlock readOnly={true} codeValue={value.code} language={value.language} onCodeChange={(codeValue) => {

                                        // handleUpdateSnippetCode(value, codeValue);
                                    }} />
                                </div>

                            </div>

                        </div>


                    </>
                ))}
            </div>

        </div>
    }
    return <div className="flex justify-center items-center h-screen w-screen bg-slate-100">
        <div>
            <span className="flex justify-center text-5xl material-symbols-outlined">
                sentiment_dissatisfied
            </span>
            <p>Page Not Found</p>

        </div>
    </div>
}