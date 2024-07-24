import React from 'react';
import SettingsOverlayPage from './SettingsOverlay';
import OverlayMenuPage from '../OverlayMenuPage';

interface SettingsOverlayPageWrapperProps {
    setShowOverlayMenuPage: (value: boolean) => void;
}

const SettingsOverlayPageWrapper: React.FC<SettingsOverlayPageWrapperProps> = ({
    setShowOverlayMenuPage
}) => {
    return (
        <OverlayMenuPage width="w-4/5" title="Settings" onClose={() => setShowOverlayMenuPage(false)}>
            <SettingsOverlayPage />
        </OverlayMenuPage>
    );
};

export default SettingsOverlayPageWrapper;
