'use client'

import { Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";
import React, { Children, ReactNode, useEffect, useState } from 'react';

interface Props {
    children: ReactNode;
}

export default function ProtectedPage({ children }: Props) {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        
        async function supabaseExecution() {
            // const { data: { user } } = await supabase.auth.getUser(supabaseToken!);
            // if (user) {
            //     setIsLoggedIn(true);
 
            // } else {
            //     setIsLoggedIn(false);
            // }

            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
              })
        }
        supabaseExecution();
        

    }, []);

    if (session) {
        return (
            <div>
                {children}
            </div>
        );
    } else {
        return (
            <div>
                Error
            </div>
        );
    }
}
