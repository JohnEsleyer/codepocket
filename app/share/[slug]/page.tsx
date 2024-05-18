'use client'

import { Collection, Link, Snippet } from "@/app/home/types";
import supabase from "@/app/utils/supabase";
import { useEffect, useState } from "react";


export default function Page({params} : {params: {slug: string}}){
    const [link, setLink] = useState<Link>();
    const [collection, setCollection] = useState<Collection>();
    const [snippets, setSnippets] = useState<Snippet[]>();

    useEffect(() => {
        // Check if link exists in db
        const fetchLink = async () => {
            let { data: link, error } = await supabase
            .from('link')
            .select('*')
            .eq('id', params.slug);

            if (error){
                console.log(error);
            }else{
                setLink((link as Link[])[0]);
            }
        };

        // Fetch collection asssociate with the link
        const fetchCollection = async () => {
            await fetchLink();
            console.log('link.collection_id: '+link?.collection_id);
            let { data: collection, error } = await supabase
            .from('collection')
            .select('*')
            .eq('id', link?.collection_id);

            setCollection((collection as Collection[])[0]);
        };

        const fetchSnippets = async () => {
            await fetchCollection();

            let { data: snippet, error } = await supabase
            .from('snippet')
            .select('*')
            .eq('collection_id', collection?.id);

            setSnippets(snippet as Snippet[]);
        }
        
        fetchSnippets();


    }, []);
    
    if (link){
        return <div>
            {/* <p>{link.id}</p> */}
            <div className="bg-black text-white p-4">
            <p className="text-2xl">{collection?.title}</p>

            </div>
            <div>
            {snippets?.map((value) => (
                value.title
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