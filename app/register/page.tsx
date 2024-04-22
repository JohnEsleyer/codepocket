
'use client'
import Image from "next/image";
import { useState } from "react";
import supabase from "../utils/supabase";

type FormState = {
    email: string;
    password: string;
  };


export default function Register() {
    const [formState, setFormState] = useState<FormState>({email: '', password: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const {data, error} = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password
      });

      if (error){
        console.log(error);
      }
      console.log('Registering with:', formState);
    };

  return (
        <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" name="email" value={formState.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" value={formState.password} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
  );
}
