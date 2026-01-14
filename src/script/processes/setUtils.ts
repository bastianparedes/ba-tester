import commonConstants from '@/config/common/constants';
import type { TypeBaTester } from '@/script/types';
import cookie from '@/script/utils/cookie';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const getDevice = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  return isMobile
    ? commonConstants.devices.mobile
    : commonConstants.devices.desktop;
};

const script = () => {
  window[commonConstants.windowKey] = {
    ...(window[commonConstants.windowKey] ?? {}),
    cookie,
    device: getDevice(),
  };
};

export default script;
