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

    format: {
      date: 'DD/MM/YYYY',
    },
  },

  classes: {
    Admin: {
      title: 'Administrador',
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
        idSourcePk: 'ID',
        title: 'Título',
        link: 'Link',
        active: 'Ativo',
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
        idOaDatasetPk: 'ID',
        creationDate: 'Creation Date',
        active: 'Ativo',
        idOaVersionFk: 'ID Oa Version',
      },
    },
    TransformationType: {
      title: 'Transformation Type',
      columns: {
        idTransformationTypePk: 'ID',
        title: 'Título',
        combiner: 'Combiner',
        active: 'Ativo',
      },
    },
    OaPeriodicity: {
      title: 'Oa Periodicity',
      columns: {
        idOaPeriodicityPk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    OaVersion: {
      title: 'Oa Version',
      columns: {
        oaVersionStatus: 'Oa Version Status',
        objectOfAnalysis: 'Object Of Analysis',
        idOaVersionPk: 'ID',
        title: 'Título',
        active: 'Ativo',
        idOaVersionStatusFk: 'ID Oa Version Status',
        idObjectOfAnalysisFk: 'ID Object Of Analysis',
      },
    },
    OaVersionStatus: {
      title: 'Oa Version Status',
      columns: {
        idOaVersionStatusPk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    OaGroup: {
      title: 'Oa Group',
      columns: {
        parentGroup: 'Parent Group',
        objectOfAnalysisOaGroup: 'Object Of Analysis Oa Group',
        idOaGroupPk: 'ID',
        title: 'Título',
        active: 'Ativo',
        idParentGroupFk: 'ID Parent Group',
      },
    },
    ChartType: {
      title: 'Chart Type',
      columns: {
        oaChartTypeAvailability: 'Oa Chart Type Availability',
        idChartTypePk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    UserSavedChart: {
      title: 'User Saved Chart',
      columns: {
        collection: 'Collection',
        downloadType: 'Download Type',
        user: 'User',
        idUserChartPk: 'ID',
        json: 'Json',
        creationDate: 'Creation Date',
        active: 'Ativo',
        idUserFk: 'ID User',
        idCollectionFk: 'ID Collection',
        idDownloadTypeFk: 'ID Download Type',
      },
    },
    UserUsedOa: {
      title: 'User Used Oa',
      columns: {
        objectOfAnalysis: 'Object Of Analysis',
        user: 'User',
        usedDate: 'Used Date',
        idUserFk: 'ID User',
        idObjectOfAnalysisFk: 'ID Object Of Analysis',
      },
    },
    Collection: {
      title: 'Collection',
      columns: {
        user: 'User',
        idCollectionPk: 'ID',
        title: 'Título',
        creationDate: 'Creation Date',
        active: 'Ativo',
        idUserFk: 'ID User',
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
    OaUnity: {
      title: 'Oa Unity',
      columns: {
        idOaUnityPk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    News: {
      title: 'News',
      columns: {
        oaCategory: 'Oa Category',
        idNewsPk: 'ID',
        title: 'Título',
        link: 'Link',
        dataCreation: 'Data Creation',
        active: 'Ativo',
        idOaCategoryFk: 'ID Oa Category',
      },
    },
    DownloadType: {
      title: 'Download Type',
      columns: {
        idDownloadTypePk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    OaCategory: {
      title: 'Oa Category',
      columns: {
        idOaCategoryPk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    Plan: {
      title: 'Plan',
      columns: {
        idPlanPk: 'ID',
        title: 'Título',
        gatewayId: 'Pagarme ID',
        active: 'Ativo',
      },
    },
    PagarmeAddress: {
      title: 'Pagarme Address',
      columns: {
        street: 'Logradouro',
        street_number: 'Número',
        complementary: 'Complemento',
        neighborhood: 'Bairro',
        zipcode: 'Cep',
        city: 'Cidade',
        state: 'Estado',
        country: 'País',
      },
    },
    PagarmeCard: {
      title: 'Pagarme Card',
      columns: {
        id: 'ID',
        customer: 'Cliente',
        first_digits: 'Primeiros dígitos',
        last_digits: 'Últimos dígitos',
        holder_name: 'Nome impresso no cartão',
        card_number: 'Número do cartão',
        cvv: 'CVV',
        card_expiration_date: 'Data de validade',
        date_updated: 'Última atualização',
        brand: 'Bandeira',
        country: 'País',
        fingerprint: 'Impressão digital',
        valid: 'Valido',
      },
    },
    PagarmeCustomer: {
      title: 'Pagarme Customer',
      columns: {
        id: 'ID',
        type: 'Tipo de cliente',
        name: 'Nome',
        email: 'E-Mail',
        document_number: 'CPF ou CNPJ',
        document_type: 'Tipo de documento',
        sex: 'Gênero',
        born_at_format: 'Nascido em',
        external_id: 'ID externo',
        country: 'País',
        phone: 'Telefone',
        address: 'Endereço',
      },
    },
    PagarmePhone: {
      title: 'Pagarme Phone',
      columns: {
        ddi: 'DDI',
        ddd: 'DDD',
        number: 'Telefone',
      },
    },
    PagarmePlan: {
      title: 'Pagarme Phone',
      columns: {
        id: 'ID',
        name: 'Nome',
        amount: 'Valor',
        days: 'Dias',
        trialDays: 'Dias de teste',
        paymentMethods: 'Método de pagamento',
        color: 'Cor',
        charges: 'Cobranças',
        installments: 'Parcelas',
        invoiceReminder: 'Lembrança de recibo',
        paymentDeadlineChargesInterval: 'Prazo de intervalo de cobrança de pagamento',
      },
    },
    PagarmeSubscription: {
      title: 'Pagarme Subscription',
      columns: {
        id: 'ID',
        status: 'Status',
        charges: 'Cobranças',
        currentPeriodStart: 'Última renovação',
        currentPeriodEnd: 'Próxima renovação',
        paymentMethod: 'Método de pagamento',
        plan: 'Plan',
        customer: 'Cliente',
      },
    },
    PeriodicityTransformationType: {
      title: 'Periodicity Transformation Type',
      columns: {
        idPeriodicityTransformationTypePk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    LoginSerialized: {
      title: 'Login Serialized',
      columns: {
        email: 'E-Mail',
        password: 'Password',
        hash: 'Hash',
      },
    },
    Model: {
      title: 'Model',
      columns: {
        oaMatchModel: 'Oa Match Model',
        idModelPk: 'ID',
        title: 'Título',
        active: 'Ativo',
      },
    },
    OaData: {
      title: 'Oa Data',
      columns: {
        oaDataset: 'Oa Dataset',
        idOaDataPk: 'ID',
        value: 'Value',
        dt: 'Dt',
        active: 'Ativo',
        idOaDatasetFk: 'ID Oa Dataset',
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
      start: 'Início',
      end: 'Fim',
      add: 'Adicionar',
      newCollection: 'Nova Coleção',
      download: 'Download',
      collectionName: 'Nome da coleção',
      save: 'Salvar',
      saveChartOnCollection: 'Salvar o gráfico em uma coleção',
      contentDownload: 'Download do conteúdo',
      xls: 'XLS',
      date: 'Data',
      chooseTheOaToCombineInTheTransformation: 'Escolha o indicador para combinar nessa transformação',
      search: 'Buscar',
    },
  },
}
