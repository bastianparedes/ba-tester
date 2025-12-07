import commonConstants from '../common/constants';

const labels = Object.freeze({
  campaign: {
    cancel: 'Cancelar',
    name: {
      inputPlaceHolder: 'Nombre de la campaña',
      title: 'Campaña',
    },
    requirements: {
      newRequirement: 'Nueva restricción',
      table: {
        name: 'Nombre',
      },
      title: 'Restricciones',
    },
    save: 'Guardar',
    triggers: {
      booleanOperators: {
        or: 'o',
      },
      newTrigger: 'Nuevo disparador',
      placeholder: {
        [commonConstants.triggerTypes.clickOnElement]: {
          valueStringOne: 'Selector de CSS',
        },
        [commonConstants.triggerTypes.custom]: {
          valueStringOne: 'Nombre',
        },
      },
      milliseconds: 'Milisegundos',
      table: {
        name: 'Nombre',
      },
      title: 'Disparadores',
      types: {
        [commonConstants.triggerTypes.pageLoad]: 'Carga de página',
        [commonConstants.triggerTypes.clickOnElement]: 'Click en elemento',
        [commonConstants.triggerTypes.timeOnPage]: 'Tiempo en página',
        [commonConstants.triggerTypes.custom]: 'Personalizado',
      },
    },
    variations: {
      newVariation: 'Nueva variación',
      table: {
        id: 'ID',
        name: 'Nombre',
        traffic: 'Tráfico',
      },
      title: 'Variaciones',
    },
  },
  campaigns: {
    camapaignsTable: {
      campaignName: 'Nombre de campaña',
      id: 'ID',
      lastModified: 'Última modificación',
      status: 'Estado',
    },
    filters: {
      title: 'Filtros',
      name: 'Buscar por nombre',
      page: 'Página',
      quantity: 'Cantidad',
      status: 'Estado',
      applyFilters: 'Aplicar filtros',
    },
    header: {
      createCampaignButton: 'Crear nueva campaña',
      title: 'Campañas',
      subTitle: 'Gestión de experimentos y variaciones',
    },
    table: {
      noData: 'Sin datos',
    },
  },
  common: {
    requirement: {
      comparator: {
        [commonConstants.comparisons.contains]: 'Contiene',
        [commonConstants.comparisons.doesNotContain]: 'No contiene',
        [commonConstants.comparisons.exists]: 'Existe',
        [commonConstants.comparisons.doesNotExist]: 'No existe',
        [commonConstants.comparisons.is]: 'Es',
        [commonConstants.comparisons.isNot]: 'No es',
        [commonConstants.typeRepetitions.atLeast]: 'Al menos',
        [commonConstants.typeRepetitions.atMost]: 'A lo sumo',
        [commonConstants.typeRepetitions.exactly]: 'Exactamente',
        [commonConstants.typeRepetitions.lessThan]: 'Menor que',
        [commonConstants.typeRepetitions.moreThan]: 'Mayor que',
      },
      device: {
        [commonConstants.devices.desktop]: 'Escritorio',
        [commonConstants.devices.mobile]: 'Mobile',
      },
      operator: {
        [commonConstants.booleanOperators.and]: 'y',
        [commonConstants.booleanOperators.or]: 'o',
      },
      placeholder: {
        [commonConstants.requirementTypes.cookie]: {
          name: 'Nombre',
          value: 'Valor',
        },
        [commonConstants.requirementTypes.custom]: {
          name: 'Título',
        },
        [commonConstants.requirementTypes.device]: {},
        [commonConstants.requirementTypes.localStorage]: {
          name: 'Nombre',
          value: 'Valor',
        },
        [commonConstants.requirementTypes.queryParam]: {
          name: 'Nombre',
          value: 'Valor',
        },
        [commonConstants.requirementTypes.sessionStorage]: {
          name: 'Nombre',
          value: 'Valor',
        },
        [commonConstants.requirementTypes.url]: {
          value: 'Valor',
        },
      },
      type: {
        [commonConstants.requirementTypes.cookie]: 'Cookie',
        [commonConstants.requirementTypes.custom]: 'Custom',
        [commonConstants.requirementTypes.device]: 'Dispositivo',
        [commonConstants.requirementTypes.localStorage]: 'Local storage',
        [commonConstants.requirementTypes.queryParam]: 'Query Param',
        [commonConstants.requirementTypes.sessionStorage]: 'Session storage',
        [commonConstants.requirementTypes.url]: 'URL',
      },
    },
    statusLabels: {
      active: 'Activo',
      deleted: 'Borrado',
      inactive: 'Inactivo',
    },
    symbols: {
      percentage: '%',
    },
  },
});

export default labels;
