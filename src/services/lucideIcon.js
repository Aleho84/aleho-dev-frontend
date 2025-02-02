// services/lucideIcon.js
import {
    BarChart,
    Cherry,
    Code,
    Database,
    Globe,
    HardDrive,
    LaptopMinimalCheck,
    LogOut,
    Menu,
    MessageSquare,
    Server,
    Zap,
    MemoryStickIcon,
    Clock,
    Cpu,
} from 'lucide-react';

const icons = {
    Globe,
    Database,
    Code,
    Zap,
    BarChart,
    HardDrive,
    MessageSquare,
    LogOut,
    Menu,
    Server,
    Cherry,
    MemoryStickIcon,
    Clock,
    Cpu,
};

function lucideIcon(iconName) {
    return icons[iconName] || LaptopMinimalCheck;
}

export default lucideIcon;
