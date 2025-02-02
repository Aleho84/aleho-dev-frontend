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
                    <Label htmlFor="name" className="text-muted-foreground">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="text-muted-foreground">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
                    />
                </div>
                <div>
                    <Label htmlFor="password" className="text-muted-foreground">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
                        placeholder={user ? 'Leave blank to keep current password' : ''}
                    />
                </div>
                <div>
                    <Label htmlFor="image" className="text-muted-foreground">
                        Image URL
                    </Label>
                    <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
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
                        <Label htmlFor="confirmed" className="text-muted-foreground">
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
                        <Label htmlFor="admin" className="text-muted-foreground">
                            Admin
                        </Label>
                    </div>
                </div>
                <div>
                    <Label htmlFor="code" className="text-muted-foreground">
                        Code
                    </Label>
                    <Input
                        id="code"
                        name="code"
                        value={formData.account.code}
                        onChange={handleAccountChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
                    />
                </div>
                <div>
                    <Label htmlFor="dateCodeExpire" className="text-muted-foreground">
                        Date Code Expire
                    </Label>
                    <Input
                        id="dateCodeExpire"
                        name="dateCodeExpire"
                        type="datetime-local"
                        value={formData.account.dateCodeExpire.slice(0, 16)}
                        onChange={handleAccountChange}
                        className="bg-secondary/50 border-input text-foreground focus:border-ring"
                    />
                </div>
            </div>

            <Button
                type="submit"
                variant="ghost"
                className="w-full hover:bg-accent text-foreground"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
}
