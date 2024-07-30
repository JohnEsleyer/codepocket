import supabase from "@/app/utils/supabase";
import { Collection, Snippet } from "../types";
import { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/app/_context/AppContext";

export const handleDeleteCollection = async (
    value: Collection,
    setCurrentOverlayMenuPage: (currentOverlayMenuPage: string) => void,
    setShowOverlayMenuPage: (showOverlayMenuPage: boolean) => void,
) => {
    setShowOverlayMenuPage(true);
    setCurrentOverlayMenuPage("deleteCollectionConfirmation");
    // setToDeleteCollection(value);
};

export const handleDeleteSnippets = async () => {
    const {selectedSnippetsId, setSnippets, snippets} = useAppContext();
    selectedSnippetsId.map(async (itemId) => {
        const { error } = await supabase
            .from('snippet')
            .delete()
            .eq('id', itemId);

        if (error) {
            console.log(error);
        } else {
            setSnippets(snippets.filter((item) => (
                    !selectedSnippetsId.includes(item.id)
                ))
            );
        }
    });
};

export const handleDeleteLink = async (
    linkId: string,
) => {

    const { error } = await supabase
        .from('link')
        .delete()
        .eq('id', linkId);



    if (error) {
        console.log(error);
    }

}
