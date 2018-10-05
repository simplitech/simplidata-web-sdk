export default {
  system: {
    error: {
      unauthorized: 'Restricted Access',
      noServer: 'Could not connect to server',
      validation: 'Validation error',
      required: 'The field \'{0}\' is required',
      invalidEmail: 'The field \'{0}\' must be e-mail',
      invalidDate: 'The field \'{0}\' has not valid date',
      passwordLength: 'The password must have between {0} and {1} characters',
      samePassword: 'The fields password must match',
      length: 'The field \'{0}\' must have between {1} and {2} characters',
      maxLength: 'The field \'{0}\' must not exceed {0} characters',
      minLength: 'The field \'{0}\' must have at least {0} characters',
      min: 'The field \'{0}\' must have a minimum value of {1}',
      max: 'The field \'{0}\' must have a maximum value of {1}',
      invalidAlpha: 'The field \'{0}\' must contain only letters',
      invalidAlphanumeric: 'The field \'{0}\' must contain only letters and numbers',
      invalidCreditCard: 'Invalid card credit number',
      format: 'Wrong format for field \'{0}\'',
      phoneFormat: 'Wrong format for phone number',
      zipcodeFormat: 'Wrong format for zip code',
      rgFormat: 'Wrong format for RG document',
      cpfFormat: 'Wrong format for CPF document',
      cnpjFormat: 'Wrong format for CNPJ document',
    },
  },

  classes: {
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
      title: 'Address',
      columns: {
        idAddressPk: 'Id Address Pk',
        zipcode: 'Zipcode',
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        latitude: 'Latitude',
        longitude: 'Longitude',
        active: 'Active',
      },
    },
    ObjectOfAnalysis: {
      title: 'Object Of Analysis',
      columns: {
        recommendedChart: 'Recommended Chart',
        category: 'Category',
        periodicity: 'Periodicity',
        source: 'Source',
        unity: 'Unity',
        plan: 'Plan',
        user: 'User',
        oaChartTypeAvailability: 'Oa Chart Type Availability',
        oaMatchModel: 'Oa Match Model',
        oaMatchOa: 'Oa Match Oa',
        oaValueTypeAvailability: 'Oa Value Type Availability',
        objectOfAnalysisOaGroup: 'Object Of Analysis Oa Group',
        idObjectOfAnalysisPk: 'Id Object Of Analysis Pk',
        title: 'Title',
        comment: 'Comment',
        active: 'Active',
        idUserFk: 'Id User Fk',
        idCategoryFk: 'Id Category Fk',
        idPeriodicityFk: 'Id Periodicity Fk',
        idUnityFk: 'Id Unity Fk',
        idSourceFk: 'Id Source Fk',
        idRecommendedChartFk: 'Id Recommended Chart Fk',
        idPlanFk: 'Id Plan Fk',
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
        address: 'Address',
        idUserPk: 'Id User Pk',
        email: 'Email',
        password: 'Password',
        name: 'Full Name',
        personalDocument: 'Personal Document',
        corporateDocument: 'Corporate Document',
        corporateName: 'Corporate Name',
        tradingName: 'Trading Name',
        creationDate: 'Creation Date',
        active: 'Active',
        idAddressFk: 'Id Address Fk',
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
}