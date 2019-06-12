export default {
  system: {
    error: {
      unauthorized: 'Acesso Restrito',
      noServer: 'Não foi possível conectar ao servidor',
      validation: 'Erro de validação',
      required: 'Campo {0} é obrigatório',
      invalidEmail: 'Campo {0} deve ser um e-mail',
      invalidDate: 'Campo {0} não possui data válida',
      passwordLength: 'A senha deve ter entre {0} e {1} caracteres',
      samePassword: 'Os campos senha devem ser iguais',
      length: 'Campo {0} deve ter entre {1} e {2} caracteres',
      minLength: 'Campo {0} deve conter pelo menos {1} caracteres',
      maxLength: 'Campo {0} deve ter no máximo {1} caracteres',
      min: 'Campo {0} deve ser no mínimo {1}',
      max: 'Campo {0} deve ser no máximo {1}',
      invalidAlpha: 'Campo {0} deve conter apenas letras',
      invalidAlphanumeric: 'Campo {0} deve conter apenas letras e números',
      invalidCreditCard: 'Número de cartão de crédito inválido',
      format: 'Campo {0} está com a formatação errada',
      phoneFormat: 'O número de telefone está com a formatação errada',
      zipcodeFormat: 'O CEP está com a formatação errada',
      rgFormat: 'O RG está com a formatação errada',
      cpfFormat: 'O CPF está com a formatação errada',
      cnpjFormat: 'O CNPJ está com a formatação errada',
      noData: 'Nenhum dado encontrado',
    },

    format: {
      date: 'DD/MM/YYYY',
      days: 'dias',
      time: 'HH:mm',
    },
  },

  slang: {
    ChartType: {
      Line: 'Linha',
      Bar: 'Barra',
      Area: 'Área',
      Table: 'Tabela',
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
      Daily: 'Diariamente',
      Weekly: 'Semanalmente',
      Biweekly: 'Bisemanalmente',
      Monthly: 'Mensalmente',
      Bimonthly: 'Bimensalmente',
      Quarterly: 'Trimestralmente',
      Quadrimesterly: 'Quadrimestralmente',
      Semiannual: 'Semestralmente',
      Yearly: 'Anualmente',
    },
    OaVersionStatus: {
      OK: 'OK',
      Deprecated: 'Depreciado',
    },
    PeriodicityTransformationType: {
      Average: 'Média',
      Sum: 'Soma',
      'End of Period': 'Fim do período',
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
    combinerSymbol: {
      Sum: '+',
      Subtraction: '-',
      Division: '/',
      Multiplication: 'x',
    },
  },

  classes: {
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
    User: {
      title: 'Usuário',
      columns: {
        address: 'Endereço',
        idUserPk: 'ID',
        email: 'E-Mail',
        password: 'Senha',
        name: 'Nome Completo',
        primaryPhone: 'Telefone',
        primaryPhoneRegion: 'DDD',
        primaryPhoneNumber: 'Número de Telefone',
        personalDocument: 'CPF',
        corporateDocument: 'CNPJ',
        corporateName: 'Razão Social',
        tradingName: 'Nome Fantasia',
        creationDate: 'Data de criação',
        active: 'Ativo',
        idAddressFk: 'ID Endereço',
      },
    },
    MissingOaComplain: {
      title: 'Sugestão de indicador que está faltando',
      columns: {
        idMissingOaComplainPk: 'ID',
        text: 'Mensagem da sugestão',
        createdDate: 'Data de envio',
      },
    },
  },

  view: {
    chart: {
      chartAs: 'Visualizar como',
      line: 'Linha',
      transformation: 'Transformação',
      none: 'Nenhuma',
      advancedAnalysis: 'Análise Avançada',
      periodicity: 'Periodicidade',
      unity: 'Unidade',
      source: 'Fonte',
      lastUpdate: 'Última atualização',
      version: 'Versão',
      status: 'Status',
      accessAnalysis: 'Acessar Análise',
      start: 'Início',
      end: 'Fim',
      add: 'Adicionar',
      newCollection: 'Nova Coleção',
      download: 'Download',
      collectionName: 'Nome da coleção',
      save: 'Salvar',
      contentDownload: 'Download do conteúdo',
      xls: 'XLS',
      date: 'Data',
      chooseTheOaToCombineInTheTransformation: 'Escolha o indicador para combinar nessa transformação',
      search: 'Buscar',
      text: 'Texto',
      writeYourComment: 'Faça seu comentário...',
      fibonacciRetraction: 'Fibonacci',
      typeHere: 'Escreva aqui',
      dontFogetToSaveYourChanges: 'Não esqueça de salvar suas alterações',
      changeColor: 'Alterar cor',
      changePeriodicity: 'Alterar Periodicidade',

      tooltip: {
        save: 'Salvar gráfico',
        select: 'Ferramenta de seleção de desenhos',
        line: 'Desenhar reta',
        ellipse: 'Desenhar elipse',
        rectangle: 'Desenhar retângulo',
        pencil: 'Desenho livre',
        text: 'Escrever no gráfico',
        measure: 'Medir dimenções do gráfico',
        calc: 'Escolha uma ferramenta de cálculo',
        fibonacci: 'Calcular Fibonacci',
        comment: 'Fazer um comentário',
      },
    },

    periodicityMismatch: {
      title: 'Você selecionou indicadores com periodicidades diferentes',
      titleDescritive: 'Estas são as periodicidades dos indicadores que você está usando',
      objectivePeriodicity: 'Selecione qual periodicidade deseja usar em todos eles',
      objectiveTransformation: 'Selecione a maneira que deseja transformar os dados',
    },
  },
}
