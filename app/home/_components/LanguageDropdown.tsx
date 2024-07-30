import DropdownMenu from '@/app/_components/DropdownMenu';
import React from 'react';
import { Snippet } from '../types';
import { useAppContext } from '@/app/_context/AppContext';
import { languages } from '../constants';
import supabase from '@/app/utils/supabase';



const LanguageDropdown: React.FC  = () => {

    const {
        fullScreenSnippet,
        setSnippets,
        snippets,
        setFullScreenSnippet,
    } = useAppContext();

    const handleLanguageChange = async (lang: string) => {
        setSnippets(snippets.map((item) =>
                item.id === fullScreenSnippet.id ? { ...item, language: lang } : item
            )
        );
        setFullScreenSnippet({ ...fullScreenSnippet, language: lang });
        const { error } = await supabase
            .from('snippet')
            .update({ language: lang })
            .eq('id', fullScreenSnippet.id);

        if (error) {
            console.log(error);
        }
    };

    return (
        <DropdownMenu buttonText={fullScreenSnippet.language}>
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
