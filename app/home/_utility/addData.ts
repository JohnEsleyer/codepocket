import { useAppContext } from "@/app/_context/AppContext";
import supabase from "@/app/utils/supabase";
import { Dispatch, SetStateAction } from "react";
import { Collection , Snippet, Workspace} from "../types";

export const handleAddCollection = async (
    setLoadingAddCollection:(loadingAddCollection: boolean) => void,
    setCollections: Dispatch<SetStateAction<Collection[]>>,
    activeWorkspace: Workspace | undefined,
) => {
    
    setLoadingAddCollection(true);

    const { data, error } = await supabase
        .from('collection')
        .insert({
            title: "New Collection",
            workspace_id: activeWorkspace?.id,
        }).select();

    if (error) {
        console.log(error);
    } else {
        // console.log(data[0].id);
        setCollections((prevValues) => (
            [...prevValues, {
                id: data[0].id,
                title: data[0].title,
                shared: false,
                workspace_id: data[0].workspace_id,
            }]
        ));

    }


    setTimeout(() => {
        setLoadingAddCollection(false);
    }, 1000);
};

export const handleAddSnippet = async (
    scrollToBottom: () => void,
    setLoadingAddSnippet: Dispatch<SetStateAction<boolean>>,
    setSnippets: Dispatch<SetStateAction<Snippet[]>>,
    activeCollection: Collection | undefined,
) => {

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
        setSnippets((snippets) => (
            [...snippets, {
                id: data[0].id,
                title: data[0].title,
                collection_id: data[0].collection_id,
                code: data[0].code,
                description: data[0].description,
                language: data[0].language,
            }]
        ));
    }


    setTimeout(() => {
        setLoadingAddSnippet(false);
        scrollToBottom();
    }, 1000);

};

export const handleAddNewWorkspace = async (
    setWorkspaces: Dispatch<SetStateAction<Workspace[]>>
) => {
    
    const { data, error } = await supabase
    .from('workspace')
    .insert([
    { name: 'New Workspace'},
    ])
    .select()
    
    setWorkspaces((workspaces) => (
        [
            ...workspaces,
            {
                id: (data as Workspace[])[0].id,
                name: (data as Workspace[])[0].name,
                active: (data as Workspace[])[0].active,
            }
        ]
    ));
}