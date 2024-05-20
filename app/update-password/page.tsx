
'use client'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";
import supabase from "../utils/supabase";
import { User } from "@supabase/supabase-js";

type FormState = {
    currentPass: string;
    newPass: string;
    confirmPass: string;
};


export default function Home() {

    const router = useRouter();

    const [formState, setFormState] = useState<FormState>({ currentPass: '', newPass: '', confirmPass: '' });
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

            const { data, error } = await supabase.auth.signInWithPassword({
                email: user?.email as string,
                password: formState.currentPass,
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
            }else{
                console.log('user.email:' + user?.email);
                // Check if user password is correct
                if (!signIn(user)) {
                    return false;
                }
            }
        }

        if (!getUser) {
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: formState.newPass,
        })

        if (!error) {
            router.push('/home');
            console.log("success");
        } else {
            setErrorText(error.message);
        }

        setIsLoading(false);

    };

    return (
        <div className="flex justify-center flex-col text-black h-screen">
            <p className="text-xl font-bold p-2 flex justify-center">Update Password</p>
            <div className="flex justify-center p-4">
                <div className="rounded bg-slate-200 p-4 flex justify-center flex-col">
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col">
                        <label>
                            <p>Current Password</p>
                            <input required className="p-1 w-full text-black" type="password" name="currentPass" value={formState.currentPass} onChange={handleInputChange} />
                        </label>
                        <label>
                            <p>New Password</p>
                            <input required className="p-1 w-full text-black" type="password" name="newPass" value={formState.newPass} onChange={handleInputChange} />
                        </label>
                        <label>
                            <p>Confirm New Password</p>
                            <input required className="p-1 w-full text-black" type="password" name="confirmPass" value={formState.confirmPass} onChange={handleInputChange} />
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
