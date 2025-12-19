import * as LucideIcons from 'lucide-react';
import { Package } from 'lucide-react';

export const DeviceIcon = ({ iconName, className }) => {
    // Clean the input name (remove spaces, capitalize first letter if needed, though Lucide is usually PascalCase)
    // Assuming the user types the exact PascalCase name as suggested in the placeholder "Code, Database"

    // Safety check if iconName is valid
    if (!iconName) {
        return <Package className={className} />;
    }

    // Attempt to access the icon from the imported object
    const IconComponent = LucideIcons[iconName];

    // If component exists, render it
    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    // Fallback if name not found
    return <Package className={className} />;
};
