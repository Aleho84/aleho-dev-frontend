'use client';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2, Monitor, Menu } from 'lucide-react';
import { getDevices, createDevice, updateDevice, deleteDevice } from '../../services/api';
import { DeviceForm } from './DeviceForm';
import Sidebar from '../child/Sidebar';
import { getUserData } from '../../services/auth';
import { DeviceIcon } from './DeviceIcon';
import { DeviceCard } from './DeviceCard';

export default function DevicePanel() {
    const [devices, setDevices] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState(null);
    const [error, setError] = useState(null);

    // Sidebar state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState({ name: '', image: '' });

    useEffect(() => {
        const loadData = async () => {
            try {
                setUserData(getUserData());
                const data = await getDevices();
                setDevices(data);
            } catch (error) {
                console.error('Failed to fetch devices', error);
                setError('Failed to load devices.');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleAddDevice = async (data) => {
        setIsSubmitting(true);
        setError('');
        try {
            const response = await createDevice(data);
            setDevices([...devices, response]);
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error adding device', error);
            setError(`Failed to add device: ${error.message}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateDevice = async (data) => {
        setIsSubmitting(true);
        setError('');
        try {
            const response = await updateDevice(currentDevice._id, data);
            setDevices(
                devices.map((dev) => (dev._id === response._id ? response : dev))
            );
            setIsDialogOpen(false);
            setCurrentDevice(null);
        } catch (error) {
            console.error('Error updating device', error);
            setError(`Failed to update device: ${error.message}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteDevice = async (id) => {
        if (!confirm('Are you sure you want to delete this device?')) return;
        setIsDeletingId(id);
        try {
            await deleteDevice(id);
            setDevices(devices.filter((dev) => dev._id !== id));
        } catch (error) {
            console.error('Error deleting device', error);
            setError(`Failed to delete device: ${error.message}.`);
        } finally {
            setIsDeletingId(null);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-[#c9d1d9]">
            {/* Mobile menu button */}
            <button
                className="md:hidden p-4 text-white"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Sidebar */}
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                userData={userData}
                setIsLoggedIn={() => { }}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-[#161b22] border-b border-[#30363d] p-4 flex justify-between items-center shadow-sm">
                    <div className="flex items-center">
                        <Monitor className="h-6 w-6 mr-2 text-[#c9d1d9]" />
                        <h1 className="text-xl font-semibold text-white">Device Management</h1>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="hover:bg-[#30363d] text-[#c9d1d9]"
                                onClick={() => {
                                    setCurrentDevice(null);
                                    setError('');
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Device
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl bg-[#161b22] text-[#c9d1d9] border-[#30363d] sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className="text-white">
                                    {currentDevice ? 'Edit Device' : 'Add New Device'}
                                </DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="max-h-[80vh]">
                                <DeviceForm
                                    device={currentDevice}
                                    onSubmit={currentDevice ? handleUpdateDevice : handleAddDevice}
                                    isSubmitting={isSubmitting}
                                />
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </header>

                <main className="flex-1 overflow-auto p-6">
                    <div className="bg-[#161b22] rounded-lg shadow-sm border border-[#30363d]">
                        {isLoading ? (
                            <div className="space-y-4 p-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-20 w-full bg-[#30363d]" />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Desktop view */}
                                <div className="hidden md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-[#21262d] border-b border-[#30363d]">
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    Icon
                                                </TableHead>
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    Name
                                                </TableHead>
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    Service
                                                </TableHead>
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    IP
                                                </TableHead>
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    Port
                                                </TableHead>
                                                <TableHead className="text-sm font-medium text-[#8b949e]">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {devices.map((device) => (
                                                <TableRow
                                                    key={device._id}
                                                    className="hover:bg-[#21262d] border-b border-[#30363d]"
                                                >
                                                    <TableCell className="font-medium text-[#c9d1d9]">
                                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                                                            <DeviceIcon iconName={device.icon} className="h-5 w-5 text-white" />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium text-[#c9d1d9]">
                                                        {device.name}
                                                    </TableCell>
                                                    <TableCell className="text-[#8b949e]">
                                                        {device.service}
                                                    </TableCell>
                                                    <TableCell className="text-[#8b949e] font-mono">
                                                        {device.ip}
                                                    </TableCell>
                                                    <TableCell className="text-[#8b949e] font-mono">
                                                        {device.port}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="hover:bg-[#30363d] text-[#8b949e] hover:text-[#58a6ff]"
                                                                onClick={() => {
                                                                    setCurrentDevice(device);
                                                                    setIsDialogOpen(true);
                                                                    setError('');
                                                                }}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="hover:bg-[#30363d] text-[#8b949e] hover:text-[#f85149]"
                                                                onClick={() => handleDeleteDevice(device._id)}
                                                                disabled={isDeletingId === device._id}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Mobile view */}
                                <div className="md:hidden space-y-4 p-4">
                                    {devices.map((device) => (
                                        <DeviceCard
                                            key={device._id}
                                            device={device}
                                            onEdit={(d) => {
                                                setCurrentDevice(d);
                                                setIsDialogOpen(true);
                                                setError('');
                                            }}
                                            onDelete={handleDeleteDevice}
                                            isDeleting={isDeletingId === device._id}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    {error && (
                        <div
                            className="bg-[#3c1e1e] border border-[#f85149] text-[#f85149] px-4 py-3 rounded-md mb-4 mt-4 max-w-6xl mx-auto"
                            role="alert"
                        >
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
