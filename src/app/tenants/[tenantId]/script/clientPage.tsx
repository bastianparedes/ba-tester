'use client';

import { Check, Code, Copy, LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  url: string;
  script: string;
};

export function ClientPage({ url, script }: Props) {
  const [domain, setDomain] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: 'url' | 'code',
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  useEffect(() => {
    setDomain(window.location.origin);
  }, []);

  const fullUrl = `${domain}${url}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">
            Visualizador de Link y Código
          </h1>
        </div>

        {/* URL Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="text-blue-300" size={24} />
            <h2 className="text-xl font-semibold text-white">URL del Script</h2>
          </div>

          <div className="relative">
            <div className="w-full bg-white/5 border border-blue-300/30 rounded-lg px-4 py-3 text-white pr-12 break-all">
              {fullUrl}
            </div>
            <button
              onClick={() => copyToClipboard(fullUrl, 'url')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
              type="button"
              title="Copiar URL"
            >
              {copiedUrl ? (
                <Check className="text-green-400" size={20} />
              ) : (
                <Copy className="text-blue-300" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* JavaScript Code Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code className="text-blue-300" size={24} />
              <h2 className="text-xl font-semibold text-white">
                Código TypeScript
              </h2>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(script, 'code')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check size={18} />
                  <span className="text-sm">Copiado</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span className="text-sm">Copiar</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="w-full bg-slate-950/50 border border-blue-300/30 rounded-lg px-4 py-3 text-green-300 font-mono text-sm overflow-x-auto min-h-[600px] whitespace-pre-wrap break-all">
              <code>{script}</code>
            </pre>
          </div>

          <div className="mt-3 text-xs text-blue-200/70">
            Líneas: {script.split('\n').length} | Caracteres: {script.length}
          </div>
        </div>
      </div>
    </div>
  );
}
