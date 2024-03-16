import React, { useState } from 'react';

import { MdEdit } from 'react-icons/md';

import Editor from './Editor';
import styles from './styles.module.scss';
import type {
  CampaignExtendedWithoutDate,
  TriggerData
} from '../../../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../../../common/context/useTranslation';

interface Props {
  trigger: TriggerData & { type: 'custom' };
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
  ) => void;
}

const Trigger = ({ setCampaign, trigger }: Props) => {
  const translation = useTranslationContext();
  const name = trigger.data.name;

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign) => {
      const newName = event.target.value;
      trigger.data.name = newName;
      return structuredClone(campaign);
    });
  };

  const [showEditor, setShowEditor] = useState(false);
  const openEditor = () => {
    setShowEditor(true);
  };

  return (
    <>
      <input
        value={name}
        onChange={handleOnChange}
        placeholder={
          translation.campaign.triggers.placeholder[trigger.type].valueStringOne
        }
        type="text"
      />
      <button className={styles.button} onClick={openEditor}>
        <MdEdit />
      </button>
      {showEditor && (
        <Editor
          trigger={trigger}
          setCampaign={setCampaign}
          setShowEditor={setShowEditor}
        />
      )}
    </>
  );
};

export default Trigger;
