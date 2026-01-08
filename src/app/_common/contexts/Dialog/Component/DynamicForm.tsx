'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/app/_common/components/button';
import { Input } from '@/app/_common/components/input';
import { Textarea } from '@/app/_common/components/textarea';
import { Label } from '@/app/_common/components/label';
import { Switch } from '@/app/_common/components/switch';
import { Card } from '@/app/_common/components/card';
import { useTranslationContext } from '@/app/_common/contexts/Translation';

type TypeSelectArgs<T extends { label: string; value: string }[]> = {
  options: T;
  value: T[number]['value'];
};

export type TypeArgs = {
  [name: string]: {
    label: string;
    description?: string;
    required?: boolean;
  } & (
    | { type: 'text'; value: string }
    | { type: 'textarea'; value: string }
    | { type: 'email'; value: string }
    | { type: 'password'; value: string }
    | { type: 'time'; value: string }
    | { type: 'number'; value: number }
    | { type: 'switch'; value: boolean }
    | ({ type: 'select' } & TypeSelectArgs<{ label: string; value: string }[]>)
  );
};

export type TypeResponse<T extends TypeArgs> = {
  [K in keyof T]: T[K]['type'] extends 'text' | 'textarea' | 'email' | 'password' | 'time' | 'select'
    ? T[K]['value']
    : T[K]['type'] extends 'number'
      ? number
      : T[K]['type'] extends 'switch'
        ? boolean
        : never;
};

export type TypeField = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
} & (
  | { type: 'text'; value: string }
  | { type: 'textarea'; value: string }
  | { type: 'email'; value: string }
  | { type: 'password'; value: string }
  | { type: 'time'; value: string }
  | { type: 'number'; value: number }
  | { type: 'switch'; value: boolean }
  | { type: 'select'; value: string; options: { label: string; value: string }[] }
);

export const transformArgsToFields = (args: TypeArgs): TypeField[] => {
  return Object.entries(args).map(([name, arg]) => {
    switch (arg.type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'password':
      case 'time':
        return {
          name,
          label: arg.label,
          description: arg.description,
          type: arg.type,
          value: arg.value,
          required: arg.required,
        };
      case 'number':
        return {
          name,
          label: arg.label,
          description: arg.description,
          type: 'number',
          value: arg.value,
          required: arg.required,
        };
      case 'switch':
        return {
          name,
          label: arg.label,
          description: arg.description,
          type: 'switch',
          value: arg.value,
          required: arg.required,
        };
      case 'select':
        return {
          name,
          label: arg.label,
          description: arg.description,
          type: 'select',
          value: arg.value,
          options: arg.options,
          required: arg.required,
        };
    }
  });
};

const transformFieldsToResponse = <T extends TypeArgs>(
  fields: {
    [K in keyof T]: TypeField & { name: K };
  }[keyof T][],
): TypeResponse<T> => {
  const result = {} as TypeResponse<T>;

  for (const field of fields) {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'password':
      case 'time':
      case 'number':
      case 'switch':
      case 'select':
        result[field.name] = field.value as TypeResponse<T>[typeof field.name];
        break;
    }
  }

  return result;
};

export const DynamicForm = ({ args: initialArgs, resolver }: { args: TypeArgs; resolver: (arg: unknown) => void }) => {
  const { translation } = useTranslationContext();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ items: TypeField[] }>({
    defaultValues: { items: transformArgsToFields(initialArgs) },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'items',
  });

  const onCancel = () => {
    resolver(null);
    replace([]);
  };

  const onSubmit = (result: { items: TypeField[] }) => {
    resolver(transformFieldsToResponse(result.items));
    replace([]);
  };

  return (
    <>
      <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        {fields.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No fields to display</div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="p-4 bg-card border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <Label htmlFor={field.id} className="text-sm font-medium text-foreground md:w-1/3">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <div className="md:w-2/3">
                    {field.type === 'text' && (
                      <Input
                        type="text"
                        className="border p-1 bg-gray-200"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'textarea' && (
                      <Textarea
                        className="border p-1 bg-gray-200"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'email' && (
                      <Input
                        type="email"
                        className="border p-1 bg-gray-200"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Formato de email inválido',
                          },
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'password' && (
                      <Input
                        type="password"
                        className="border p-1 bg-gray-200"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'time' && (
                      <Input
                        type="time"
                        className="border p-1 bg-gray-200"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                          validate: (value) => {
                            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(String(value));
                          },
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'number' && (
                      <Input
                        type="number"
                        className="border p-1"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                        })}
                        defaultValue={field.value}
                      />
                    )}

                    {field.type === 'switch' && (
                      <div className="flex items-center gap-3">
                        <Switch
                          id={field.id}
                          defaultChecked={field.value}
                          {...register(`items.${index}.value`, {
                            required: field.required && 'Este campo es obligatorio',
                          })}
                        />
                      </div>
                    )}

                    {field.type === 'select' && (
                      <select
                        className="border p-2 rounded bg-gray-200 w-full"
                        {...register(`items.${index}.value`, {
                          required: field.required && 'Este campo es obligatorio',
                        })}
                        defaultValue={field.value}
                      >
                        <option value="">Seleccione una opción</option>
                        {field.options.map((opt, i) => (
                          <option key={i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {errors.items?.[index]?.value && (
                      <p className="text-red-600 text-sm mt-1">{errors.items[index].value.message}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="px-8 pb-6 flex justify-end gap-4">
        <Button onClick={onCancel} variant="destructive">
          {translation.common.cancel}
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="default">
          {translation.common.accept}
        </Button>
      </div>
    </>
  );
};
