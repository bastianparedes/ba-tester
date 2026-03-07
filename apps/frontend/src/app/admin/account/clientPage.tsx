'use client';

import { Check, Eye, EyeOff, KeyRound, X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

function getStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

type StrengthMeta = {
  label: string;
  color: string;
} | null;

const STRENGTH_META: StrengthMeta[] = [
  null,
  { color: 'bg-red-500', label: 'Muy débil' },
  { color: 'bg-orange-500', label: 'Débil' },
  { color: 'bg-yellow-400', label: 'Aceptable' },
  { color: 'bg-green-500', label: 'Segura' },
];

type HintType = 'error' | 'success' | undefined;

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  hintType?: HintType;
};

function PasswordInput({ id, label, value, onChange, placeholder, hint, hintType }: PasswordInputProps) {
  const [show, setShow] = useState<boolean>(false);

  const borderClass =
    hintType === 'error'
      ? 'border-red-400 focus:ring-red-200'
      : hintType === 'success'
        ? 'border-green-400 focus:ring-green-200'
        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100';

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 pr-11 rounded-lg border bg-slate-50 text-slate-800 text-sm outline-none transition focus:bg-white focus:ring-2 ${borderClass}`}
        />

        <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {hint && (
        <p className={`mt-1.5 text-xs flex items-center gap-1 ${hintType === 'error' ? 'text-red-500' : hintType === 'success' ? 'text-green-600' : 'text-slate-400'}`}>
          {hintType === 'error' && <X size={11} />}
          {hintType === 'success' && <Check size={11} />}
          {hint}
        </p>
      )}
    </div>
  );
}

type StrengthBarProps = {
  password: string;
};

function StrengthBar({ password }: StrengthBarProps) {
  const s = getStrength(password);
  const meta = STRENGTH_META[s];

  return (
    <div className="mb-5">
      <div className="flex gap-1.5 mt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${password && s >= i ? meta?.color : 'bg-slate-200'}`} />
        ))}
      </div>

      {password && <p className="text-xs text-slate-400 mt-1">{meta?.label}</p>}
    </div>
  );
}

export function ClientPage() {
  const [oldPass, setOldPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  const matchOk = newPass.length > 0 && confirmPass.length > 0 && newPass === confirmPass;

  const matchErr = confirmPass.length > 0 && newPass !== confirmPass;

  const strengthOk = getStrength(newPass) >= 2;

  const canSave = oldPass.length > 0 && strengthOk && matchOk && !saving;

  const matchHint = matchErr ? 'Las contraseñas no coinciden' : matchOk ? 'Las contraseñas coinciden' : '';

  const matchType: HintType = matchErr ? 'error' : matchOk ? 'success' : undefined;

  function handleSave(): void {
    if (!canSave) return;

    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    }, 900);
  }

  return (
    <main className="flex-1 p-10">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Cambiar contraseña</h1>
      <p className="text-sm text-slate-500 mb-8">Actualiza la contraseña de tu cuenta</p>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-9 w-full max-w-md">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <KeyRound size={17} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Seguridad de cuenta</p>
            <p className="text-xs text-slate-400">Usa una contraseña fuerte y única</p>
          </div>
        </div>
        <PasswordInput id="old" label="Contraseña actual" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Ingresa tu contraseña actual" />
        <div className="h-px bg-slate-100 my-6" />
        <PasswordInput id="new" label="Nueva contraseña" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Mínimo 8 caracteres" />
        <StrengthBar password={newPass} />
        <PasswordInput
          id="confirm"
          label="Confirmar nueva contraseña"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Repite la nueva contraseña"
          hint={matchHint}
          hintType={matchType}
        />
        <div className="flex justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={() => {
              setOldPass('');
              setNewPass('');
              setConfirmPass('');
            }}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`px-5 py-2 rounded-lg text-sm font-medium text-white transition shadow-sm ${
              canSave ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-200' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </main>
  );
}
