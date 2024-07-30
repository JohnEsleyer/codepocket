import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import Loading from "/public/loading.svg";
import Image from "next/image";
import IconButton from "../../../_components/IconButton";
import { KeyRound, Trash2 } from "lucide-react";
import { useAppContext } from "@/app/_context/AppContext";
import { updateWorkspaceName } from "../../_utility/updateData";
import { Workspace } from "../../types";

export default function SettingsOverlayPage() {
    const {
        workspaces,
        setWorkspaces,
        activeWorkspace,
        setActiveWorkspace,
        
    } = useAppContext();
    
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsloading] = useState(true);
    const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name as string);
    const [showSaveButton, setShowSaveButton] = useState(false);

   

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

    useEffect(() => {
        setShowSaveButton(true);
    }, [workspaceName]);

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
                <span className="flex items-center">Workspace Name</span>
                <div>
                    {showSaveButton && <button onClick={()=>{
                      updateWorkspaceName(workspaceName, activeWorkspace);
                      setShowSaveButton(false);

                    }}><div className="bg-black rounded text-white text-xs p-2 mr-2">Save</div></button>}
                <input className="p-1 border" value={workspaceName} onChange={(element) => {
                        setWorkspaceName(element.target.value);

                        setActiveWorkspace({
                            ...activeWorkspace as Workspace,
                            name: element.target.value,
                        });
                }}/>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="flex items-center">Email Address</span>
                <input className="p-1 border" disabled={true} value={email} />
            </div>
            <div className="flex justify-between">
                <span className="flex items-center">Username</span>
                <input className="p-1 border" disabled={true} value={username} />
            </div>

            <div className="flex flex-col w-44">
                <a href="/update-password">
                    <IconButton icon={<KeyRound />} text="Change Password" onClick={() => { }} />
                </a>
                <a href="/delete-account">
                    <IconButton  icon={<Trash2 color="red" />} text="Delete Account" onClick={() => { }} />
                </a>
            </div>
        </div>
    );
}