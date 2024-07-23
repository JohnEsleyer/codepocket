import CodeBlock from '@/app/components/Codeblock';
import DropdownMenu from '@/app/components/DropdownMenu';
import IconButton from '@/app/components/IconButton';
import React, { Dispatch, SetStateAction } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Snippet } from '../types';

interface SnippetCardProps {
    index: number;
    value: Snippet;
    languages: string[];
    handleUpdateSnippetTitle: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;
    handleUpdateSnippetDescription: (event: React.ChangeEvent<HTMLTextAreaElement>, value: any) => void;
    handleUpdateSnippetLanguage: (value: any, lang: string) => void;
    handleUpdateSnippetCode: (value: any, codeValue: string) => void;
    setSelectedSnippetsId: Dispatch<SetStateAction<number[]>>;
    setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
    setFullScreenSnippet: React.Dispatch<React.SetStateAction<any>>;
    copyTrigger: () => void;
}

const SnippetCard: React.FC<SnippetCardProps> = ({
    index,
    value,
    languages,
    handleUpdateSnippetTitle,
    handleUpdateSnippetDescription,
    handleUpdateSnippetLanguage,
    handleUpdateSnippetCode,
    setSelectedSnippetsId,
    setIsFullscreen,
    setFullScreenSnippet,
    copyTrigger,
}) => {
    return (
        <div key={index} className="bg-slate-100 border border-black rounded h-96">
            <div key={index} className="m-2">
                <form className="flex flex-col">
                    <div className="flex">
                        <input
                            className="flex-1 text-2xl bg-slate-100"
                            name="title"
                            type="text"
                            disabled={false}
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
                                setSelectedSnippetsId((prevItemsId) => {
                                    if (prevItemsId.includes(value.id)) {
                                        return prevItemsId.filter((snippetId) => snippetId !== value.id);
                                    } else {
                                        return [...prevItemsId, value.id];
                                    }
                                });
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
                    <div className="hover:bg-slate-300 rounded">
                        <DropdownMenu buttonText={value.language}>
                            <div className="h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
                                {languages.map((lang, index) => (
                                    <button key={index} onClick={() => handleUpdateSnippetLanguage(value, lang)}>
                                        <p className="hover:bg-slate-300 p-1">{lang}</p>
                                    </button>
                                ))}
                            </div>
                        </DropdownMenu>
                    </div>
                    <IconButton
                        icon="open_in_full"
                        text="Full screen"
                        onClick={() => {
                            setIsFullscreen(true);
                            setFullScreenSnippet(value);
                        }}
                    />
                    <CopyToClipboard text={value.code} onCopy={copyTrigger}>
                        <IconButton icon="content_copy" text="Copy" onClick={() => {}} elementAfterClick={<p>Copied!</p>} />
                    </CopyToClipboard>
                </div>

                <div className="h-60 overflow-x-hidden rounded-2xl">
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