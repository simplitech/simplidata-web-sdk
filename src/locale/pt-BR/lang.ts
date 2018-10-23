export default {
  system: {
    error: {
      unauthorized: 'Acesso Restrito',
      noServer: 'Não foi possível conectar ao servidor',
      validation: 'Erro de validação',
      required: 'Campo \'{0}\' é obrigatório',
      invalidEmail: 'Campo \'{0}\' deve ser um e-mail',
      invalidDate: 'Campo \'{0}\' não possui data válida',
      passwordLength: 'A senha deve ter entre {0} e {1} caracteres',
      samePassword: 'Os campos senha devem ser iguais',
      length: 'Campo \'{0}\' deve ter entre {1} e {2} caracteres',
      minLength: 'Campo \'{0}\' deve conter pelo menos {1} caracteres',
      maxLength: 'Campo \'{0}\' deve ter no máximo {1} caracteres',
      min: 'Campo \'{0}\' deve ser no mínimo {1}',
      max: 'Campo \'{0}\' deve ser no máximo {1}',
      invalidAlpha: 'Campo \'{0}\' deve conter apenas letras',
      invalidAlphanumeric: 'Campo \'{0}\' deve conter apenas letras e números',
      invalidCreditCard: 'Número de cartão de crédito inválido',
      format: 'Campo \'{0}\' está com a formatação errada',
      phoneFormat: 'O número de telefone está com a formatação errada',
      zipcodeFormat: 'O CEP está com a formatação errada',
      rgFormat: 'O RG está com a formatação errada',
      cpfFormat: 'O CPF está com a formatação errada',
      cnpjFormat: 'O CNPJ está com a formatação errada',
    },
  },

  classes: {
    Admin: {
      title: 'Admin',
      columns: {
        idAdminPk: 'ID',
        email: 'E-Mail',
        password: 'Senha',
        name: 'Nome',
        active: 'Ativo',
      },
    },
    OaSource: {
      title: 'Oa Source',
      columns: {
        idSourcePk: 'Id Source Pk',
        title: 'Title',
        link: 'Link',
        active: 'Active',
      },
    },
    Address: {
      title: 'Endereço',
      columns: {
        idAddressPk: 'ID',
        zipcode: 'CEP',
        street: 'Rua',
        number: 'Número',
        complement: 'Complemento',
        city: 'Cidade',
        state: 'Estado',
        latitude: 'Latitude',
        longitude: 'Longitude',
        active: 'Ativo',
      },
    },
    ObjectOfAnalysis: {
      title: 'Objeto de Análise',
      columns: {
        recommendedChart: 'Chart Recomendado',
        category: 'Categoria',
        periodicity: 'Periodicidade',
        source: 'Fonte',
        unity: 'Unidade',
        plan: 'Plano',
        user: 'Usuário',
        oaVersions: 'Versões OA',
        oaChartTypeAvailability: 'Disponibilidade de Tipo de Chart',
        oaMatchModel: 'Modelo',
        oaMatchOa: 'Match',
        oaValueTypeAvailability: 'Disponibilidade de Tipo de Valor',
        objectOfAnalysisOaGroup: 'Grupo de Objeto de Análise',
        idObjectOfAnalysisPk: 'ID',
        title: 'Título',
        comment: 'Comentário',
        active: 'Ativo',
        idUserFk: 'ID Usuário',
        idCategoryFk: 'ID Categoria',
        idPeriodicityFk: 'ID Periodicidade',
        idUnityFk: 'ID Unidade',
        idSourceFk: 'ID Fonte',
        idRecommendedChartFk: 'ID Chart Recomendado',
        idPlanFk: 'ID Plan',
      },
    },
    OaDataset: {
      title: 'Oa Dataset',
      columns: {
        oaVersion: 'Oa Version',
        idOaDatasetPk: 'Id Oa Dataset Pk',
        creationDate: 'Creation Date',
        active: 'Active',
        idOaVersionFk: 'Id Oa Version Fk',
      },
    },
    TransformationType: {
      title: 'Transformation Type',
      columns: {
        idTransformationTypePk: 'Id Transformation Type Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    OaPeriodicity: {
      title: 'Oa Periodicity',
      columns: {
        idOaPeriodicityPk: 'Id Oa Periodicity Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    OaVersion: {
      title: 'Oa Version',
      columns: {
        oaVersionStatus: 'Oa Version Status',
        objectOfAnalysis: 'Object Of Analysis',
        idOaVersionPk: 'Id Oa Version Pk',
        title: 'Title',
        active: 'Active',
        idOaVersionStatusFk: 'Id Oa Version Status Fk',
        idObjectOfAnalysisFk: 'Id Object Of Analysis Fk',
      },
    },
    OaVersionStatus: {
      title: 'Oa Version Status',
      columns: {
        idOaVersionStatusPk: 'Id Oa Version Status Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    OaGroup: {
      title: 'Oa Group',
      columns: {
        parentGroup: 'Parent Group',
        objectOfAnalysisOaGroup: 'Object Of Analysis Oa Group',
        idOaGroupPk: 'Id Oa Group Pk',
        title: 'Title',
        active: 'Active',
        idParentGroupFk: 'Id Parent Group Fk',
      },
    },
    ChartType: {
      title: 'Chart Type',
      columns: {
        oaChartTypeAvailability: 'Oa Chart Type Availability',
        idChartTypePk: 'Id Chart Type Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    UserSavedChart: {
      title: 'User Saved Chart',
      columns: {
        collection: 'Collection',
        downloadType: 'Download Type',
        user: 'User',
        idUserChartPk: 'Id User Chart Pk',
        json: 'Json',
        creationDate: 'Creation Date',
        active: 'Active',
        idUserFk: 'Id User Fk',
        idCollectionFk: 'Id Collection Fk',
        idDownloadTypeFk: 'Id Download Type Fk',
      },
    },
    UserUsedOa: {
      title: 'User Used Oa',
      columns: {
        objectOfAnalysis: 'Object Of Analysis',
        user: 'User',
        usedDate: 'Used Date',
        idUserFk: 'Id User Fk',
        idObjectOfAnalysisFk: 'Id Object Of Analysis Fk',
      },
    },
    Collection: {
      title: 'Collection',
      columns: {
        user: 'User',
        idCollectionPk: 'Id Collection Pk',
        title: 'Title',
        creationDate: 'Creation Date',
        active: 'Active',
        idUserFk: 'Id User Fk',
      },
    },
    User: {
      title: 'User',
      columns: {
        address: 'Endereço',
        idUserPk: 'ID',
        email: 'E-Mail',
        password: 'Senha',
        name: 'Nome Completo',
        personalDocument: 'CPF',
        corporateDocument: 'CNPJ',
        corporateName: 'Razão Social',
        tradingName: 'Nome Fantasia',
        creationDate: 'Data de criação',
        active: 'Ativo',
        idAddressFk: 'ID Endereço',
      },
    },
    OaUnity: {
      title: 'Oa Unity',
      columns: {
        idOaUnityPk: 'Id Oa Unity Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    News: {
      title: 'News',
      columns: {
        oaCategory: 'Oa Category',
        idNewsPk: 'Id News Pk',
        title: 'Title',
        link: 'Link',
        dataCreation: 'Data Creation',
        active: 'Active',
        idOaCategoryFk: 'Id Oa Category Fk',
      },
    },
    DownloadType: {
      title: 'Download Type',
      columns: {
        idDownloadTypePk: 'Id Download Type Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    OaCategory: {
      title: 'Oa Category',
      columns: {
        idOaCategoryPk: 'Id Oa Category Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    ValueType: {
      title: 'Value Type',
      columns: {
        oaValueTypeAvailability: 'Oa Value Type Availability',
        idValueTypePk: 'Id Value Type Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    Plan: {
      title: 'Plan',
      columns: {
        idPlanPk: 'Id Plan Pk',
        title: 'Title',
        gatewayId: 'Gateway Id',
        active: 'Active',
      },
    },
    LoginSerialized: {
      title: 'Login Serialized',
      columns: {
        email: 'Email',
        password: 'Password',
        hash: 'Hash',
      },
    },
    Model: {
      title: 'Model',
      columns: {
        oaMatchModel: 'Oa Match Model',
        idModelPk: 'Id Model Pk',
        title: 'Title',
        active: 'Active',
      },
    },
    OaData: {
      title: 'Oa Data',
      columns: {
        oaDataset: 'Oa Dataset',
        idOaDataPk: 'Id Oa Data Pk',
        value: 'Value',
        dt: 'Dt',
        active: 'Active',
        idOaDatasetFk: 'Id Oa Dataset Fk',
      },
    },
  },

  view: {
    chart: {
      chartAs: 'Chart as',
      line: 'line',
      valuesOfType: 'Values of type',
      allPeriod: 'All period',
      transformation: 'Transformation',
      none: 'None',
      advancedAnalysis: 'Advanced Analysis',
      periodicity: 'Periodicity',
      unity: 'Unity',
      source: 'Source',
      lastUpdate: 'Last Update',
      version: 'Version',
      status: 'Status',
      accessAnalysis: 'Acessar Análise',
    },
  },
}
