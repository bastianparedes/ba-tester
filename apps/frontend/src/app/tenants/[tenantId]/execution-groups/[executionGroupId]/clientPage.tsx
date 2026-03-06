'use client';

import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { Button } from '@/app/_common/components/button';
import { Switch } from '@/app/_common/components/switch';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { useUser } from '@/app/_common/contexts/User';
import constants from '@/config/constants';
import type { TypeCampaignLight } from '@/domain/types/campaign';
import type { TypeExecutionGroupWithOptionalId } from '@/domain/types/executionGroup';
import type { TypeUser } from '@/domain/types/user';
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
  const [usersWatching, setUsersWatching] = useState<{ id: TypeUser['id']; name: TypeUser['name'] }[]>([]);
  const [userMadeChange, setUserMadeChange] = useState<{
    id: TypeUser['id'];
    name: TypeUser['name'];
    date: Date;
  } | null>(null);

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
    socketRef.current?.emit('user-updated-execution-group', {
      tenantId,
      executionGroup,
    });
  };

  const user = useUser();
  const isNewExecutionGroup = executionGroup.id === undefined;

  const returnToExecutionGroups = () => {
    location.href = constants.pages.executionGroups({
      tenantId: executionGroup.tenantId,
    });
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
        pathParams: {
          tenantId: executionGroup.tenantId,
          executionGroupId: executionGroup.id,
        },
        body: { ...executionGroup, campaignIds },
      });
    }

    returnToExecutionGroups();
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

        {/* CONFIG */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.executionGroup.config}</h2>

          <div className="flex flex-col gap-3">
            {/* WAIT CONDITIONS */}
            <div className="flex gap-2">
              <div className="flex min-w-16 max-w-16 py-1">
                <Switch
                  checked={executionGroup.waitForEveryCampaignToBeEvaluated}
                  onChange={() =>
                    setExecutionGroup((state) => ({
                      ...state,
                      waitForEveryCampaignToBeEvaluated: !executionGroup.waitForEveryCampaignToBeEvaluated,
                    }))
                  }
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{translation.executionGroup.waitConditionsTitle}</h3>
                <p>
                  <span className="text-green-600">{translation.executionGroup.waitConditionsEnabledLabel}</span> {translation.executionGroup.waitConditionsEnabledDescription}
                </p>
                <p>
                  <span className="text-red-600">{translation.executionGroup.waitConditionsDisabledLabel}</span> {translation.executionGroup.waitConditionsDisabledDescription}
                </p>
              </div>
            </div>

            {/* ONLY ONE */}
            <div className="flex gap-2">
              <div className="flex min-w-16 max-w-16 py-1">
                <Switch
                  checked={executionGroup.onlyOneCampaignPerPageLoad}
                  onChange={() =>
                    setExecutionGroup((state) => ({
                      ...state,
                      onlyOneCampaignPerPageLoad: !executionGroup.onlyOneCampaignPerPageLoad,
                    }))
                  }
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{translation.executionGroup.onlyOneTitle}</h3>
                <p>
                  <span className="text-green-600">{translation.executionGroup.onlyOneEnabledLabel}</span> {translation.executionGroup.onlyOneEnabledDescription}
                </p>
                <p>
                  <span className="text-red-600">{translation.executionGroup.onlyOneDisabledLabel}</span> {translation.executionGroup.onlyOneDisabledDescription}
                </p>
              </div>
            </div>

            {/* REMEMBER CAMPAIGNS */}
            <div className="flex gap-2">
              <div className="flex min-w-16 max-w-16 py-1">
                <Switch
                  checked={executionGroup.onlyCampaignsPreviouslyExecuted}
                  onChange={() =>
                    setExecutionGroup((state) => ({
                      ...state,
                      onlyCampaignsPreviouslyExecuted: !executionGroup.onlyCampaignsPreviouslyExecuted,
                    }))
                  }
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{translation.executionGroup.rememberCampaignsTitle}</h3>
                <p>
                  <span className="text-green-600">{translation.executionGroup.rememberCampaignsEnabledLabel}</span>{' '}
                  {translation.executionGroup.rememberCampaignsEnabledDescription}
                </p>
                <p>
                  <span className="text-red-600">{translation.executionGroup.rememberCampaignsDisabledLabel}</span>{' '}
                  {translation.executionGroup.rememberCampaignsDisabledDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CAMPAIGNS */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">{translation.executionGroup.campaigns}</h2>
          <Campaigns allCampaigns={allCampaigns} selectedCampaigns={selectedCampaigns} setSelectedCampaigns={setSelectedCampaigns} />
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-end gap-4">
          <Button onClick={returnToExecutionGroups} variant="destructive">
            {translation.executionGroup.cancel}
          </Button>
          <Button
            disabled={
              (isNewExecutionGroup && !user.permissions.canCreateExecutionGroup) || (!isNewExecutionGroup && !user.permissions.canUpdateExecutionGroup) || !!userMadeChange
            }
            onClick={handleOnSave}
            variant="default"
          >
            {translation.executionGroup.save}
          </Button>
        </div>
      </div>
    </>
  );
};

export { ClientPage };
