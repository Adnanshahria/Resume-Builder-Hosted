import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
    size?: 'sm' | 'md';
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    label,
    description,
    size = 'sm'
}) => {
    const switchSizes = {
        sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
        md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' }
    };

    const { track, thumb, translate } = switchSizes[size];

    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`
                    relative inline-flex shrink-0 ${track} items-center rounded-full 
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20
                    ${checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}
                `}
            >
                <span
                    className={`
                        ${thumb} rounded-full bg-white shadow-sm 
                        transition-transform duration-200 ease-in-out
                        ${checked ? translate : 'translate-x-0.5'}
                    `}
                />
            </button>
            <div className="flex flex-col">
                <span className="text-xs font-medium">{label}</span>
                {description && (
                    <span className="text-[10px] text-muted-foreground">{description}</span>
                )}
            </div>
        </label>
    );
};

export default ToggleSwitch;
