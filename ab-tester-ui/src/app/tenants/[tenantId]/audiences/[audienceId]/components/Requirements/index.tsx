import { useTranslationContext } from '@/app/_common/contexts/Translation';
import type { TypeAudienceWithOptionalId } from '@digital-retail/ab-tester-types/audience';
import { TypeTrackEventForAudience } from '@digital-retail/ab-tester-types/trackEvents';
import Requirement from './Requirement';

interface Props {
  requirements: TypeAudienceWithOptionalId['requirements'];
  setAudience: (audience: (TypeCampaign: TypeAudienceWithOptionalId) => TypeAudienceWithOptionalId) => void;
  trackEvents: TypeTrackEventForAudience[];
}

const Requirements = ({ setAudience, requirements, trackEvents }: Props) => {
  const { translation } = useTranslationContext();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">{translation.audience.requirementsTitle}</h2>
      </div>
      <Requirement grandParentNode={null} id={'0'} index={0} parentNode={null} requirement={requirements} setAudience={setAudience} trackEvents={trackEvents} />
    </div>
  );
};

export default Requirements;
