import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import SnippetCard from '../_components/SnippetCard';
import { Snippet } from '../types';

interface SnippetsProps {
  activeCollection: any;
  snippets: any[];
  singleColumn: boolean;
  scrollableDiv: React.RefObject<HTMLDivElement>;
  handleUpdateSnippetTitle: (event: ChangeEvent<HTMLInputElement>, value: Snippet, setSnippets: Dispatch<SetStateAction<Snippet[]>>) => void;
  handleUpdateSnippetDescription: (event: React.ChangeEvent<HTMLTextAreaElement>, value: Snippet, setSnippets: Dispatch<SetStateAction<Snippet[]>>) => void;
  handleUpdateSnippetLanguage: (value: Snippet, code: string, setSnippets: Dispatch<SetStateAction<Snippet[]>>) => void;
  handleUpdateSnippetCode: (value: Snippet, code: string, setSnippets: Dispatch<SetStateAction<Snippet[]>>) => void;
  setSelectedSnippetsId: Dispatch<SetStateAction<number[]>>;
  setIsFullscreen: Dispatch<SetStateAction<boolean>>;
  setFullScreenSnippet: (snippet: any) => void;
  copyTrigger: () => void;
  setSnippets: Dispatch<SetStateAction<Snippet[]>>;
  languages: string[];
  disable: boolean;
}

const Snippets: React.FC<SnippetsProps> = ({
  activeCollection,
  snippets,
  singleColumn,
  scrollableDiv,
  handleUpdateSnippetTitle,
  handleUpdateSnippetDescription,
  handleUpdateSnippetLanguage,
  handleUpdateSnippetCode,
  setSelectedSnippetsId,
  setIsFullscreen,
  setFullScreenSnippet,
  copyTrigger,
  setSnippets,
  languages,
  disable,
}) => (
  !activeCollection || disable ? 
    <div className="bg-slate-300 flex-1 flex justify-center items-center text-gray-800">
      <span>Select or create a collection to start adding new code snippets</span>
    </div>
    :
    <div className={`swapy-container flex-1 bg-slate-300 grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-2'} p-2 gap-2 overflow-y-auto justify-center`} ref={scrollableDiv}>
      {snippets.map((value, index) => {
        if (value.collection_id !== activeCollection.id) return null;
        return (
          <SnippetCard
            key={index}
            index={index}
            value={value}
            handleUpdateSnippetTitle={handleUpdateSnippetTitle}
            handleUpdateSnippetDescription={handleUpdateSnippetDescription}
            handleUpdateSnippetLanguage={handleUpdateSnippetLanguage}
            handleUpdateSnippetCode={handleUpdateSnippetCode}
            setSelectedSnippetsId={setSelectedSnippetsId}
            setIsFullscreen={setIsFullscreen}
            setFullScreenSnippet={setFullScreenSnippet}
            copyTrigger={copyTrigger}
            setSnippets={setSnippets}
            languages={languages}
          />
        );
      })}
    </div>
);

export default Snippets;
