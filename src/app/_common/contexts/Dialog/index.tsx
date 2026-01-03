'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog } from '@/app/_common/components/dialog';
import type { TypeArgs, TypeResponse } from './DynamicForm';
import { DynamicForm } from './DynamicForm';
import { ConfirmForm } from './ConfirmForm';

type TypeDialogContext = {
  getDataFromForm: <T extends TypeArgs>(
    formData: { title?: string; description?: string },
    args: T,
  ) => Promise<TypeResponse<T> | null>;
  confirm: (formData: { title?: string; description?: string }) => Promise<boolean | null>;
};
const DialogContext = createContext<TypeDialogContext | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [resolver, setResolver] = useState<(value: unknown) => void>(() => {});
  const [data, setData] = useState<
    | null
    | {
        type: 'dynamicDialog';
        args: TypeArgs;
      }
    | {
        type: 'confirmDialog';
      }
  >(null);

  const getDataFromForm = <T extends TypeArgs>(
    formData: { title?: string; description?: string },
    args: T,
  ): Promise<null | TypeResponse<T>> => {
    if (formData.title) setTitle(formData.title);
    if (formData.description) setDescription(formData.description);
    setData({
      type: 'dynamicDialog',
      args,
    });
    const promise = new Promise<TypeResponse<T>>((resolve) => {
      setResolver(() => resolve);
    });
    setOpen(true);
    return promise;
  };

  const confirm = (formData: { title?: string; description?: string }): Promise<null | boolean> => {
    if (formData.title) setTitle(formData.title);
    if (formData.description) setDescription(formData.description);

    setData({ type: 'confirmDialog' });
    const promise = new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
    setOpen(true);
    return promise;
  };

  const completeResolver = <T,>(arg: T) => {
    setOpen(false);
    setTitle(null);
    setDescription(null);
    resolver(arg);
    setData(null);
    return arg;
  };

  const dialogComponentsStrategies = {
    dynamicDialog: {
      content: () => (
        <DynamicForm
          resolver={completeResolver}
          args={
            (
              data as {
                type: 'dynamicDialog';
                args: TypeArgs;
              }
            ).args
          }
        />
      ),
      footer: undefined,
    },
    confirmDialog: {
      content: () => undefined,
      footer: () => <ConfirmForm resolver={completeResolver} />,
    },
  };
  const dialogComponentsDefault = {
    content: undefined,
    footer: undefined,
  };

  const DialogComponents = data ? dialogComponentsStrategies[data.type] : dialogComponentsDefault;
  const Content = DialogComponents.content ? <DialogComponents.content /> : null;
  const Footer = DialogComponents.footer ? <DialogComponents.footer /> : null;

  return (
    <DialogContext.Provider value={{ getDataFromForm, confirm }}>
      {open && (
        <Dialog
          onClose={() => completeResolver(null)}
          title={title}
          description={description}
          content={Content}
          footer={Footer}
        />
      )}
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used inside DialogProvider');
  return ctx;
};
