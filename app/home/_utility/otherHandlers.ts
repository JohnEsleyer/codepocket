import { useAppContext } from "@/app/_context/AppContext";
import supabase from "@/app/utils/supabase";
import { Collection, Link } from "../types";
import { Dispatch, SetStateAction } from "react";

export const handleSignOut = async (
    setShowOverlayMenuPage: (showOverlayMenuPage: boolean) => void,
    setCurrentOverlayMenuPage: (currentOverlayMenuPage: string) => void,
) => {
    setShowOverlayMenuPage(true);
    setCurrentOverlayMenuPage("signout");
};


export const handleShare = async (
    activeCollection: Collection | undefined,
    setLinkId:  (linkId: string) => void,
    setActiveCollection: (collection?: Collection) => void,
    setCollections: Dispatch<SetStateAction<Collection[]>>,
    setShowOverlayMenuPage: (showOverlayMenuPage: boolean) => void,
    setCurrentOverlayMenuPage: (currentOverlayMenuPage: string) => void

) => {
    if (!activeCollection?.shared) {
        const updateCollectionAccessibility = async () => {
            const { data, error } = await supabase
                .from('collection')
                .update({ shared: true })
                .eq('id', activeCollection?.id)
                .select();
        };

        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            return data
        }

        const insertLink = async () => {
            const { data, error } = await supabase
                .from('link')
                .insert([
                    {
                        accessibility: 'public',
                        collection_id: activeCollection?.id,
                        owner_username: (await getUser()).user?.user_metadata.username,
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
        setCollections((collections) => (
            collections.map((value) => {
                if (value.id == activeCollection?.id) {
                    return { ...value, shared: true };
                } else {
                    return value;
                }
            })
        )
        );
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


export const handleMoveSnippets = (
    setCurrentOverlayMenuPage: Dispatch<SetStateAction<string>>,
    setShowOverlayMenuPage: Dispatch<SetStateAction<boolean>>,
) => {
    setCurrentOverlayMenuPage('move');
    setShowOverlayMenuPage(true);
};

export const copyTrigger = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
}