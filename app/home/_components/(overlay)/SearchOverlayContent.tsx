import React from 'react';
import OverlayMenuPage from '../OverlayMenuContent';

interface SearchOverlayPageProps {
    filteredSnippets: any[];
    collections: any[];
    setShowOverlayMenuPage: (value: boolean) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setActiveCollection: (collection: any) => void;
}

const SearchOverlayPage: React.FC<SearchOverlayPageProps> = ({
    filteredSnippets,
    collections,
    setShowOverlayMenuPage,
    handleInputChange,
    setActiveCollection
}) => {
    return (
        <OverlayMenuPage width="w-4/5" title="Search" onClose={() => setShowOverlayMenuPage(false)}>
            <p>What are you looking for?</p>
            <input
                className="text-2xl p-1 bg-slate-100 border border-black rounded w-full"
                name="search"
                type="text"
                placeholder="Type the snippet's title or description"
                onChange={handleInputChange}
            />
            <ul className="h-80 overflow-y-auto">
                {filteredSnippets.length !== 0 ? filteredSnippets.map(item => (
                    <li key={item.id} className="shadow hover:bg-slate-200 bg-slate-100 p-1 border m-1 ">
                        <button
                            className="w-full flex flex-col"
                            onClick={() => {
                                setShowOverlayMenuPage(false);
                                setActiveCollection(collections.find(obj => obj.id === item.collection_id));
                            }}
                        >
                            <div className="w-full flex flex-col">
                                <p className="flex justify-start"><strong>{item.title}</strong></p>
                                <p className="flex justify-start truncate">{item.description}</p>
                            </div>
                            <p className="flex items-center">
                                <span className="material-symbols-outlined">folder</span>
                                {collections.find(obj => obj.id === item.collection_id)?.title}
                            </p>
                        </button>
                    </li>
                )) : <p className="flex justify-center items-center p-16">Press Enter to request a search result</p>}
            </ul>
        </OverlayMenuPage>
    );
};

export default SearchOverlayPage;
