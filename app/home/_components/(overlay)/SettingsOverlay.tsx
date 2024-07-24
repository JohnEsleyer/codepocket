import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import Loading from "/public/loading.svg";
import Image from "next/image";
import IconButton from "../../../components/IconButton";

export default function SettingsOverlayPage() {
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                setEmail(data.user.email);
                setUsername(data.user.user_metadata.username);
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
        <div className="h-96 p-2">
            <div className="flex justify-between">
                <span className="flex items-center">Email Address</span>
                <input className="p-1 border" disabled={true} value={email}/>
            </div>
            <div className="flex justify-between">
                <span className="flex items-center">Username</span>
                <input className="p-1 border" disabled={true} value={username}/>
            </div>
            <div className="flex flex-col w-44">
            <a href="/update-password">
            <IconButton icon="password" text="Change Password" onClick={() => { }} />
            </a>
            <a  href="/delete-account">
            <IconButton iconColor="red" textColor="red" icon="delete" text="Delete Account" onClick={() => { }} />
            </a>
            </div>
        </div>
    );
}