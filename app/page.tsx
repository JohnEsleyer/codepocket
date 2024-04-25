
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

  const router =  useRouter();

  const [formState, setFormState] = useState<FormState>({ email: '', password: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {data, error} = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    });
    
    if (!error){
      router.push('/home');
      console.log("success");
    }

    console.log('Logging in with:', formState);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formState.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formState.password} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
