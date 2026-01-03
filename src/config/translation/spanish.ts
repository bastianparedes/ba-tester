import {
  TypeStringComparator,
  TypeNumericComparator,
  TypeDeviceType,
  TypeBooleanOperator,
  TypeTriggerType,
  TypeRequirementType,
  TypeStatus,
} from '@/types/constants';

const labels = {
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
        clickOnElement: {
          valueStringOne: 'Selector CSS',
        },
        custom: {
          valueStringOne: 'Nombre',
        },
      } satisfies Partial<Record<TypeTriggerType, unknown>>,
      milliseconds: 'Milisegundos',
      table: {
        name: 'Nombre',
      },
      title: 'Disparadores',
      types: {
        pageLoad: 'Carga de página',
        clickOnElement: 'Clic en elemento',
        timeOnPage: 'Tiempo en la página',
        custom: 'Personalizado',
      } satisfies Record<TypeTriggerType, string>,
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
      campaignName: 'Nombre de la campaña',
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
      noData: 'No se encontraron tests que coincidan con los filtros',
    },
  },
  common: {
    requirement: {
      comparator: {
        contains: 'Contiene',
        doesNotContain: 'No contiene',
        exists: 'Existe',
        doesNotExist: 'No existe',
        is: 'Es',
        isNot: 'No es',
        atLeast: 'Como mínimo',
        atMost: 'Como máximo',
        exactly: 'Exactamente',
        lessThan: 'Menor que',
        moreThan: 'Mayor que',
      } satisfies Record<TypeStringComparator | TypeNumericComparator, string>,
      device: {
        desktop: 'Escritorio',
        mobile: 'Móvil',
      } satisfies Record<TypeDeviceType, string>,
      operator: {
        and: 'y',
        or: 'o',
      } satisfies Record<TypeBooleanOperator, string>,
      placeholder: {
        cookie: {
          name: 'Nombre',
          value: 'Valor',
        },
        custom: {
          name: 'Título',
        },
        device: {},
        localStorage: {
          name: 'Nombre',
          value: 'Valor',
        },
        queryParam: {
          name: 'Nombre',
          value: 'Valor',
        },
        sessionStorage: {
          name: 'Nombre',
          value: 'Valor',
        },
        url: {
          value: 'Valor',
        },
      } satisfies Partial<Record<TypeRequirementType, { name?: string; value?: string }>>,
      type: {
        cookie: 'Cookie',
        custom: 'Personalizado',
        device: 'Dispositivo',
        localStorage: 'Almacenamiento local',
        queryParam: 'Parámetro de consulta',
        sessionStorage: 'Almacenamiento de sesión',
        url: 'URL',
      } satisfies Record<Exclude<TypeRequirementType, 'node'>, string>,
    },
    statusLabels: {
      active: 'Activo',
      deleted: 'Eliminado',
      inactive: 'Inactivo',
    } satisfies Record<TypeStatus, string>,
    symbols: {
      percentage: '%',
    },
  },
};

export default labels;
