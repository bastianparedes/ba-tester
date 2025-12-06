import React, { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from '../../../../../../../_components/Modal';
import type { editor } from 'monaco-editor';

import styles from './styles.module.scss';
import type { TypeCampaignExtended, TypeTriggerData } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../../../../_contexts/useTranslation';

import 'react-tabs/style/react-tabs.css';

interface Props {
  setShowEditor: (arg0: boolean) => void;
  trigger: TypeTriggerData & { type: 'custom' };
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Editor = ({ setCampaign, trigger, setShowEditor }: Props) => {
  const translation = useTranslationContext();
  const [errors, setErrors] = useState<{ javascript: editor.IMarker[] }>({
    javascript: [],
  });
  const [javascript, setJavascript] = useState(trigger.data.javascript);

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
    onValidate: (errorsJavascript: editor.IMarker[]) => {
      setErrors((errors) => ({ ...errors, javascript: errorsJavascript }));
    },
    value: javascript,
  };

  const handleOnSave = () => {
    setCampaign((campaign) => {
      trigger.data.javascript = javascript;

      return structuredClone(campaign);
    });
    setShowEditor(false);
  };

  return (
    <Modal setModalVisible={setShowEditor}>
      <div className={styles.container}>
        <button disabled={errors.javascript.length > 0} onClick={handleOnSave}>
          {translation.campaign.save}
        </button>
        <div className={styles.monacoContainer}>
          <Monaco {...monacoConfig} {...monacoJavascriptConfig} language="javascript" />
        </div>
      </div>
    </Modal>
  );
};

export default Editor;
