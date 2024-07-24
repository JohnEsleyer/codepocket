import React from 'react';
import { useRouter } from 'next/router';
import OverlayMenuPage from '../OverlayMenuPage';
import supabase from '@/app/utils/supabase';

interface SignOutOverlayPageProps {
    setShowOverlayMenuPage: (value: boolean) => void;
}

const SignOutOverlayPage: React.FC<SignOutOverlayPageProps> = ({
    setShowOverlayMenuPage
}) => {
    const router = useRouter();

    return (
        <OverlayMenuPage width="w-80" title="Sign Out" disableCloseButton={true} onClose={() => setShowOverlayMenuPage(false)}>
            <p>Are you sure you want to sign out?</p>
            <button
                className="bg-black text-white p-2 border rounded"
                onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    router.replace('/');
                }}
            >
                Continue
            </button>
            <button className="p-2 border rounded" onClick={() => setShowOverlayMenuPage(false)}>
                Cancel
            </button>
        </OverlayMenuPage>
    );
};

export default SignOutOverlayPage;
