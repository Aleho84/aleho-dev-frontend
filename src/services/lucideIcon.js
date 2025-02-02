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
    Bot,    
} from 'lucide-react';

const icons = {
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
    Bot,     
};

function lucideIcon(iconName) {
    return icons[iconName] || LaptopMinimalCheck;
}

export default lucideIcon;
