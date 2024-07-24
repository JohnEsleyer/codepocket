import React from 'react';

interface CollectionsProps {
  collections: any[];
  setSelectedSnippetsId: (ids: any[]) => void;
  setActiveCollection: (collection: any) => void;
  activeCollection: any;
  handleDeleteCollection: (value: any, setShowOverlayMenuPage: any, setCurrentOverlayMenuPage: any, setToDeleteCollection: any) => void;
  setShowOverlayMenuPage: (show: boolean) => void;
  setCurrentOverlayMenuPage: (page: string) => void;
}

const Collections: React.FC<CollectionsProps> = ({
  collections,
  setSelectedSnippetsId,
  setActiveCollection,
  activeCollection,
  handleDeleteCollection,
  setShowOverlayMenuPage,
  setCurrentOverlayMenuPage
}) => (
  <div className="flex flex-col overflow-y-auto pl-2">
    {collections.map((value, index) => (
      <button
        key={index}
        className="flex justify-start"
        onClick={() => {
          setSelectedSnippetsId([]);
          setActiveCollection(value);
        }}
      >
        <div className={`w-full flex text-xl pl-2 ${activeCollection?.id == value.id ? "bg-neutral-900 text-white" : "hover:bg-slate-300 text-black"} hover:rounded`}>
          <div className="flex overflow-x-auto w-80">
            <div className="truncate flex">
              <div className="flex items-center">
                <span className="material-symbols-outlined">folder</span>
              </div>
              <p className="truncate">{value.title}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-end pr-2 ">
            <button onClick={() => handleDeleteCollection(value, setShowOverlayMenuPage, setCurrentOverlayMenuPage, setActiveCollection)}>
              <span className="material-symbols-outlined flex items-center">delete</span>
            </button>
          </div>
        </div>
      </button>
    ))}
  </div>
);

export default Collections;
