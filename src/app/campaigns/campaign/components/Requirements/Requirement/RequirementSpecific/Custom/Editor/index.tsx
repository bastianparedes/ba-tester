import React, { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from '../../../../../../../_components/Modal';

import styles from './styles.module.scss';
import type { TypeCampaignExtended, TypeRequirementData } from '@/types/db';
import { useTranslationContext } from '../../../../../../../_contexts/useTranslation';

import 'react-tabs/style/react-tabs.css';

interface Props {
  setShowEditor: (arg0: boolean) => void;
  requirement: TypeRequirementData & { type: 'custom' };
  setCampaign: (campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended) => void;
}

const Editor = ({ setCampaign, requirement, setShowEditor }: Props) => {
  const translation = useTranslationContext();

  const [javascript, setJavascript] = useState(String(requirement.data.javascript));

  const monacoConfig = {
    className: styles.monaco,
    options: {
      minimap: {
        enabled: false,
      },
    },
    theme: 'vs-dark',
  };

  const monacoJavascriptConfig = {
    onChange: (javascript: string | undefined) => {
      setJavascript(javascript ?? '');
    },
    value: javascript,
  };

  const handleOnSave = () => {
    setCampaign((campaign) => {
      requirement.data.javascript = javascript;

      return structuredClone(campaign);
    });
    setShowEditor(false);
  };

  return (
    <Modal setModalVisible={setShowEditor}>
      <div className={styles.container}>
        <button onClick={handleOnSave}>{translation.campaign.save}</button>
        <div className={styles.monacoContainer}>
          <Monaco {...monacoConfig} {...monacoJavascriptConfig} language="javascript" />
        </div>
      </div>
    </Modal>
  );
};

export default Editor;
