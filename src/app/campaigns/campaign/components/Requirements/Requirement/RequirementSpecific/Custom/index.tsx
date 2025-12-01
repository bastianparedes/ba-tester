import React, { useState } from 'react';

import { MdEdit } from 'react-icons/md';

import Editor from './Editor';
import styles from './styles.module.scss';
import type { CampaignExtendedWithoutDate } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../../../_contexts/useTranslation';

interface Props {
  requirement: CampaignExtendedWithoutDate['requirements']['data']['children'][number];
  setCampaign: (
    campaign: (CampaignExtendedWithoutDate: CampaignExtendedWithoutDate) => CampaignExtendedWithoutDate,
  ) => void;
}

const Requirement = ({ setCampaign, requirement }: Props) => {
  const translation = useTranslationContext();

  if (requirement.type !== 'custom') throw new Error('Type custom expected in requirement');

  const [showEditor, setShowEditor] = useState(false);
  const openEditor = () => {
    setShowEditor(true);
  };

  const handleOnChangeName = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign) => {
      requirement.data.name = event.target.value;
      return structuredClone(campaign);
    });
  };

  return (
    <>
      <input
        value={requirement.data.name}
        onChange={handleOnChangeName}
        placeholder={translation.common.requirement.placeholder[requirement.type].name}
        type="text"
      />
      <button className={styles.button} onClick={openEditor}>
        <MdEdit />
      </button>
      {showEditor && <Editor requirement={requirement} setCampaign={setCampaign} setShowEditor={setShowEditor} />}
    </>
  );
};

export default Requirement;
