import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function UserCard({ user, onEdit, onDelete, isDeleting }) {
    return (
        <Card className="mb-4 bg-[#0d1117] border border-[#30363d]">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-medium text-[#c9d1d9]">{user.name}</h3>
                        <p className="text-sm text-[#8b949e]">{user.email}</p>
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
                        <span className="text-[#8b949e]">Code:</span>
                        <span className="font-mono text-[#c9d1d9]">{user.account.code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#8b949e]">Expires:</span>
                        <span className="text-[#c9d1d9]">
                            {new Date(user.account.dateCodeExpire).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button
                        className="flex-1 bg-green-900 text-green-200 hover:bg-green-200 hover:text-green-900"
                        onClick={() => onEdit(user)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 hover:bg-red-200 hover:text-red-900"
                        onClick={() => onDelete(user._id)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
