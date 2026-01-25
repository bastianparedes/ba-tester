'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import commonConstants from '@/domain/constants';
import type { TypeCampaign } from '@/domain/types';
import { env } from '@/libs/env';
import Buttons from './components/Buttons';
import { LiveViewersNavbar } from './components/LiveViewersBar';
import Requirements from './components/Requirements';
import Triggers from './components/Triggers';
import Variations from './components/Variations';

type Props = {
  initialCampaign: TypeCampaign;
  tenantId: number;
  campaignId: number | undefined;
};

const ClientPage = ({ initialCampaign, tenantId, campaignId }: Props) => {
  const { translation } = useTranslationContext();
  const [campaign, setCampaign] = useState(initialCampaign);
  const socketRef = useRef<Socket | null>(null);
  const [usersWatching, setUsersWatching] = useState<{ id: string; name: string }[]>([]);
  const [userMadeChange, setUserMadeChange] = useState<{ id: string; name: string; date: Date } | null>(null);

  useEffect(() => {
    const socket = io(`${env.NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE}/gateways/campaigns`, {
      auth: {
        tenantId,
        campaignId,
      },
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('update-users-watching-campaign', (users) => {
      setUsersWatching(users);
    });

    socket.on('user-updated-campaign', (user) => {
      setUserMadeChange({ ...user, date: new Date() });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const notifyUsersCampaignWasUpdated = () => {
    socketRef.current?.emit('user-updated-campaign', { tenantId, campaignId });
  };

  return (
    <>
      {campaignId !== undefined && <LiveViewersNavbar usersWatching={usersWatching} userMadeChange={userMadeChange} />}
      <div className="w-4/5 mx-auto my-8 relative flex flex-col gap-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">{translation.campaign.title}</h1>
              <p className="text-blue-600">{translation.campaign.description}</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={campaign.status}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      status: e.target.value as typeof campaign.status,
                    })
                  }
                  className={`outline-none px-6 py-2 rounded-lg font-semibold transition-all shadow-md appearance-none cursor-pointer pr-10 ${
                    campaign.status === 'active'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : campaign.status === 'inactive'
                        ? 'bg-gray-400 text-white hover:bg-gray-500'
                        : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {commonConstants.campaignStatus.map((status) => (
                    <option key={status} value={status}>
                      {translation.campaign[status]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NAME */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.campaign.name}</h2>
          <input
            type="text"
            value={campaign.name}
            onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <Triggers triggers={campaign.triggers} setCampaign={setCampaign} />
        <Requirements requirements={campaign.requirements} setCampaign={setCampaign} />
        <Variations setCampaign={setCampaign} variations={campaign.variations} />
        <Buttons campaign={campaign} userMadeChange={userMadeChange} notifyUsersCampaignWasUpdated={notifyUsersCampaignWasUpdated} />
      </div>
    </>
  );
};

export { ClientPage };
