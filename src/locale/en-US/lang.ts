export default {
  system: {
    error: {
      unauthorized: 'Restricted Access',
      noServer: 'Could not connect to server',
      validation: 'Validation error',
      required: 'The field {0} is required',
      invalidEmail: 'The field {0} must be e-mail',
      invalidDate: 'The field {0} has not valid date',
      passwordLength: 'The password must have between {0} and {1} characters',
      samePassword: 'The fields password must match',
      length: 'The field {0} must have between {1} and {2} characters',
      maxLength: 'The field {0} must not exceed {0} characters',
      minLength: 'The field {0} must have at least {0} characters',
      min: 'The field {0} must have a minimum value of {1}',
      max: 'The field {0} must have a maximum value of {1}',
      invalidAlpha: 'The field {0} must contain only letters',
      invalidAlphanumeric: 'The field {0} must contain only letters and numbers',
      invalidCreditCard: 'Invalid card credit number',
      format: 'Wrong format for field {0}',
      phoneFormat: 'Wrong format for phone number',
      zipcodeFormat: 'Wrong format for zip code',
      rgFormat: 'Wrong format for RG document',
      cpfFormat: 'Wrong format for CPF document',
      cnpjFormat: 'Wrong format for CNPJ document',
      noData: 'No data found',
    },

    format: {
      date: 'YYYY/MM/DD',
      days: 'days',
      time: 'HH:mm',
    },
  },

  slang: {
    ChartType: {
      Line: 'Line',
      Bar: 'Bar',
      Area: 'Area',
      Table: 'Table',
    },
    DownloadType: {
      XLS: 'XLS',
    },
    ForecastType: {
      Automatic: 'Previsão automático (dinâmica fora da amostra)',
      Dynamic: 'Previsão dinânimca',
      Static: 'Previsão estática',
      Recursive: 'Previsões recursivas k-passos à frente: k =',
    },
    OaCategory: {
      IndicesdePrecos: 'Índices de Preços',
      IndicadoresdeAtividade: 'Indicadores de Atividade',
      ContasNacionais: 'Contas Nacionais',
      MercadodeTrabalho: 'Mercado de Trabalho',
      ContasPublicas: 'Contas Públicas',
      Credito: 'Crédito',
      SetorExterno: 'Setor Externo',
      IndicadoresFinanceiros: 'Indicadores Financeiros',
      Commodities: 'Commodities',
      IndicadoresInternacionais: 'Indicadores Internacionais',
      Producao: 'Produção',
      Consumoevendas: 'Consumo e vendas',
      Moedaecredito: 'Moeda e crédito',
      Comercioexterior: 'Comércio exterior',
      Financaspublicas: 'Finanças públicas',
      Cambio: 'Câmbio',
      Precos: 'Preços',
    },
    OaPeriodicity: {
      Daily: 'Daily',
      Weekly: 'Weekly',
      Biweekly: 'Biweekly',
      Monthly: 'Monthly',
      Bimonthly: 'Bimonthly',
      Quarterly: 'Quarterly',
      Quadrimesterly: 'Quadrimesterly',
      Semiannual: 'Semiannual',
      Yearly: 'Yearly',
    },
    OaVersionStatus: {
      OK: 'OK',
      Deprecated: 'Deprecated',
    },
    PeriodicityTransformationType: {
      Average: 'Average',
      Sum: 'Sum',
      EndofPeriod: 'End of Period',
    },
    TransformationType: {
      Sum: 'Sum',
      Subtraction: 'Subtraction',
      Division: 'Division',
      Multiplication: 'Multiplication',
      Differential: 'Differential',
      Log: 'Log',
      Exponential: 'Exponential',
      PeriodOverPeriodVariation: 'Period Over Period Variation',
      '3MonthsVariation': '3 Months Variation',
      '12MonthsVariation': '12 Months Variation',
      Average: 'Average',
      Median: 'Median',
      Maximum: 'Maximum',
      Mininum: 'Mininum',
      StandardDeviation: 'Standard Deviation',
      Mode: 'Mode',
      MovingAverageof2: 'Moving Average of 2',
      MovingAverageof3: 'Moving Average of  3',
      MovingAverageof4: 'Moving Average of  4',
      MovingAverageof6: 'Moving Average of 6',
      MovingAverageof12: 'Moving Average of 12',
      MovingAverageof24: 'Moving Average of 24',
      CAGRof12: 'CAGR of 12',
      CAGRof24: 'CAGR of 24',
    },
  },

  classes: {
    User: {
      columns: {
        personalDocument: 'Personal Document',
        corporateDocument: 'Corporate Document',
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
      accessAnalysis: 'Access Analysis',
      start: 'Start',
      end: 'End',
      add: 'Add',
      newCollection: 'New Collection',
      download: 'Download',
      collectionName: 'Collection name',
      save: 'Save',
      saveChartOnCollection: 'Save chart on collection',
      contentDownload: 'Content download',
      xls: 'XLS',
      date: 'Date',
      chooseTheOaToCombineInTheTransformation: 'Choose the indicator to combine in the transformation',
      search: 'Search',
      text: 'Text',
      writeYourComment: 'Write your comment...',
      fibonacciRetraction: 'Fibonacci',
      typeHere: 'Type here',
      dontFogetToSaveYourChanges: 'Não esqueça de salvar suas alterações',
    },
  },
}
