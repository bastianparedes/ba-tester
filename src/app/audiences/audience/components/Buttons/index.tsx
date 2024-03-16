import React, { useState } from 'react';

import path from 'path';

import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../../config/constants';
import { basePath } from '../../../../../../next.config';
import type { AudienceExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import Loader from '../../../../common/Loader';

interface Props {
  audience: AudienceExtendedWithoutDate;
}

const Buttons = ({ audience }: Props) => {
  const [loading, setLoading] = useState(false);
  const returnToAudiences = () => {
    location.href = path.join(basePath, constants.pages.audiences);
  };

  const handleOnSave = async () => {
    setLoading(true);
    await fetch(path.join(basePath, constants.api.audience.upsert), {
      body: JSON.stringify({ audience }),
      method: 'POST'
    });
    setLoading(false);
    returnToAudiences();
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <Save audience={audience} onClick={handleOnSave} />
        <Cancel onClick={returnToAudiences} />
      </div>
    </>
  );
};

export default Buttons;
