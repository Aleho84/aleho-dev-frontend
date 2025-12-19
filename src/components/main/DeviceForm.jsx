'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DeviceForm({ device, onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        name: '',
        service: '',
        icon: '',
        ip: '',
        port: '',
    });

    useEffect(() => {
        if (device) {
            setFormData({
                name: device.name || '',
                service: device.service || '',
                icon: device.icon || '',
                ip: device.ip || '',
                port: device.port || '',
            });
        }
    }, [device]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block text-white text-sm font-medium mb-2">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <Label htmlFor="service" className="block text-white text-sm font-medium mb-2">Service</Label>
                    <Input id="service" name="service" value={formData.service} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <Label htmlFor="icon" className="block text-white text-sm font-medium mb-2">Icon (Lucide Name)</Label>
                    <Input id="icon" name="icon" value={formData.icon} onChange={handleChange} required placeholder="e.g. Code, Database, Bot" className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <Label htmlFor="ip" className="block text-white text-sm font-medium mb-2">IP Address</Label>
                    <Input id="ip" name="ip" value={formData.ip} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <Label htmlFor="port" className="block text-white text-sm font-medium mb-2">Port</Label>
                    <Input id="port" name="port" type="number" value={formData.port} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>
            <Button type="submit" className="bg-[#238636] hover:bg-[#2ea043] text-white w-full font-bold py-2 px-4 rounded-md" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
}
