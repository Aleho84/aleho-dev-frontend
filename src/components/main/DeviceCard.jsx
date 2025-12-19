import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeviceIcon } from './DeviceIcon';

export function DeviceCard({ device, onEdit, onDelete, isDeleting }) {
    return (
        <Card className="mb-4 bg-[#0d1117] border border-[#30363d]">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center text-xl">
                            <DeviceIcon iconName={device.icon} className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-[#c9d1d9]">{device.name}</h3>
                            <p className="text-sm text-[#8b949e]">{device.service}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-[#8b949e]">IP Address:</span>
                        <span className="font-mono text-[#c9d1d9]">{device.ip}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#8b949e]">Port:</span>
                        <span className="font-mono text-[#c9d1d9]">{device.port}</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button
                        className="flex-1 bg-green-900 text-green-200 hover:bg-green-200 hover:text-green-900"
                        onClick={() => onEdit(device)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 hover:bg-red-200 hover:text-red-900"
                        onClick={() => onDelete(device._id)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
