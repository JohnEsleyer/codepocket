import React from 'react';
import OverlayMenuPage from '../OverlayMenuPage';
import supabase from '@/app/utils/supabase';

interface DeleteCollectionConfirmationOverlayPageProps {
    toDeleteCollection: any;
    setShowOverlayMenuPage: (value: boolean) => void;
    setCollections: (value: any[]) => void;
    buttonOnClick: () => void;
}

const DeleteCollectionConfirmationOverlayPage: React.FC<DeleteCollectionConfirmationOverlayPageProps> = ({
    toDeleteCollection,
    setShowOverlayMenuPage,
    setCollections,
    buttonOnClick,
}) => {
    return (
        <OverlayMenuPage width="w-80" title="Delete collection" disableCloseButton={true} onClose={() => setShowOverlayMenuPage(false)}>
            <p>Are you sure you want to delete this collection?</p>
            <button
                className="bg-black text-white p-2 border rounded"
                onClick={async () => {
                    buttonOnClick();
                }}
            >
                Continue
            </button>
            <button className="p-2 border rounded" onClick={() => setShowOverlayMenuPage(false)}>
                Cancel
            </button>
        </OverlayMenuPage>
    );
};

export default DeleteCollectionConfirmationOverlayPage;
