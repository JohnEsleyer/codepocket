
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useRouter } from "next/navigation";
import Loading from "/public/loading.svg";

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


      if (!error) {
      router.push('/home');
      console.log("success");
    }else{
      setErrorText(error.message);
    }
      setIsLoading(false);
    };

  return (
    <div className="flex justify-center flex-col text-black h-screen">
    <button onClick={() => {
      router.replace('/');
    }}>
      <p className="text-4xl font-bold p-2 flex justify-center">CodePocket</p>
    </button>
    <div className="flex justify-center p-4">
    <div className="rounded bg-slate-200 p-4">
      <h1 className="flex justify-center text-xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex justify-center flex-col">
        <label>
          <p>Email</p>
          <input required className="p-1 w-full" type="text" name="email" value={formState.email} onChange={handleInputChange} />
        </label>
        <label>
          <p>Username</p>
          <input required className="p-1 w-full" type="text" name="username" value={formState.username} onChange={handleInputChange} />
        </label>
        <label>
          <p>Password</p>
          <input required className="p-1 w-full text-black" type="password" name="password" value={formState.password} onChange={handleInputChange} />
        </label>
        <label>
          <p>Confirm Password</p>
          <input required className="p-1 w-full text-black" type="password" name="confirm_password" value={formState.confirm_password} onChange={handleInputChange} />
        </label>
        <br />
        <button className="bg-black text-white p-1 rounded" type="submit">Register</button>
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
