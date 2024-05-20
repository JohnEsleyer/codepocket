
'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";

type FormState = {
    password: string;
};

type ResponseMessage = {
    message: string;
}


export default function Home() {

    const router = useRouter();

    const [formState, setFormState] = useState<FormState>({ password: '' });
    const [errorText, setErrorText] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // Check if password is correct by signing the user again.
        const signIn = async (user: User | null) => {
            console.log(user?.email as string);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user?.email as string,
                password: formState.password,
            });

            if (error) {
                console.log(error);
                setErrorText('Wrong Password');
                return false;
            } else {
                console.log('Success');
            }
        }

        // Fetch current user
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error);
            } else {
                
                // Check if user password is correct
                if (!signIn(user)) {
                    return false;
                }
                return user?.id as string
            }
        }

        const userId = getUser();
        if (!userId) {
            return;
        }

        try {
            console.log('userId:' + userId);
            const response = await fetch('/api/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (response.status !== 200) {
                router.push('/');
                console.log("success");
            } else {
                const message = (await (response.json() as Promise<ResponseMessage>)).message;
                setErrorText(message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }

        setIsLoading(false);

    };

    return (
        <div className="flex justify-center flex-col text-black h-screen">
            <p className="text-xl font-bold p-2 flex justify-center">Account Deletion Confirmation</p>
            <div className="flex justify-center p-4">
                <div className="rounded bg-slate-200 p-4 flex justify-center flex-col">
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col">

                        <label>
                            <p>Password</p>
                            <input required className="p-1 w-full text-black" type="password" name="password" value={formState.password} onChange={handleInputChange} />
                        </label>
                        <br />
                        <button className="bg-black text-white p-1 rounded" type="submit">Login</button>

                    </form>

                    {errorText && <p className="text-red-500 flex justify-center">{errorText}</p>}
                    {isLoading &&
                        <div className="flex justify-center">
                            <Image src={Loading} alt="Loading" className="w-10 h-10" />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
