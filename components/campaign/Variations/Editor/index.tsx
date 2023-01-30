import React, { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from 'bastianparedes/components';
import type { editor } from 'monaco-editor';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';
import type {
  campaignJoined,
  variation
} from '../../../../types/databaseObjects';

import 'react-tabs/style/react-tabs.css';

interface props {
  setShowEditor: (arg0: boolean) => void;
  variation: variation;
  setCampaign: (
    campaign: (campaignJoined: campaignJoined) => campaignJoined
  ) => void;
}

const Editor = ({
  setCampaign,
  variation,
  setShowEditor
}: props): JSX.Element => {
  const idVariation = variation.idVariation;
  const [errors, setErrors] = useState<{
    css: editor.IMarker[];
    html: editor.IMarker[];
    javascript: editor.IMarker[];
  }>({ css: [], html: [], javascript: [] });
  const [html, setHtml] = useState(variation.html);
  const [css, setCss] = useState(variation.css);
  const [javascript, setJavascript] = useState(variation.javascript);

  const monacoConfig = {
    className: styles.monaco,
    options: {
      minimap: {
        enabled: false
      }
    },
    theme: 'vs-dark'
  };

  const monacoHtmlConfig = {
    onChange: (html: string | undefined): void => {
      setHtml(html ?? '');
    },
    onValidate: (errorsHtml: editor.IMarker[]) => {
      setErrors((errors) => ({ ...errors, html: errorsHtml }));
    },
    value: html
  };

  const monacoCssConfig = {
    onChange: (css: string | undefined): void => {
      setCss(css ?? '');
    },
    onValidate: (errorsCss: editor.IMarker[]) => {
      setErrors((errors) => ({ ...errors, css: errorsCss }));
    },
    value: css
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
      const variation = campaign.variation.map((variation) => {
        if (idVariation === variation.idVariation) {
          variation.html = html;
          variation.css = css;
          variation.javascript = javascript;
        }

        return variation;
      });

      return {
        ...campaign,
        variation
      };
    });
    setShowEditor(false);
  };

  return (
    <Modal setModalVisible={setShowEditor}>
      <div className={styles.container}>
        <button
          className={styles.buttonSave}
          disabled={
            errors.html.length + errors.css.length + errors.javascript.length >
            0
          }
          onClick={handleOnSave}
        >
          {labels.campaign.save}
        </button>
        <Tabs>
          <TabList>
            <Tab>HTML</Tab>
            <Tab>CSS</Tab>
            <Tab>JavaScript</Tab>
          </TabList>
          <TabPanel>
            <div className={styles.monacoContainer}>
              <Monaco {...monacoConfig} {...monacoHtmlConfig} language="html" />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.monacoContainer}>
              <Monaco {...monacoConfig} {...monacoCssConfig} language="css" />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.monacoContainer}>
              <Monaco
                {...monacoConfig}
                {...monacoJavascriptConfig}
                language="javascript"
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Modal>
  );
};

export default Editor;
