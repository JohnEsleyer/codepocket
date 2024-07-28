
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";
import { User } from "@supabase/supabase-js";

type FormState = {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
};

export default function Register() {
    const router = useRouter();

    const [formState, setFormState] = useState<FormState>({email: '', username: '', password: '', confirm_password: ''});
    const [errorText, setErrorText] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const createDefaultWorkspace = async (user: User | null ) => {

      const { data, error } = await supabase
      .from('workspace')
      .insert([
        { name: "My workspace", user_id: user?.id},
      ])
      .select()
        
    }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      if (formState.password !== formState.confirm_password){

        setErrorText("Passwords do not match. Please try again.");
        setIsLoading(false);
        return
      }

      const {data, error} = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password,
        options: {
          data: {
            username: formState.username,
          }
        }
      });

      createDefaultWorkspace(data.user);


      if (!error) {
      router.push('/home');
      console.log("success");
    }else{
      setErrorText(error.message);
    }
      setIsLoading(false);
    };

  return (
    <div className="flex justify-center flex-col text-black h-screen bg-slate-700">
    <button onClick={() => {
      router.replace('/');
    }}>
      <p className="text-4xl font-bold p-2 flex justify-center text-white">CodePocket</p>
    </button>
    <div className="flex justify-center p-4">
    <div className="rounded bg-slate-200 p-4">
      <h1 className="flex justify-center text-xl font-bold">Create an account</h1>
      <form onSubmit={handleSubmit} className="flex justify-center flex-col">
        <label>
          <p>Email</p>
          <input required className="p-1 w-full" type="text" placeholder="firstname@email.com" name="email" value={formState.email} onChange={handleInputChange} />
        </label>
        <label>
          <p>Username</p>
          <input required className="p-1 w-full" type="text" name="username" placeholder="MrPool123" value={formState.username} onChange={handleInputChange} />
        </label>
        <label>
          <p>Password</p>
          <input required className="p-1 w-full text-black" type="password" name="password" placeholder="**********" value={formState.password} onChange={handleInputChange} />
        </label>
        <label>
          <p>Confirm Password</p>
          <input required className="p-1 w-full text-black" type="password" name="confirm_password" placeholder="**********" value={formState.confirm_password} onChange={handleInputChange} />
        </label>
        <br />
        <button className="bg-black text-white p-1 rounded" type="submit">Register</button>
      </form>
      <a className="underline flex justify-center" href="/login">
        Login
      </a>
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
