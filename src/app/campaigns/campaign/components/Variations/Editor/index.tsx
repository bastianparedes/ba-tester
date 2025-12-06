import React, { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from '../../../../_components/Modal';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import styles from './styles.module.scss';
import type { TypeCampaignExtended, TypeVariationData } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../_contexts/useTranslation';

import 'react-tabs/style/react-tabs.css';

interface Props {
  setShowEditor: (arg0: boolean) => void;
  variation: TypeVariationData;
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Editor = ({ setCampaign, variation, setShowEditor }: Props) => {
  const translation = useTranslationContext();
  const [html, setHtml] = useState(variation.html);
  const [css, setCss] = useState(variation.css);
  const [javascript, setJavascript] = useState(variation.javascript);

  const monacoConfig = {
    className: styles.monaco,
    options: {
      minimap: {
        enabled: false,
      },
    },
    theme: 'vs-dark',
  };

  const monacoHtmlConfig = {
    onChange: (html: string | undefined) => {
      setHtml(html ?? '');
    },
    value: html,
  };

  const monacoCssConfig = {
    onChange: (css: string | undefined) => {
      setCss(css ?? '');
    },
    value: css,
  };

  const monacoJavascriptConfig = {
    onChange: (javascript: string | undefined) => {
      setJavascript(javascript ?? '');
    },
    value: javascript,
  };

  const handleOnSave = () => {
    setCampaign((campaign) => {
      variation.html = html;
      variation.css = css;
      variation.javascript = javascript;

      return structuredClone(campaign);
    });
    setShowEditor(false);
  };

  return (
    <Modal setModalVisible={setShowEditor}>
      <div className={styles.container}>
        <button className={styles.buttonSave} onClick={handleOnSave}>
          {translation.campaign.save}
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
              <Monaco {...monacoConfig} {...monacoJavascriptConfig} language="javascript" />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Modal>
  );
};

export default Editor;
