import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, newUsername: string, newPassword: string) => void;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');

  // Update values when modal opens with new user
  React.useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setPassword('');
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      onSave(user.id, username, password);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
