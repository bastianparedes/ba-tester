import React from 'react';

import { classNames } from 'bastianparedes/utils';
import { MdDelete } from 'react-icons/md';
import { TbBracketsContain } from 'react-icons/tb';

import HistoryInput from './common/HistoryInput';
import RequirementSpecific from './Requirement';
import styles from './styles.module.scss';
import commonConstants from '../../../../../../../config/common/constants';
import type { AudienceExtendedWithoutDate } from '../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../common/context/useTranslation';
import AddButton from '../../AddButton';

interface Props {
  grandParentNode: AudienceExtendedWithoutDate['requirements'] | null;
  id: string;
  index: number;
  parentNode: AudienceExtendedWithoutDate['requirements'] | null;
  requirement: AudienceExtendedWithoutDate['requirements']['data']['children'][number];
  setAudience: (
    audience: (
      AudienceExtendedWithoutDate: AudienceExtendedWithoutDate
    ) => AudienceExtendedWithoutDate
  ) => void;
}

const Requirement = ({
  grandParentNode,
  id,
  index,
  parentNode,
  requirement,
  setAudience
}: Props) => {
  const translation = useTranslationContext();

  const getSiblings = () => {
    if (parentNode === null) return [];
    return parentNode.data.children.filter(
      (_child, indexChild) => indexChild !== index
    );
  };

  const newRequirement = {
    data: {
      comparatorHistory: commonConstants.typeRepetitions.atLeast,
      limitHistory: commonConstants.limitTypes.oneWeek,
      repetitionsHistory: 1
    },
    type: commonConstants.requirementTypes.pageViewsHistory
  };

  if (requirement.type === commonConstants.requirementTypes.node) {
    const isRootNode = id === '0';
    const addNewRequirement = () => {
      requirement.data.children.push(newRequirement);

      setAudience((audience) => {
        return structuredClone(audience);
      });
    };

    const switchToAnd = () => {
      requirement.data.operator = commonConstants.booleanOperators.and;
      setAudience((audience) => structuredClone(audience));
    };

    const switchToOr = () => {
      requirement.data.operator = commonConstants.booleanOperators.or;
      setAudience((audience) => structuredClone(audience));
    };

    return (
      <div className={styles.nodeContainer}>
        {!isRootNode && <div className={styles.bordeSuperior}></div>}
        <div
          className={classNames(
            styles.nodeContent,
            !isRootNode && styles.internalNodeContent
          )}
        >
          {requirement.data.children.map((childNode, indexChild) => (
            <div key={id + '-' + String(indexChild)}>
              {indexChild > 0 && (
                <>
                  <button
                    className={classNames(
                      styles.andOr,
                      requirement.data.operator ===
                        commonConstants.booleanOperators.and &&
                        styles.andOrSelected
                    )}
                    disabled={
                      requirement.data.operator ===
                      commonConstants.booleanOperators.and
                    }
                    onClick={switchToAnd}
                  >
                    {translation.common.requirement.operator.and}
                  </button>
                  <button
                    className={classNames(
                      styles.andOr,
                      requirement.data.operator ===
                        commonConstants.booleanOperators.or &&
                        styles.andOrSelected
                    )}
                    disabled={
                      requirement.data.operator ===
                      commonConstants.booleanOperators.or
                    }
                    onClick={switchToOr}
                  >
                    {translation.common.requirement.operator.or}
                  </button>
                </>
              )}
              <Requirement
                grandParentNode={parentNode}
                id={id + '-' + String(indexChild)}
                index={indexChild}
                key={id + '-' + String(indexChild)}
                parentNode={requirement}
                requirement={childNode}
                setAudience={setAudience}
              />
            </div>
          ))}
          <AddButton
            className={styles.addButtonMargin}
            onClick={addNewRequirement}
          >
            {translation.audience.requirements.newRequirement}
          </AddButton>
        </div>
        {!isRootNode && <div className={styles.bordeInferior}></div>}
      </div>
    );
  }

  if (parentNode === null) return null;

  const siblings = getSiblings();
  const hasSiblings = siblings.length > 0;

  const addNewNode = () => {
    const newNode = {
      data: {
        children: [requirement, newRequirement],
        operator: commonConstants.booleanOperators.and
      },
      type: commonConstants.requirementTypes.node
    };

    parentNode.data.children[index] = newNode;

    setAudience((audience) => {
      return structuredClone(audience);
    });
  };

  const handleOnChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target
      .value as (typeof commonConstants)['audienceRequirements'][number];

    const dataHistory = Object.freeze({
      comparatorHistory: commonConstants.numericComparators.atLeast,
      limitHistory: commonConstants.limitTypes.oneWeek,
      repetitionsHistory: 1
    });

    if (newType === commonConstants.requirementTypes.pageViewsHistory)
      parentNode.data.children[index] = {
        data: { ...dataHistory },
        type: newType
      };

    setAudience((audience) => {
      return structuredClone(audience);
    });
  };

  const removeRequirement = () => {
    const newRequirements = parentNode.data.children.filter(
      (_child, indexChild) => indexChild !== index
    );

    parentNode.data.children = newRequirements;

    if (newRequirements.length === 1) {
      const uniqueSibling = newRequirements[0];
      if (uniqueSibling.type === commonConstants.requirementTypes.node) {
        parentNode.data = uniqueSibling.data;
      } else if (grandParentNode !== null) {
        const indexOfParentNode = grandParentNode.data.children.findIndex(
          (child) =>
            child.type === commonConstants.requirementTypes.node &&
            child.data.children.length === 1
        );
        grandParentNode.data.children[indexOfParentNode] = uniqueSibling;
      }
    }

    setAudience((audience) => {
      return structuredClone(audience);
    });
  };

  return (
    <div className={styles.leafContainer}>
      <select onChange={handleOnChangeType} value={requirement.type}>
        {commonConstants.audienceRequirements.map((type) => (
          <option key={type} value={type}>
            {translation.common.requirement.type[type]}
          </option>
        ))}
      </select>
      <RequirementSpecific
        setAudience={setAudience}
        requirement={requirement}
      />
      {requirement.type ===
        commonConstants.requirementTypes.pageViewsHistory && (
        <HistoryInput setAudience={setAudience} requirement={requirement} />
      )}
      <button className={styles.button} onClick={removeRequirement}>
        <MdDelete />
      </button>
      {hasSiblings && (
        <button className={styles.button} onClick={addNewNode}>
          <TbBracketsContain />
        </button>
      )}
    </div>
  );
};

export default Requirement;
