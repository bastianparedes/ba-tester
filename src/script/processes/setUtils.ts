import commonConstants from '../../config/common/constants';
import type { ba_tester } from '@/script/types';
import cookie from '@/script/utils/cookie';

declare global {
  interface Window {
    ba_tester: ba_tester;
  }
}

const getDevice = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  return isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;
};

const script = () => {
  window.ba_tester = {
    ...(window.ba_tester ?? {}),
    cookie,
    device: getDevice(),
  };
};

export default script;
