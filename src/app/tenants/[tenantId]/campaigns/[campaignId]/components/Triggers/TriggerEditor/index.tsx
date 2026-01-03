import { useState } from 'react';

import Monaco from '@monaco-editor/react';
import { Modal } from '../../../../../../../_common/components/Modal';
import type { editor } from 'monaco-editor';

import type { TypeCampaign, TypeTriggerData } from '@/types/db';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { Pencil } from 'lucide-react';

import 'react-tabs/style/react-tabs.css';

interface Props {
  trigger: TypeTriggerData & { type: 'custom' };
  setCampaign: (campaign: (TypeCampaign: TypeCampaign) => TypeCampaign) => void;
}

const Editor = ({ setCampaign, trigger }: Props) => {
  const { translation } = useTranslationContext();
  const [showEditor, setShowEditor] = useState(false);
  const [errors, setErrors] = useState<{ javascript: editor.IMarker[] }>({
    javascript: [],
  });
  const [javascript, setJavascript] = useState(trigger.data.javascript);

  const monacoConfig = {
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

  const onSave = () => {
    setCampaign((campaign) => {
      trigger.data.javascript = javascript;
      return structuredClone(campaign);
    });
    setShowEditor(false);
  };

  const onCloseModal = () => {
    setJavascript(trigger.data.javascript);
    setShowEditor(false);
  };

  return (
    <>
      <button
        className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        onClick={() => setShowEditor(true)}
      >
        <Pencil size={20} />
      </button>
      {showEditor && (
        <Modal setModalVisible={() => onCloseModal()}>
          <div className="flex flex-col items-start gap-4 p-4">
            <button
              disabled={errors.javascript.length > 0}
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {translation.campaign.save}
            </button>
            <div className="w-[80vw] h-[80vh]">
              <Monaco {...monacoConfig} {...monacoJavascriptConfig} language="javascript" />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Editor;
