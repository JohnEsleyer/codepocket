import React, { Dispatch, SetStateAction, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OverlayMenuPage from '../OverlayMenuContent';
import IconButton from '@/app/_components/IconButton';
import { handleDeleteLink } from '../../_utility/deleteData';
import { Collection } from '../../types';
import supabase from '@/app/utils/supabase';
import { Copy, ExternalLink, GlobeLock } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { useAppContext } from '@/app/_context/AppContext';



const ShareOverlayPage: React.FC = ({
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        linkId,
        setShowOverlayMenuPage,
        setCollections,
        collections,
        activeCollection,
        setActiveCollection,
    } = useAppContext();

    return (
        <OverlayMenuPage width="w-96" title="Share" onClose={() => setShowOverlayMenuPage(false)}>
            <div>
                <p className="text-xl">Collection is shared publicly.</p>
                <p>You can access it here:</p>
                <input ref={inputRef} className="p-2 w-full border border-black rounded" value={`${window.location.hostname}/share/${linkId}`} readOnly />
                <div className="flex gap-2">
                    <CopyToClipboard text={`${window.location.hostname}/share/${linkId}`}>
                        <IconButton
                            icon={<Copy/>}
                            text="Copy"
                            onClick={() => {
                                if (inputRef.current) {
                                    inputRef.current.select();
                                }
                            }}
                            elementAfterClick={<p className="pt-1">Copied!</p>}
                        />
                    </CopyToClipboard>
                    <div className="flex items-center">
                        <a href={`/share/${linkId}`} target="_blank" rel="noopener noreferrer">
                            <IconButton icon={ <ExternalLink />}text="Visit" onClick={() => { }} />
                        </a>
                    </div>
                    <div className="bg-black rounded p-1 m-2 flex text-white items-center">
                        <GlobeLock/>
                        <button
                            className="p-2"
                            onClick={async () => {
                                handleDeleteLink(linkId)

                                const { data, error } = await supabase
                                    .from('collection')
                                    .update({ shared: false})
                                    .eq('id', activeCollection?.id)
                                    .select()

                                setCollections(
                                    collections.map((value: Collection) => {
                                        if (value.id === activeCollection?.id) {
                                            return {
                                                ...value,
                                                shared: false,  
                                            };
                                        }
                                        return value;
                                    })
                                );

                                setActiveCollection(
                                    activeCollection ? {
                                        ...activeCollection,
                                        shared: false,
                                      } : activeCollection,
                                  );
                                  
                                setShowOverlayMenuPage(false);
                            }}
                            
                        > Set to private </button>
                    </div>
                </div>
            </div>
        </OverlayMenuPage>
    );
}
export default ShareOverlayPage;
