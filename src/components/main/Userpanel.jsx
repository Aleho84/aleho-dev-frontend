'use client';

import { useState, useEffect } from 'react';

// Servicios
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userService';
import { getUserData } from '../../services/auth';

// Components
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2, Menu, Users } from 'lucide-react';

import Sidebar from '../child/Sidebar';
import { UserCard } from './UserCard';
import { UserForm } from './UserForm';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddUser = async (newUser) => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await createUser(newUser);
      setUsers([...users, response.user]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
      setError(`Failed to add user: ${error.message}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await updateUser(updatedUser._id, updatedUser);
      setUsers(
        users.map((user) => (user._id === response._id ? response : user))
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setError(`Failed to update user: ${error.message}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setIsDeletingId(userId);
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(`Failed to delete user: ${error.message}.`);
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
            <Users className="h-6 w-6 mr-2 text-[#c9d1d9]" />
            <h1 className="text-xl font-semibold text-white">User Management</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-[#30363d] text-[#c9d1d9]"
                onClick={() => {
                  setCurrentUser(null);
                  setError('');
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-[#161b22] text-[#c9d1d9] border-[#30363d] sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {currentUser ? 'Edit User' : 'Add New User'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh]">
                <UserForm
                  user={currentUser}
                  onSubmit={currentUser ? handleUpdateUser : handleAddUser}
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
                          Name
                        </TableHead>
                        <TableHead className="text-sm font-medium text-[#8b949e]">
                          Email
                        </TableHead>
                        <TableHead className="text-sm font-medium text-[#8b949e]">
                          Status
                        </TableHead>
                        <TableHead className="text-sm font-medium text-[#8b949e]">
                          Code
                        </TableHead>
                        <TableHead className="text-sm font-medium text-[#8b949e]">
                          Expires
                        </TableHead>
                        <TableHead className="text-sm font-medium text-[#8b949e]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user._id}
                          className="hover:bg-[#21262d] border-b border-[#30363d]"
                        >
                          <TableCell className="font-medium text-[#c9d1d9]">
                            {user.name}
                          </TableCell>
                          <TableCell className="text-[#8b949e]">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {user.account.admin && (
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-900 text-blue-200 border-0"
                                >
                                  Admin
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className={`border-0 ${user.account.confirmed
                                  ? 'bg-green-900 text-green-200'
                                  : 'bg-yellow-900 text-yellow-200'
                                  }`}
                              >
                                {user.account.confirmed ? 'Confirmed' : 'Pending'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-[#8b949e] font-mono">
                            {user.account.code}
                          </TableCell>
                          <TableCell className="text-[#8b949e]">
                            {new Date(
                              user.account.dateCodeExpire
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-[#30363d] text-[#8b949e] hover:text-[#58a6ff]"
                                onClick={() => {
                                  setCurrentUser(user);
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
                                onClick={() => handleDeleteUser(user._id)}
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
                  {users.map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      onEdit={(u) => {
                        setCurrentUser(u);
                        setIsDialogOpen(true);
                        setError('');
                      }}
                      onDelete={handleDeleteUser}
                      isDeleting={isDeletingId === user._id}
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
