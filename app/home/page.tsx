'use client'

import ProtectedPage from "../templates/protectedpage";
import supabase from "../utils/supabase";
import React, {useEffect, useState} from 'react';

export default function Home(){ 
    return (
        <ProtectedPage>
            <div>
                Home
            </div>
        </ProtectedPage>
    );
}
