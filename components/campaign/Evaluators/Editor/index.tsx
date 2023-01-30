import React, { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from 'bastianparedes/components';
import type { editor } from 'monaco-editor';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';
import type {
  campaignJoined,
  evaluator
} from '../../../../types/databaseObjects';

import 'react-tabs/style/react-tabs.css';

interface props {
  setShowEditor: (arg0: boolean) => void;
  evaluator: evaluator;
  setCampaign: (
    campaign: (campaignJoined: campaignJoined) => campaignJoined
  ) => void;
}

const Editor = ({
  setCampaign,
  evaluator,
  setShowEditor
}: props): JSX.Element => {
  const idEvaluator = evaluator.idEvaluator;
  const [errors, setErrors] = useState<{ javascript: editor.IMarker[] }>({
    javascript: []
  });
  const [javascript, setJavascript] = useState(evaluator.javascript);

  const monacoConfig = {
    className: styles.monaco,
    options: {
      minimap: {
        enabled: false
      }
    },
    theme: 'vs-dark'
  };

  const monacoJavascriptConfig = {
    onChange: (javascript: string | undefined): void => {
      setJavascript(javascript ?? '');
    },
    onValidate: (errorsJavascript: editor.IMarker[]) => {
      setErrors((errors) => ({ ...errors, javascript: errorsJavascript }));
    },
    value: javascript
  };

  const handleOnSave = (): void => {
    setCampaign((campaign) => {
      const evaluator = campaign.evaluator.map((evaluator) => {
        if (idEvaluator === evaluator.idEvaluator) {
          evaluator.javascript = javascript;
        }

        return evaluator;
      });

      return {
        ...campaign,
        evaluator
      };
    });
    setShowEditor(false);
  };

  return (
    <Modal setModalVisible={setShowEditor}>
      <div className={styles.container}>
        <button
          className={styles.buttonSave}
          disabled={errors.javascript.length > 0}
          onClick={handleOnSave}
        >
          {labels.campaign.save}
        </button>
        <div className={styles.monacoContainer}>
          <Monaco
            {...monacoConfig}
            {...monacoJavascriptConfig}
            language="javascript"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Editor;
