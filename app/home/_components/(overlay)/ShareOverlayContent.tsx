import React, { useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OverlayMenuPage from '../OverlayMenuContent';
import IconButton from '@/app/components/IconButton';
import { handleDeleteLink } from '../../_utility/deleteData';

interface ShareOverlayPageProps {
    linkId: string;
    setShowOverlayMenuPage: (value: boolean) => void;
}

const ShareOverlayPage: React.FC<ShareOverlayPageProps> = ({
    linkId,
    setShowOverlayMenuPage
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <OverlayMenuPage width="w-96" title="Share" onClose={() => setShowOverlayMenuPage(false)}>
            <div>
                <p>Collection is shared publicly.</p>
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
                        <IconButton icon="open_in_new" text="Visit" onClick={() => { }}/>
                    </a>
                    </div>
                    <div className="bg-black rounded p-1 m-2">
                    <IconButton
                            noBackground={true}
                            isDark={true}
                            icon="lock"
                            text="Set to private"
                            onClick={() => {
                                handleDeleteLink(linkId,)
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
