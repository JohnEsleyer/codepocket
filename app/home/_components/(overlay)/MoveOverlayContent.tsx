import React from 'react';
import OverlayMenuPage from '../OverlayMenuContent';
import supabase from '@/app/utils/supabase';

interface MoveOverlayPageProps {
    collections: any[];
    setShowOverlayMenuPage: (value: boolean) => void;
    setSnippets: (value: any[]) => void;
    selectedSnippetsId: number[];
    onClick: (value: any, index: number) => void;
}

const MoveOverlayPage: React.FC<MoveOverlayPageProps> = ({
    collections,
    setShowOverlayMenuPage,
    setSnippets,
    selectedSnippetsId,
    onClick,
}) => {
    return (
        <OverlayMenuPage width="w-4/5" title="Move to collection" onClose={() => setShowOverlayMenuPage(false)}>
            <p>Select a collection</p>
            <div>
                {collections.map((value, index) => (
                    <button
                        key={index}
                        className="flex justify-start w-full"
                        onClick={() => {
                            onClick(value, index);
                        }}
                    >
                        <div className="w-full space-x-10 flex text-xl pl-2 hover:bg-neutral-900 hover:text-white hover:rounded">
                            <div className="flex overflow-x-auto">
                                <p className="flex items-center">
                                    <span className="material-symbols-outlined">folder</span>
                                    {value.title}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </OverlayMenuPage>
    );
};

export default MoveOverlayPage;
