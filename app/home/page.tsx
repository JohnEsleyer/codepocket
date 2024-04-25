'use client'

import supabase from "../utils/supabase";
import React, {useEffect, useState} from 'react';

export default function Home(){ 
const [supabaseToken, setSupabaseToken] = useState<string | null>(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
    const storedValue = localStorage.getItem('sb-iqggmlkcwrqvndazdkey-auth-token');
    const parsedJson = JSON.parse(storedValue as string);
    setSupabaseToken(parsedJson.access_token);

    async function supabaseExecution(){
        const {data: {user}} = await supabase.auth.getUser("eyJhbGciOiJIUzI1NiIsImtpZCI6ImRvaGEwSWFieHd1aG9MRTAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE0MDkxNDYzLCJpYXQiOjE3MTQwODc4NjMsImlzcyI6Imh0dHBzOi8vaXFnZ21sa2N3cnF2bmRhemRrZXkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjdlNGY2YWE4LTBhNzYtNGI4OS04NDAzLWMwYzEwMDkyMTM4ZCIsImVtYWlsIjoiY3JlZXBlcm1hbjgzM0Bwcm90b24ubWUiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiY3JlZXBlcm1hbjgzM0Bwcm90b24ubWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiN2U0ZjZhYTgtMGE3Ni00Yjg5LTg0MDMtYzBjMTAwOTIxMzhkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MTQwODc4NjN9XSwic2Vzc2lvbl9pZCI6Ijg4ZDg5NGZmLWJjMzctNDRmYi05ZjY1LWY3MjJkZTdlYmU2MSIsImlzX2Fub255bW91cyI6ZmFsc2V9.e9FowrgI5bdayedbHMhirinmfelIB8LYrnGJnb9aL2A");
        if (user){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }

    supabaseExecution();
});

   if(isLoggedIn){
    return (
        <div>
            Home
        </div>
    );
   }else{
    return (
        <div>
            Error
        </div>
    );
   }
}
