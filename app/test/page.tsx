
'use client'
import { useEffect } from "react";
import { useAppContext } from "../_context/AppContext";

export default function Test(){
    const {isFullScreen, setIsFullscreen} = useAppContext();

    useEffect(()=> {
        setIsFullscreen(false);
    }, [])
    return  ( <div>
        {isFullScreen ? 'true' : 'false'}
    </div>);
}