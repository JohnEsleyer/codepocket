import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Loading from "/public/loading.svg";
import Image from "next/image";
import IconButton from "../components/IconButton";


export default function SettingsOverlayPage() {
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                setEmail(data.user.email);
                setIsloading(false);
            }
        }
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-80">
                <Image
                    src={Loading}
                    alt={''}
                    width={30}
                    height={30}

                />
            </div>
        );
    }

    return (
        <div className="h-96">
            <p>Email:{email}</p>
            <p>Display Name:</p>
            <div className="flex flex-col">
            <IconButton icon="password" text="Change Password" onClick={() => { }} />
            <IconButton icon="delete" text="Delete Account" onClick={() => { }} />
            </div>
        </div>
    );
}