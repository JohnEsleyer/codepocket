import React from 'react';
import OverlayMenuPage from '../OverlayMenuContent';
import supabase from '@/app/utils/supabase';
import { FolderCode } from 'lucide-react';
import { useAppContext } from '@/app/_context/AppContext';

interface MoveOverlayPageProps {
    onClick: (value: any, index: number) => void;
}

const MoveOverlayPage: React.FC<MoveOverlayPageProps> = ({

    onClick,
}) => {

    const {collections, setShowOverlayMenuPage, activeWorkspace} = useAppContext();
    
    return (
        <OverlayMenuPage width="w-4/5" title="Move to collection" onClose={() => setShowOverlayMenuPage(false)}>
            <p>Select a collection</p>
            <div className='overflow-y-auto'>
                {collections.map((value, index) => (
                    value.workspace_id == activeWorkspace?.id && 
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
                                <FolderCode />
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
