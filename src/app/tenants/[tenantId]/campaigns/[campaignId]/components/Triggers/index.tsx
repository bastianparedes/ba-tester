import commonConstants from '@/config/common/constants';
import type { TypeCampaign, TypeTriggerData } from '@/types/domain';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import Editor from './TriggerEditor';

interface Props {
  triggers: TypeTriggerData[];
  setCampaign: (campaign: (TypeCampaign: TypeCampaign) => TypeCampaign) => void;
}

const Triggers = ({ setCampaign, triggers }: Props) => {
  const { translation } = useTranslationContext();

  const addNewTrigger = () => {
    setCampaign((campaign) => {
      const newCampaign = structuredClone(campaign);
      const newIdTrigger = triggers.reduce((highest, nextTrigger) => Math.max(highest, nextTrigger.id), 0) + 1;

      const newTrigger = {
        data: {},
        id: newIdTrigger,
        type: commonConstants.triggerTypes.pageLoad,
      };

      newCampaign.triggers.push(newTrigger);

      return newCampaign;
    });
  };

  const handleOnChangeType = (trigger: TypeTriggerData, newType: (typeof commonConstants)['triggers'][number]) => {
    setCampaign((campaign) => {
      const index = campaign.triggers.findIndex((triggerInList) => triggerInList.id === trigger.id);

      if (newType === 'clickOnElement')
        campaign.triggers[index] = {
          data: {
            selector: '',
          },
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'custom')
        campaign.triggers[index] = {
          data: {
            javascript: 'fire();',
            name: '',
          },
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'pageLoad')
        campaign.triggers[index] = {
          data: {},
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'timeOnPage')
        campaign.triggers[index] = {
          data: {
            milliseconds: 1000,
          },
          id: trigger.id,
          type: newType,
        };

      return structuredClone(campaign);
    });
  };

  const deleteTrigger = (trigger: TypeTriggerData) => {
    setCampaign((campaign) => {
      campaign.triggers = campaign.triggers.filter((triggerInList) => triggerInList.id !== trigger.id);
      return structuredClone(campaign);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">{translation.campaign.triggersTitle}</h2>
        <button
          onClick={addNewTrigger}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          {translation.campaign.newTrigger}
        </button>
      </div>

      <div className="space-y-4">
        {triggers.map((trigger, index) => (
          <div key={trigger.id}>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <select
                  value={trigger.type}
                  onChange={(e) => handleOnChangeType(trigger, e.target.value as typeof trigger.type)}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all hover:border-blue-400"
                >
                  {commonConstants.triggers.map((type) => (
                    <option key={type} value={type}>
                      {translation.campaign[type]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                  <ChevronDown />
                </div>
              </div>

              {trigger.type === 'clickOnElement' && (
                <input
                  type="text"
                  value={trigger.data.selector}
                  onChange={(event) =>
                    setCampaign((campaign) => {
                      const newSelector = event.target.value;
                      trigger.data.selector = newSelector;
                      return structuredClone(campaign);
                    })
                  }
                  placeholder={translation.campaign.placeholderCssSelector}
                  className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all hover:border-blue-400"
                />
              )}

              {trigger.type === 'custom' && (
                <>
                  <input
                    value={trigger.data.name}
                    onChange={(event) => {
                      setCampaign((campaign) => {
                        const newName = event.target.value;
                        trigger.data.name = newName;
                        return structuredClone(campaign);
                      });
                    }}
                    placeholder={translation.campaign.placeholderName}
                    type="text"
                    className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all hover:border-blue-400"
                  />
                  <Editor trigger={trigger} setCampaign={setCampaign} />
                </>
              )}

              {trigger.type === 'pageLoad' && null}

              {trigger.type === 'timeOnPage' && (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all hover:border-blue-400"
                    max={60000}
                    min={0}
                    onChange={(event) => {
                      const valueAsNumber = Math.round(event.target.valueAsNumber);
                      let newSeconds = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
                      newSeconds = Math.trunc(newSeconds);
                      if (newSeconds < 0) newSeconds = 0;
                      else if (newSeconds > 60000) newSeconds = 60000;
                      event.target.value = String(newSeconds);
                      trigger.data.milliseconds = newSeconds;
                      setCampaign((campaign) => {
                        return structuredClone(campaign);
                      });
                    }}
                    step={1}
                    type="number"
                    value={trigger.data.milliseconds}
                  />
                  <span className="text-blue-600 font-medium">{translation.campaign.milliseconds}</span>
                </div>
              )}

              <button
                onClick={() => deleteTrigger(trigger)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {index < triggers.length - 1 && (
              <div className="flex justify-center items-center gap-2 my-3">
                <span className="px-4 py-2 rounded-lg font-medium transition-all bg-blue-600 text-white shadow-md">
                  OR
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Triggers;
