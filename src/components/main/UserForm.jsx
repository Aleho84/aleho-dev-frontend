import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function UserForm({ user, onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        email: '',
        password: '',
        image: '',
        account: {
            confirmed: false,
            code: '',
            dateCodeExpire: new Date().toISOString(),
            admin: false,
            _id: '',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
    });

    const [passwordEdited, setPasswordEdited] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                password: '',
            });
            setPasswordEdited(false);
        } else {
            setFormData({
                _id: '',
                name: '',
                email: '',
                password: '',
                image: '',
                account: {
                    confirmed: false,
                    code: '',
                    dateCodeExpire: new Date().toISOString(),
                    admin: false,
                    _id: '',
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __v: 0,
            });
            setPasswordEdited(false);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPasswordEdited(true);
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAccountChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            account: {
                ...prevData.account,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataToSend = {};

        if (user) {
            // Editing existing user
            dataToSend = { ...formData };
            if (!passwordEdited) {
                delete dataToSend.password;
            }
        } else {
            // Adding new user
            dataToSend = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            if (formData.image) {
                dataToSend.image = formData.image;
            }
        }

        onSubmit(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={user ? 'Leave blank to keep current password' : ''}
                    />
                </div>
                <div>
                    <Label htmlFor="image" className="block text-white text-sm font-medium mb-2">
                        Image URL
                    </Label>
                    <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="confirmed"
                            name="confirmed"
                            checked={formData.account.confirmed}
                            onCheckedChange={(checked) =>
                                handleAccountChange({
                                    target: { name: 'confirmed', type: 'checkbox', checked },
                                })
                            }
                            className="bg-secondary border-input"
                        />
                        <Label htmlFor="confirmed" className="block text-white text-sm font-medium mb-2">
                            Confirmed
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="admin"
                            name="admin"
                            checked={formData.account.admin}
                            onCheckedChange={(checked) =>
                                handleAccountChange({
                                    target: { name: 'admin', type: 'checkbox', checked },
                                })
                            }
                            className="bg-secondary border-input"
                        />
                        <Label htmlFor="admin" className="block text-white text-sm font-medium mb-2">
                            Admin
                        </Label>
                    </div>
                </div>
                <div>
                    <Label htmlFor="code" className="block text-white text-sm font-medium mb-2">
                        Code
                    </Label>
                    <Input
                        id="code"
                        name="code"
                        value={formData.account.code}
                        onChange={handleAccountChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="dateCodeExpire" className="block text-white text-sm font-medium mb-2">
                        Date Code Expire
                    </Label>
                    <Input
                        id="dateCodeExpire"
                        name="dateCodeExpire"
                        type="datetime-local"
                        value={formData.account.dateCodeExpire.slice(0, 16)}
                        onChange={handleAccountChange}
                        className="w-full px-3 py-2 border border-gray-700 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="bg-[#238636] hover:bg-[#2ea043] text-white w-full font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
}
