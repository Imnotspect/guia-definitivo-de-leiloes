export interface Chapter {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  badge?: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'capa-intro', number: '00', title: 'Capa & Introdução: A Nova Realidade dos Leilões', shortTitle: 'Capa & Introdução' },
  { id: 'modulo-1', number: '01', title: 'Módulo 1: O Mapa dos Leilões no Brasil', shortTitle: 'Mapa dos Leilões' },
  { id: 'modulo-2', number: '02', title: 'Módulo 2: Cadastro, Habilitação & O Segredo do Edital', shortTitle: 'Cadastro & Edital' },
  { id: 'modulo-3', number: '03', title: 'Módulo 3: A Matemática do Lance & A Regra dos 65%', shortTitle: 'Matemática do Lance' },
  { id: 'modulo-4', number: '04', title: 'Módulo 4: O Manual Antigolpe (Blindagem Absoluta)', shortTitle: 'Manual Antigolpe' },
  { id: 'radar-sites', number: '05', title: 'Diretório Oficial: Onde Encontrar & Acompanhar Editais', shortTitle: 'Sites Oficiais' },
  { id: 'checklist', number: '06', title: 'Checklist Definitivo de Arrematação (8 Etapas)', shortTitle: 'Checklist 8 Etapas' },
];

export interface AuctioneerInfo {
  nome: string;
  siteOficial: string;
  url: string;
  especialidades: string[];
  estados: string;
  juntaComercial: string;
  status: 'Homologado' | 'Governo Oficial';
  destaque: string;
}

export const MAIORES_LEILOEIROS: AuctioneerInfo[] = [
  {
    nome: 'Receita Federal do Brasil (e-CAC)',
    siteOficial: 'cav.receita.fazenda.gov.br',
    url: 'https://cav.receita.fazenda.gov.br',
    especialidades: ['Eletrônicos (iPhones, MacBooks)', 'Veículos Apreendidos', 'Lotes Lacrados'],
    estados: 'Nacional (Alfândegas de todo o país)',
    juntaComercial: 'Órgão Federal Direto',
    status: 'Governo Oficial',
    destaque: 'Bens apreendidos em aeroportos e portos. Pagamento exclusivo via DARF.',
  },
  {
    nome: 'Caixa Econômica Federal (Imóveis Caixa)',
    siteOficial: 'venda-imoveis.caixa.gov.br',
    url: 'https://venda-imoveis.caixa.gov.br',
    especialidades: ['Casas', 'Apartamentos', 'Terrenos', 'Imóveis Comerciais'],
    estados: 'Todos os estados e municípios',
    juntaComercial: 'Empresa Pública Federal',
    status: 'Governo Oficial',
    destaque: 'Financiamentos não pagos. Descontos de até 70% com possibilidade de FGTS.',
  },
  {
    nome: 'Portal do DETRAN (Pátios Estaduais)',
    siteOficial: 'detran.[uf].gov.br (ex: detran.sp.gov.br)',
    url: 'https://www.detran.sp.gov.br',
    especialidades: ['Motos', 'Carros de Passeio', 'Caminhões de Blitz/Apreensão'],
    estados: 'Todos os estados da federação',
    juntaComercial: 'Autarquia Estadual de Trânsito',
    status: 'Governo Oficial',
    destaque: 'Veículos recolhidos há mais de 60 dias. Baixa de débitos anteriores pelo edital.',
  },
  {
    nome: 'Zukerman Leilões',
    siteOficial: 'zukerman.com.br',
    url: 'https://www.zukerman.com.br',
    especialidades: ['Imóveis Residenciais', 'Comerciais', 'Galpões', 'Bens Bancários'],
    estados: 'SP, RJ, MG, PR, SC, RS, DF e todo o Brasil',
    juntaComercial: 'JUCESP nº 575',
    status: 'Homologado',
    destaque: 'Líder nacional em leilões de imóveis para Santander, Bradesco, Itaú e Banco do Brasil.',
  },
  {
    nome: 'Superbid Exchange',
    siteOficial: 'superbid.net',
    url: 'https://www.superbid.net',
    especialidades: ['Frotas Corporativas', 'Veículos Leves', 'Máquinas Industriais', 'Eletrônicos'],
    estados: 'Nacional e América Latina',
    juntaComercial: 'Rede de Leiloeiros Associados',
    status: 'Homologado',
    destaque: 'Desmobilização de multinacionais (Vale, Petrobras, frotas corporativas de bancos).',
  },
  {
    nome: 'Freitas Leiloeiro',
    siteOficial: 'freitasleiloeiro.com.br',
    url: 'https://www.freitasleiloeiro.com.br',
    especialidades: ['Carros de Seguradora', 'Recuperados de Financiamento', 'Motos'],
    estados: 'SP, PR, RJ',
    juntaComercial: 'JUCESP nº 485',
    status: 'Homologado',
    destaque: 'Auditório tradicional com transmissões ao vivo semanais de centenas de automóveis.',
  },
  {
    nome: 'Pestana Leilões',
    siteOficial: 'pestanaleiloes.com.br',
    url: 'https://www.pestanaleiloes.com.br',
    especialidades: ['Automóveis', 'Pesados', 'Imóveis Rurais e Urbanos'],
    estados: 'RS, SC, PR, SP',
    juntaComercial: 'JUCISRS nº 107',
    status: 'Homologado',
    destaque: 'Mais de 70 anos de tradição, forte presença na Região Sul e Sudeste.',
  },
  {
    nome: 'Milan Leilões',
    siteOficial: 'milanleiloes.com.br',
    url: 'https://www.milanleiloes.com.br',
    especialidades: ['Veículos Premium', 'Caminhões', 'Equipamentos Pesados', 'Imóveis'],
    estados: 'SP e Nacional',
    juntaComercial: 'JUCESP nº 425',
    status: 'Homologado',
    destaque: 'Pátios gigantescos na Grande SP e estrutura completa de vistoria presencial.',
  },
  {
    nome: 'Sodré Santoro',
    siteOficial: 'sodresantoro.com.br',
    url: 'https://www.sodresantoro.com.br',
    especialidades: ['Veículos Leves e Pesados', 'Sucatas com motor', 'Sinistrados e Frotas'],
    estados: 'SP, PR, RJ, MG, GO',
    juntaComercial: 'JUCESP nº 192',
    status: 'Homologado',
    destaque: 'Uma das maiores organizações de leilões da América Latina, leilões quase diários.',
  },
  {
    nome: 'Mega Leilões',
    siteOficial: 'megaleiloes.com.br',
    url: 'https://www.megaleiloes.com.br',
    especialidades: ['Leilões Judiciais (Varas Cíveis, Família, Falências)', 'Imóveis'],
    estados: 'Nacional',
    juntaComercial: 'JUCESP nº 822',
    status: 'Homologado',
    destaque: 'Forte presença em processos da Justiça Estadual (TJSP) e Federal.',
  },
];

export interface UpcomingAuctionChannel {
  canal: string;
  comoAcessar: string;
  frequencia: string;
  dicaPratica: string;
}

export const CANAIS_ACOMPANHAMENTO: UpcomingAuctionChannel[] = [
  {
    canal: 'Sistema de Leilão Eletrônico (SLE) - Receita Federal',
    comoAcessar: 'Acesse cav.receita.fazenda.gov.br com conta Gov.br (Prata ou Ouro) > Serviços > Leilão Eletrônico.',
    frequencia: 'Editais publicados semanalmente por cada delegacia alfandegária.',
    dicaPratica: 'Filtre por tipo de lote: "Pessoa Física" para arrematar celulares, notebooks e carros unitários sem precisar de CNPJ.',
  },
  {
    canal: 'Portal Oficial de Imóveis da Caixa',
    comoAcessar: 'venda-imoveis.caixa.gov.br > Selecione o Estado e Cidade > Filtrar por "Venda Online" ou "1º/2º Leilão".',
    frequencia: 'Atualizações diárias com lotes em todo o Brasil.',
    dicaPratica: 'Procure pelos imóveis com tag "Venda Direta Online": se o 2º leilão não teve lances, a Caixa vende pelo valor mínimo para o primeiro comprador que der o lance.',
  },
  {
    canal: 'Diário Oficial da União (DOU) e Diários Oficiais dos Estados (DOE)',
    comoAcessar: 'in.gov.br (Federal) e imprensaoficial.com.br (Estadual) > Seção 3 (Contratos e Editais de Leilão).',
    frequencia: 'Publicação obrigatória com 15 a 30 dias de antecedência do leilão.',
    dicaPratica: 'Digite "Aviso de Leilão Público" ou "Edital de Leilão de Veículos" no campo de busca para descobrir oportunidades antes de irem para os holofotes.',
  },
  {
    canal: 'Painel de Leilões dos Tribunais de Justiça (TJSP, TJRJ, TJMG, TRT, TRF)',
    comoAcessar: 'Sites oficiais dos Tribunais > Menu "Cidadão" > "Leilões e Hastas Públicas".',
    frequencia: 'Varas de execução fiscal, cíveis e trabalhistas publicam lotes continuamente.',
    dicaPratica: 'Foque nas "Segundas Praças", onde o juiz autoriza a redução do lance inicial para 50% da avaliação pericial.',
  },
  {
    canal: 'Alertas por E-mail dos Leiloeiros Homologados (Cadastro de Interesse)',
    comoAcessar: 'Crie conta gratuita nos leiloeiros homologados (Zukerman, Superbid, Sodré Santoro) e ative a "Newsletter de Lotes".',
    frequencia: 'Disparos semanais com catálogos em PDF dias antes do pregão.',
    dicaPratica: 'Selecione apenas as categorias de seu interesse (ex: "Carros até 2022" ou "Apartamentos em SP") para receber avisos certeiros no WhatsApp ou e-mail.',
  },
];

export interface ChecklistStep {
  id: number;
  fase: string;
  titulo: string;
  descricao: string;
  documentoChave: string;
  cuidados: string;
}

export const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: 1,
    fase: 'Pré-Leilão',
    titulo: 'Leitura Integral do Edital e Matrícula/Laudo Pericial',
    descricao: 'Não leia apenas as fotos do anúncio. Vá direto ao arquivo PDF do Edital. Verifique quem arca com o IPVA vencido, multas, condomínio acumulado e IPTU.',
    documentoChave: 'Edital do Pregão + Matrícula Atualizada (Imóveis) ou Laudo do DETRAN (Veículos)',
    cuidados: 'Se o edital declarar "débitos por conta do arrematante", você terá que somar cada centavo ao seu custo total.',
  },
  {
    id: 2,
    fase: 'Auditoria de Segurança',
    titulo: 'Validação Antifraude do Leiloeiro na Junta Comercial',
    descricao: 'Acesse o site da Junta Comercial do estado do leilão (ex: JUCESP para SP, JUCERJA para RJ) e busque pelo nome e matrícula do leiloeiro oficial.',
    documentoChave: 'Comprovante de Regularidade na Junta Comercial',
    cuidados: 'Verifique se a URL acessada é exatamente o domínio registrado na Junta. Golpistas criam variações com traços ou domínios .top/.xyz.',
  },
  {
    id: 3,
    fase: 'Vistoria Presencial',
    titulo: 'Inspeção Física no Pátio (ou Laudo Cautelar)',
    descricao: 'Agende visita presencial ao pátio antes de dar qualquer lance. Leve um mecânico de confiança ou lanterneiro com medidor de espessura de tinta.',
    documentoChave: 'Comprovante de Agendamento no Pátio / Laudo Mecânico',
    cuidados: 'Verifique se o motor gira, se o bloco possui numeração raspada, se há infiltrações graves ou soldas na estrutura monobloco.',
  },
  {
    id: 4,
    fase: 'Engenharia Financeira',
    titulo: 'Cálculo de Teto Máximo com a "Regra dos 65%"',
    descricao: 'Lance + 5% leiloeiro + taxa de pátio + débitos + guincho + despachante. A soma JAMAIS pode ultrapassar 65% do valor real de mercado ou Tabela FIPE.',
    documentoChave: 'Planilha de Custo Real / Calculadora Oficial',
    cuidados: 'Defina seu teto financeiro antes de abrir o pregão. Se outro licitante cobrir seu lance máximo, abandone o lote sem emoção.',
  },
  {
    id: 5,
    fase: 'Habilitação e Lances',
    titulo: 'Cadastro Prévio e Habilitação Homologada (Gov.br ou Leiloeiro)',
    descricao: 'Envie seus documentos (CNH/RG, CPF, Comprovante de Residência) com no mínimo 48 horas de antecedência ao início do pregão.',
    documentoChave: 'Termo de Habilitação Deferido no Sistema do Leilão',
    cuidados: 'Não deixe para se cadastrar na última hora. Os leiloeiros sérios auditam os dados e bloqueiam compradores sem verificação prévia.',
  },
  {
    id: 6,
    fase: 'Pagamento Oficial',
    titulo: 'Liquidação da Arrematação por Guia Judicial, DARF ou Conta Nominal',
    descricao: 'O pagamento é exigido em até 24 ou 48 horas após a batida do martelo. Utilize exclusivamente DARF (Receita Federal), Guia de Depósito Judicial (Judicial) ou conta vinculada do leiloeiro.',
    documentoChave: 'Comprovante de Liquidação Bancária Oficial',
    cuidados: 'NUNCA pague via PIX para CPF de terceiros, gerentes ou chaves aleatórias enviadas por WhatsApp. Isso é fraude inquestionável.',
  },
  {
    id: 7,
    fase: 'Documentação Legal',
    titulo: 'Emissão da Nota de Venda em Leilão ou Auto/Carta de Arrematação',
    descricao: 'Após a compensação do pagamento, o leiloeiro emite a Nota de Venda em Leilão (veículos) ou o Juiz assina a Carta de Arrematação com Mandado de Imissão na Posse (imóveis).',
    documentoChave: 'Nota de Venda Oficial do Leiloeiro / Carta de Arrematação expedida pelo Cartório',
    cuidados: 'Confira se todos os dados do chassi, renavam, endereço e valor arrematado estão perfeitamente digitados sem erros de grafia.',
  },
  {
    id: 8,
    fase: 'Retirada e Regularização',
    titulo: 'Agendamento de Guincho/Retirada e Transferência no DETRAN/Cartório',
    descricao: 'Contrate guincho credenciado para retirada no pátio dentro do prazo do edital (para evitar diárias extras) e dê entrada no processo de transferência.',
    documentoChave: 'Protocolo de Liberação de Pátio + CRV Digital (ATPV-e) ou Escritura/Registro de Imóveis',
    cuidados: 'Respeite a janela de retirada indicada no edital (geralmente de 5 a 15 dias). Passado o prazo, os pátios cobram diárias pesadas de estadia.',
  },
];
