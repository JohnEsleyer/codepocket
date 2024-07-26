import DropdownMenu from '@/app/_components/DropdownMenu';
import React from 'react';
import { Snippet } from '../types';


interface LanguageDropdownProps {
    buttonText: string;
    languages: string[];
    fullScreenSnippet: Snippet;
    setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
    setFullScreenSnippet: React.Dispatch<React.SetStateAction<Snippet>>;
    supabase: any;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
    buttonText,
    languages,
    fullScreenSnippet,
    setSnippets,
    setFullScreenSnippet,
    supabase
}) => {
    const handleLanguageChange = async (lang: string) => {
        setSnippets((prevItems) =>
            prevItems.map((item) =>
                item.id === fullScreenSnippet.id ? { ...item, language: lang } : item
            )
        );
        setFullScreenSnippet((prevValue) => {
            return { ...fullScreenSnippet, language: lang };
        });
        const { error } = await supabase
            .from('snippet')
            .update({ language: lang })
            .eq('id', fullScreenSnippet.id);

        if (error) {
            console.log(error);
        }
    };

    return (
        <DropdownMenu buttonText={buttonText}>
            <div className="h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
                {languages.map((lang, index) => (
                    <button key={index} onClick={() => handleLanguageChange(lang)}>
                        <p className="hover:bg-slate-300 p-1">{lang}</p>
                    </button>
                ))}
            </div>
        </DropdownMenu>
    );
};

export default LanguageDropdown;
