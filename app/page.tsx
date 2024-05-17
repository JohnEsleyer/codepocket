
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "./utils/supabase";
import { useRouter } from "next/navigation";


type FormState = {
  email: string;
  password: string;
};


export default function Home() {

  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({ email: '', password: '' });
  const [errorText, setErrorText] = useState<string>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    });

    if (!error) {
      router.push('/home');
      console.log("success");
    }else{
      setErrorText(error.message);
    }

    console.log('Logging in with:', formState);
  };

  return (
    <div className="flex justify-center flex-col text-black h-screen">
      <p className="text-4xl font-bold p-2 flex justify-center">CodePocket</p>
      <div className="flex justify-center p-4">
      <div className="rounded bg-slate-200 p-4">
        <h1 className="flex justify-center text-xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="flex justify-center flex-col">
          <label>
            <p>Email</p>
            <input className="p-1 pr-10" type="text" name="email" value={formState.email} onChange={handleInputChange} />
          </label>
          <label>
            <p>Password</p>
            <input className="p-1 pr-10 text-black" type="password" name="password" value={formState.password} onChange={handleInputChange} />
          </label>
          <br />
          <button className="bg-black text-white p-1 rounded" type="submit">Login</button>
        </form>
        {errorText && <p className="text-red-500 flex justify-center">{errorText}</p>}
      </div>
      </div>
    </div>
  );
}
