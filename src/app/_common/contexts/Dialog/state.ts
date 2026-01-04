import { create } from 'zustand';
import type { TypeArgs, TypeResponse } from './Component/DynamicForm';

type DialogStore = {
  isOpen: boolean;
  title: string | null;
  description: string | null;
  resolver: (arg: unknown) => void;
  data:
    | null
    | {
        type: 'dynamicDialog';
        args: TypeArgs;
      }
    | {
        type: 'confirmDialog';
      };

  getDataFromForm: <T extends TypeArgs>(
    formData: { title?: string; description?: string },
    args: T,
  ) => Promise<TypeResponse<T> | null>;
  confirm: (formData: { title?: string; description?: string }) => Promise<boolean | null>;
  completeResolver: (arg: unknown) => void;
};

export const useDialogStore = create<DialogStore>((set, get) => ({
  isOpen: false,
  title: null,
  description: null,
  resolver: () => {},
  data: null,
  getDataFromForm: <T extends TypeArgs>(
    formData: { title?: string; description?: string },
    args: T,
  ): Promise<null | TypeResponse<T>> => {
    if (formData.title) set({ title: formData.title });
    if (formData.description) set({ description: formData.description });
    set({ data: { type: 'dynamicDialog', args } });
    const promise = new Promise<TypeResponse<T>>((resolve) => {
      set({ resolver: resolve as (arg: unknown) => void });
    });
    set({ isOpen: true });
    return promise;
  },
  confirm: (formData: { title?: string; description?: string }): Promise<null | boolean> => {
    if (formData.title) set({ title: formData.title });
    if (formData.description) set({ description: formData.description });
    set({ data: { type: 'confirmDialog' } });
    const promise = new Promise<boolean>((resolve) => {
      set({ resolver: resolve as (arg: unknown) => void });
    });
    set({ isOpen: true });
    return promise;
  },
  completeResolver: (arg: unknown): void => {
    set({
      isOpen: false,
      title: null,
      description: null,
      data: null,
    });
    get().resolver(arg);
  },
}));
