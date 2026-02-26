'use client';

import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { Button } from '@/app/_common/components/button';
import { Switch } from '@/app/_common/components/switch';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { useUser } from '@/app/_common/contexts/User';
import constants from '@/config/constants';
import type { TypeCampaignLight, TypeExecutionGroupWithOptionalId } from '@/domain/types';
import { env } from '@/libs/env';
import { apiCaller } from '@/libs/restClient';
import { Campaigns } from './components/Campaigns';
import { LiveViewersNavbar } from './components/LiveViewersBar';

type Props = {
  initialExecutionGroup: TypeExecutionGroupWithOptionalId;
  initialCampaigns: TypeCampaignLight[];
  tenantId: number;
  executionGroupId: number | undefined;
  allCampaigns: TypeCampaignLight[];
};

const ClientPage = ({ initialExecutionGroup, initialCampaigns, tenantId, executionGroupId, allCampaigns }: Props) => {
  const { translation } = useTranslationContext();
  const [executionGroup, setExecutionGroup] = useState(initialExecutionGroup);
  const [selectedCampaigns, setSelectedCampaigns] = useState(initialCampaigns);
  const socketRef = useRef<Socket | null>(null);
  const [usersWatching, setUsersWatching] = useState<{ id: string; name: string }[]>([]);
  const [userMadeChange, setUserMadeChange] = useState<{ id: string; name: string; date: Date } | null>(null);

  useEffect(() => {
    const socket = io(`${env.NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE}/gateways/execution-group`, {
      auth: {
        tenantId,
        executionGroupId,
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

  const notifyUsersExecutionGroupWasUpdated = () => {
    socketRef.current?.emit('user-updated-execution-group', { tenantId, executionGroup });
  };

  const user = useUser();

  const isNewExecutionGroup = executionGroup.id === undefined;

  const returnToExecutionGroups = () => {
    location.href = constants.pages.executionGroups({ tenantId: executionGroup.tenantId });
  };

  const handleOnSave = async () => {
    const campaignIds = selectedCampaigns.map((campaign) => campaign.id);
    if (executionGroup.id === undefined) {
      await apiCaller.executionGroups.create({
        pathParams: { tenantId: executionGroup.tenantId },
        body: { ...executionGroup, campaignIds },
      });
    } else {
      notifyUsersExecutionGroupWasUpdated();
      await apiCaller.executionGroups.update({
        pathParams: { tenantId: executionGroup.tenantId, executionGroupId: executionGroup.id },
        body: { ...executionGroup, campaignIds },
      });
    }
    location.href = constants.pages.executionGroups({ tenantId: executionGroup.tenantId });
  };

  return (
    <>
      {executionGroupId !== undefined && <LiveViewersNavbar usersWatching={usersWatching} userMadeChange={userMadeChange} />}
      <div className="w-4/5 mx-auto my-8 relative flex flex-col gap-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">{translation.executionGroup.title}</h1>
              <p className="text-blue-600">{translation.executionGroup.description}</p>
            </div>
          </div>
        </div>

        {/* NAME */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.executionGroup.name}</h2>
          <input
            type="text"
            value={executionGroup.name}
            onChange={(e) => setExecutionGroup({ ...executionGroup, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.executionGroup.config}</h2>
          <div className="flex justify-between items-center">
            <span>Keep campaign(s) executed</span>
            <Switch
              checked={executionGroup.persistCampaignAcrossReloads}
              onChange={() => setExecutionGroup((state) => ({ ...state, persistCampaignAcrossReloads: !executionGroup.persistCampaignAcrossReloads }))}
            />
          </div>
        </div>

        {/* NAME */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.executionGroup.campaigns}</h2>
          <Campaigns allCampaigns={allCampaigns} selectedCampaigns={selectedCampaigns} setSelectedCampaigns={setSelectedCampaigns} />
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-end gap-4">
          <Button onClick={returnToExecutionGroups} variant="destructive">
            Cancel
          </Button>
          <Button
            disabled={
              (isNewExecutionGroup && !user.permissions.canCreateExecutionGroup) || (!isNewExecutionGroup && !user.permissions.canUpdateExecutionGroup) || !!userMadeChange
            }
            onClick={handleOnSave}
            variant="default"
          >
            Save execution group
          </Button>
        </div>
      </div>
    </>
  );
};

export { ClientPage };
