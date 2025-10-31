import { useState } from 'react';
import AskQuestionModal from '../AskQuestionModal';
import { Button } from '@/components/ui/button';

export default function AskQuestionModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Ask Question Modal</Button>
      <AskQuestionModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => console.log('Question submitted:', data)}
      />
    </div>
  );
}
