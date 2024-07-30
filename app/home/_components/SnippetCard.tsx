import CodeBlock from '@/app/_components/Codeblock';
import DropdownMenu from '@/app/_components/DropdownMenu';
import IconButton from '@/app/_components/IconButton';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Snippet } from '../types';
import { Copy, Maximize2 } from 'lucide-react';
import { handleUpdateSnippetCode, handleUpdateSnippetDescription, handleUpdateSnippetTitle } from '../_utility/updateData';
import { useAppContext } from '@/app/_context/AppContext';
import { copyTrigger } from '../_utility/otherHandlers';

interface SnippetCardProps {
    index: number;
    value: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({
    index,
    value,
}) => {

    const { setSelectedSnippetsId, selectedSnippetsId, setIsFullscreen, setFullScreenSnippet} = useAppContext();
    return (
        <div key={index} className="bg-slate-100 border border-black rounded h-96">
            <div className="m-2">
                <form className="flex flex-col">
                    <div className="flex">
                        <textarea
                            className="flex-1 h-8 text-2xl bg-slate-100"
                            name="title"
                            maxLength={50}
                            value={value.title}
                            onChange={(event) => handleUpdateSnippetTitle(event, value)}
                        />
                        <input
                            className="w-6 accent-black"
                            type="checkbox"
                            id="Checkbox"
                            name="myCheckbox"
                            key={value.id}
                            onChange={(event) => {
                                setSelectedSnippetsId(
                                    selectedSnippetsId.includes(value.id) ?
                                        selectedSnippetsId.filter((snippetId) => snippetId !== value.id) :

                                        [...selectedSnippetsId, value.id]

                                );
                            }}
                        />
                    </div>
                    <textarea
                        className="bg-slate-100 w-full"
                        name="description"
                        maxLength={110}
                        value={value.description}
                        onChange={(event) => handleUpdateSnippetDescription(event, value)}
                    />
                </form>

                <div className="flex justify-end items-center space-x-2">
                    {value.code.length >= 3000 && <p className="text-red-500">Max characters reached!</p>}
                    <p>{value.language}</p>
                    <IconButton
                        icon={<Maximize2 />}
                        text="Full screen"
                        onClick={() => {
                            setIsFullscreen(true);
                            setFullScreenSnippet(value);
                        }}
                    />
                    <CopyToClipboard text={value.code} onCopy={copyTrigger}>
                        <IconButton icon={<Copy />} text="Copy" onClick={() => { }} elementAfterClick={<p>Copied!</p>} />
                    </CopyToClipboard>
                </div>

                <div className="h-60 overflow-x-hidden rounded-2xl ">
                    <CodeBlock
                        codeValue={value.code}
                        language={value.language}
                        onCodeChange={(codeValue) => handleUpdateSnippetCode(value, codeValue)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SnippetCard;