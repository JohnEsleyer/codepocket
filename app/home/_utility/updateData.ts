import supabase from "@/app/utils/supabase";
import { Collection, Snippet } from "../types";
import { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/app/_context/AppContext";

// This handler does not execute from fullscreen mode, only preview.
// Update snippet language
export const handleUpdateSnippetLanguage = async (
    value: Snippet,
    language: string,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>
) => {
    setSnippets((prevItems) =>
        prevItems.map((item) =>
            item.id === value.id ? { ...item, language: language } : item
        )
    );

    const { error } = await supabase
        .from('snippet')
        .update({ language: language })
        .eq('id', value.id);

    if (error) {
        console.log(error);
    }
};
export const handleUpdateSelectedSnippetLanguage = async (
    language: string,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>,
    selectedSnippetsId: number[]
) => {
    setSnippets((snippets) => (
        snippets.map((item) => {
            
            if (selectedSnippetsId.includes(item.id))
                 {  
                    return  { ...item, language: language }
                } 
            return item;
        }
        )
    )
    );

    async function updateDbSnippets(snippetId: number){
        const { error } = await supabase
        .from('snippet')
        .update({ language: language })
        .eq('id', snippetId);
        if (error) {
            console.log(error);
        }
    }
    selectedSnippetsId.map((snippetId)=>{
        updateDbSnippets(snippetId);
    });

    
};

// Update snippet code
export const handleUpdateSnippetCode = async (
    value: Snippet,
    code: string,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>,
) => {
    setSnippets((snippets) => (
        snippets.map((item) =>
            item.id === value.id ? { ...item, code: code } : item
        )
    )
    );

    const { error } = await supabase
        .from('snippet')
        .update({ code: code })
        .eq('id', value.id);

    if (error) {
        console.log(error);
    }
};

// Update snippet description
export const handleUpdateSnippetDescription = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    value: Snippet,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>
) => {
    setSnippets((snippets) => (
        snippets.map((item) =>
            item.id === value.id ? { ...item, description: event.target.value } : item
        )
    )
    );

    const { error } = await supabase
        .from('snippet')
        .update({ description: event.target.value })
        .eq('id', value.id);

    if (error) {
        console.log(error);
    }
};

// Update snippet title
export const handleUpdateSnippetTitle = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    value: Snippet,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>
) => {
    setSnippets((snippets) => (
        snippets.map((item) =>
            item.id === value.id ? { ...item, title: event.target.value } : item
        )
    )
    );

    const { error } = await supabase
        .from('snippet')
        .update({ title: event.target.value })
        .eq('id', value.id);

    if (error) {
        console.log(error);
    }
};

// Update collection title
export const handleUpdateCollectionTitle = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setCollections: Dispatch<SetStateAction<Collection[]>>,
    activeCollection: Collection, 
    setActiveCollection: Dispatch<SetStateAction<Collection>>,
) => {

    setCollections((collections) => (
        collections.map((item) =>
            item.id === activeCollection?.id ? { ...item, title: event.target.value } : item
        )
    )
    );
    setActiveCollection(activeCollection ? { ...activeCollection, title: event.target.value } : activeCollection
    );

    const { error } = await supabase
        .from('collection')
        .update({ title: event.target.value })
        .eq('id', activeCollection?.id);

    if (error) {
        console.log(error);
    }
};


