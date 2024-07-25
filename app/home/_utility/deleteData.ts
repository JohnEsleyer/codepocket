import supabase from "@/app/utils/supabase";
import { Collection, Snippet } from "../types";
import { Dispatch, SetStateAction } from "react";

export const handleDeleteCollection = async (value: Collection, setShowOverlayMenuPage: (value: boolean) => void, setCurrentOverlayMenuPage: (page: string) => void, setToDeleteCollection: (collection: Collection) => void) => {
    setShowOverlayMenuPage(true);
    setCurrentOverlayMenuPage("deleteCollectionConfirmation");
    setToDeleteCollection(value);
};

export const handleDeleteSnippets = async (selectedSnippetsId: number[], setSnippets: Dispatch<SetStateAction<Snippet[]>>) => {
    selectedSnippetsId.map(async (itemId) => {
        const { error } = await supabase
            .from('snippet')
            .delete()
            .eq('id', itemId);

        if (error) {
            console.log(error);
        } else {
            setSnippets((prevItems) => (
                prevItems.filter((item) => (
                    !selectedSnippetsId.includes(item.id)
                ))
            ));
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
