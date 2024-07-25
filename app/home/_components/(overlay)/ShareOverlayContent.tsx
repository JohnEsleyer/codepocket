import React, { Dispatch, SetStateAction, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OverlayMenuPage from '../OverlayMenuContent';
import IconButton from '@/app/components/IconButton';
import { handleDeleteLink } from '../../_utility/deleteData';
import { Collection } from '../../types';
import supabase from '@/app/utils/supabase';

interface ShareOverlayPageProps {
    linkId: string;
    setShowOverlayMenuPage: (value: boolean) => void;
    setCollections: Dispatch<SetStateAction<Collection[]>>;
    collections: Collection[];
    activeCollection: Collection | undefined;
    setActiveCollection: Dispatch<SetStateAction<Collection | undefined>>;
}

const ShareOverlayPage: React.FC<ShareOverlayPageProps> = ({
    linkId,
    setShowOverlayMenuPage,
    setCollections,
    collections,
    activeCollection,
    setActiveCollection,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <OverlayMenuPage width="w-96" title="Share" onClose={() => setShowOverlayMenuPage(false)}>
            <div>
                <p className="text-xl">Collection is now shared publicly.</p>
                <p>You can access it here:</p>
                <input ref={inputRef} className="p-2 w-full border border-black rounded" value={`${window.location.hostname}/share/${linkId}`} readOnly />
                <div className="flex gap-2">
                    <CopyToClipboard text={`${window.location.hostname}/share/${linkId}`}>
                        <IconButton
                            icon="content_copy"
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
                            <IconButton icon="open_in_new" text="Visit" onClick={() => { }} />
                        </a>
                    </div>
                    <div className="bg-black rounded p-1 m-2">
                        <IconButton
                            noBackground={true}
                            isDark={true}
                            icon="lock"
                            textColor='slate'
                            text="Set to private"
                            disableHover={true}
                            onClick={async () => {
                                handleDeleteLink(linkId)

                                const { data, error } = await supabase
                                    .from('collection')
                                    .update({ shared: false})
                                    .eq('id', activeCollection?.id)
                                    .select()

                                setCollections((prevValues: Collection[]) => {
                                    return prevValues.map((value: Collection) => {
                                        if (value.id === activeCollection?.id) {
                                            return {
                                                ...value,
                                                shared: false,  
                                            };
                                        }
                                        return value;
                                    });
                                });

                                setActiveCollection((prevValue) => {
                                    if (prevValue) {
                                      return {
                                        ...prevValue,
                                        shared: false,
                                      };
                                    }
                                    return prevValue; // Ensure it returns the previous value if it's undefined
                                  });
                                  
                                setShowOverlayMenuPage(false);
                            }}
                            elementAfterClick={<p className="pt-1">Copied!</p>}
                        />
                    </div>
                </div>
            </div>
        </OverlayMenuPage>
    );
}
export default ShareOverlayPage;
