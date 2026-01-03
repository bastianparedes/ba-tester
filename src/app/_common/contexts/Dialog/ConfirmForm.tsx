'use client';

import { Button } from '@/app/_common/components/button';

export const ConfirmForm = ({ resolver }: { resolver: (arg: boolean) => void }) => {
  const onReject = () => resolver(false);
  const onAccept = () => resolver(true);

  return (
    <div className="px-8 py-6 border-t border-border flex justify-end gap-4">
      <Button onClick={onReject} className="bg-white text-black border border-black font-normal cursor-pointer">
        Cancelar
      </Button>
      <Button onClick={onAccept} className="bg-black text-white border border-white font-normal cursor-pointer">
        Aceptar
      </Button>
    </div>
  );
};
