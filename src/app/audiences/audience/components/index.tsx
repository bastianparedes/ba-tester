'use client';

import React, { useState } from 'react';

import Buttons from './Buttons';
import Name from './Name';
import Requirements from './Requirements';
import styles from './styles.module.scss';
import type { AudienceExtendedWithoutDate } from '../../../../../types/databaseObjects';

const Components = ({
  initialAudience
}: {
  initialAudience: AudienceExtendedWithoutDate;
}) => {
  const [audience, setAudience] = useState(initialAudience);

  return (
    <div className={styles.container}>
      <Name audience={audience} setAudience={setAudience} />
      <Requirements
        requirements={audience.requirements}
        setAudience={setAudience}
      />
      <Buttons audience={audience} />
    </div>
  );
};

export default Components;
