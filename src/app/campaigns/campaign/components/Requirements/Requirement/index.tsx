import React from 'react';

import { classNames } from 'bastianparedes/utils';
import { MdDelete } from 'react-icons/md';
import { TbBracketsContain } from 'react-icons/tb';

import RequirementSpecific from './RequirementSpecific';
import styles from './styles.module.scss';
import commonConstants from '../../../../../../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../common/context/useTranslation';
import AddButton from '../../AddButton';

interface Props {
  audiences: {
    id: number;
    name: string;
  }[];
  grandParentNode: CampaignExtendedWithoutDate['requirements'] | null;
  id: string;
  index: number;
  parentNode: CampaignExtendedWithoutDate['requirements'] | null;
  requirement: CampaignExtendedWithoutDate['requirements']['data']['children'][number];
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
  ) => void;
}

const Requirement = ({
  audiences,
  grandParentNode,
  id,
  index,
  parentNode,
  requirement,
  setCampaign
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
      comparator: commonConstants.comparisons.contains,
      value: ''
    },
    type: commonConstants.requirementTypes.url
  };

  if (requirement.type === commonConstants.requirementTypes.node) {
    const isRootNode = id === '0';
    const addNewRequirement = () => {
      requirement.data.children.push(newRequirement);

      setCampaign((campaign) => {
        return structuredClone(campaign);
      });
    };

    const switchToAnd = () => {
      requirement.data.operator = commonConstants.booleanOperators.and;
      setCampaign((campaign) => structuredClone(campaign));
    };

    const switchToOr = () => {
      requirement.data.operator = commonConstants.booleanOperators.or;
      setCampaign((campaign) => structuredClone(campaign));
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
                audiences={audiences}
                grandParentNode={parentNode}
                id={id + '-' + String(indexChild)}
                index={indexChild}
                key={id + '-' + String(indexChild)}
                parentNode={requirement}
                requirement={childNode}
                setCampaign={setCampaign}
              />
            </div>
          ))}
          <AddButton
            className={styles.addButtonMargin}
            onClick={addNewRequirement}
          >
            {translation.campaign.requirements.newRequirement}
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

    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  const handleOnChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target
      .value as (typeof commonConstants)['campaignRequirements'][number];

    if (
      newType === commonConstants.requirementTypes.cookie ||
      newType === commonConstants.requirementTypes.localStorage ||
      newType === commonConstants.requirementTypes.queryParam ||
      newType === commonConstants.requirementTypes.sessionStorage
    )
      parentNode.data.children[index] = {
        data: {
          comparator: commonConstants.comparisons.is,
          name: '',
          value: ''
        },
        type: newType
      };
    else if (newType === commonConstants.requirementTypes.custom)
      parentNode.data.children[index] = {
        data: {
          javascript: 'resolve(true);',
          name: ''
        },
        type: newType
      };
    else if (newType === commonConstants.requirementTypes.device)
      parentNode.data.children[index] = {
        data: {
          comparator: commonConstants.comparisons.is,
          device: commonConstants.devices.desktop
        },
        type: newType
      };
    else if (newType === commonConstants.requirementTypes.url)
      parentNode.data.children[index] = {
        data: {
          comparator: commonConstants.comparisons.is,
          value: ''
        },
        type: newType
      };
    else if (newType === commonConstants.requirementTypes.audience)
      parentNode.data.children[index] = {
        data: {
          id: undefined
        },
        type: newType
      };
    setCampaign((campaign) => {
      return structuredClone(campaign);
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

    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  return (
    <div className={styles.leafContainer}>
      <select onChange={handleOnChangeType} value={requirement.type}>
        {commonConstants.campaignRequirements.map((type) => (
          <option key={type} value={type}>
            {translation.common.requirement.type[type]}
          </option>
        ))}
      </select>
      <RequirementSpecific
        audiences={audiences}
        setCampaign={setCampaign}
        requirement={requirement}
      />
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
