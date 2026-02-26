'use client';

import { Trash2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { TypeCampaignLight } from '@/domain/types';

type Props = {
  allCampaigns: TypeCampaignLight[];
  selectedCampaigns: TypeCampaignLight[];
  setSelectedCampaigns: Dispatch<SetStateAction<TypeCampaignLight[]>>;
};

export function Campaigns({ allCampaigns, selectedCampaigns, setSelectedCampaigns }: Props) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const getCampaignText = (campaign: TypeCampaignLight) => `(id=${campaign.id}): ${campaign.name}`;

  const selectedCampaignIds = selectedCampaigns.map((campaign) => campaign.id);
  const noSelectedCampaigns = allCampaigns.filter((campaign) => !selectedCampaignIds.includes(campaign.id));
  const filteredCampaigns = noSelectedCampaigns.filter((campaign) => getCampaignText(campaign).toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (newCampaign: TypeCampaignLight) => {
    setSelectedCampaigns([...selectedCampaigns, newCampaign]);
    setSearch('');
    setOpen(false);
  };

  const handleRemove = (id: TypeCampaignLight['id']) => {
    setSelectedCampaigns(selectedCampaigns.filter((s) => s.id !== id));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target) && searchRef.current && !searchRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            ref={searchRef}
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 border border-slate-300 rounded-md outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          />
        </div>

        {/* Floating dropdown */}
        {open && (
          <div ref={dropdownRef} className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-56 overflow-y-auto">
            {filteredCampaigns.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400 text-center">No results found</p>
            ) : (
              filteredCampaigns.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={() => handleSelect(item)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm text-slate-700 hover:bg-blue-50 transition-colors ${
                    i < filteredCampaigns.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span>
                    (id={item.id}): {item.name}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Campaigns */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-blue-100">
            <th className="text-left py-3 px-4 text-blue-900 font-semibold">ID</th>
            <th className="text-left py-3 px-4 text-blue-900 font-semibold">NAME</th>
            <th className="text-left py-3 px-4 text-blue-900 font-semibold">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {selectedCampaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b border-blue-50 transition-colors">
              <td className="px-4 text-blue-900">{campaign.id}</td>
              <td className="px-4 text-blue-900">{campaign.name}</td>
              <td className="px-4">
                <button type="button" onClick={() => handleRemove(campaign.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
