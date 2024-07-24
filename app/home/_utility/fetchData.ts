import supabase from "@/app/utils/supabase";
import { Collection, Snippet } from "../types";

export const fetchAllCollections = async (setCollections: (collections: Collection[]) => void) => {
    let { data: collection, error } = await supabase
        .from('collection')
        .select('*');

    if (error) {
        console.log(error);
    } else {
        setCollections(collection as Collection[]);
    }
};

export const fetchAllSnippets = async (setSnippets: (snippets: Snippet[]) => void) => {
    let { data: snippets, error } = await supabase
        .from('snippet')
        .select('*');

    if (error) {
        console.log(error);
    } else {
        setSnippets(snippets as Snippet[]);
    }
};
