'use client';

// components/main/Userpanel.jsx
import { useState, useEffect } from 'react';

// Servicios

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const mockUsers = [
        {
          _id: '674e92506e7970856d0fe72c',
          name: 'Pepe',
          email: 'pepeargento@mail.com',
          password:
            '$2b$10$PER/IIq9MTvhpdxi.AAAQu37BjHAUgo.KaLQ46HJwu3G3StYZ9lJW',
          image:
            'https://e7.pngegg.com/pngimages/946/395/png-clipart-guillermo-francella-put-on-francella-pepe-argento-actor-humour-actor-celebrities-face.png',
          account: {
            confirmed: false,
            code: '739232',
            dateCodeExpire: '2025-01-08T23:36:30.996Z',
            admin: false,
            _id: '674e92506e7970856d0fe72b',
          },
          createdAt: '2024-12-03T05:08:32.547Z',
          updatedAt: '2024-12-03T05:08:32.547Z',
          __v: 0,
        },
      ];
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    setIsDialogOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  // Mobile card view component
  const UserCard = ({ user }) => (
    <Card className="mb-4 bg-[#25262b] border-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-200">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {user.account.admin && (
              <Badge variant="secondary" className="bg-blue-900 text-blue-200">
                Admin
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={
                user.account.confirmed
                  ? 'bg-green-900 text-green-200'
                  : 'bg-yellow-900 text-yellow-200'
              }
            >
              {user.account.confirmed ? 'Confirmed' : 'Pending'}
            </Badge>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Code:</span>
            <span className="font-mono text-gray-200">{user.account.code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Expires:</span>
            <span className="text-gray-200">
              {new Date(user.account.dateCodeExpire).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="ghost"
            className="flex-1 hover:bg-[#2c2d31] text-gray-200"
            onClick={() => {
              setCurrentUser(user);
              setIsDialogOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1 hover:bg-red-900"
            onClick={() => handleDeleteUser(user._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#1a1b1e] text-gray-200 p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto bg-[#25262b] border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-[#2c2d31] text-gray-200"
                onClick={() => setCurrentUser(null)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-[#25262b] text-gray-200 sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {currentUser ? 'Edit User' : 'Add New User'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh]">
                <UserForm
                  user={currentUser}
                  onSubmit={currentUser ? handleUpdateUser : handleAddUser}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full bg-[#2c2d31]" />
              ))}
            </div>
          ) : (
            <>
              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-[#2c2d31] border-b border-gray-800">
                      <TableHead className="text-sm font-medium text-gray-400">
                        Name
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-400">
                        Email
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-400">
                        Status
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-400">
                        Code
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-400">
                        Expires
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-400">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        className="hover:bg-[#2c2d31] border-b border-gray-800"
                      >
                        <TableCell className="font-medium text-gray-200">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.account.admin && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-900 text-blue-200"
                              >
                                Admin
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className={
                                user.account.confirmed
                                  ? 'bg-green-900 text-green-200'
                                  : 'bg-yellow-900 text-yellow-200'
                              }
                            >
                              {user.account.confirmed ? 'Confirmed' : 'Pending'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400 font-mono">
                          {user.account.code}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {new Date(
                            user.account.dateCodeExpire
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-[#2c2d31] text-gray-200"
                              onClick={() => {
                                setCurrentUser(user);
                                setIsDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="hover:bg-red-900"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {users.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserForm({ user, onSubmit }) {
  const [formData, setFormData] = useState(
    user || {
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
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-400">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-400">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-400">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="image" className="text-gray-400">
            Image URL
          </Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
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
              className="bg-gray-700"
            />
            <Label htmlFor="confirmed" className="text-gray-400">
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
              className="bg-gray-700"
            />
            <Label htmlFor="admin" className="text-gray-400">
              Admin
            </Label>
          </div>
        </div>
        <div>
          <Label htmlFor="code" className="text-gray-400">
            Code
          </Label>
          <Input
            id="code"
            name="code"
            value={formData.account.code}
            onChange={handleAccountChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
          />
        </div>
        <div>
          <Label htmlFor="dateCodeExpire" className="text-gray-400">
            Date Code Expire
          </Label>
          <Input
            id="dateCodeExpire"
            name="dateCodeExpire"
            type="datetime-local"
            value={formData.account.dateCodeExpire.slice(0, 16)}
            onChange={handleAccountChange}
            className="bg-[#2c2d31] border-gray-700 text-gray-200 focus:border-gray-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="ghost"
        className="w-full hover:bg-[#2c2d31] text-gray-200"
      >
        Save
      </Button>
    </form>
  );
}
