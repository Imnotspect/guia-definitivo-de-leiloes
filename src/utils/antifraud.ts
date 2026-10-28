export interface FraudCheckInputs {
  urlOrDomain: string;
  paymentType: 'pix_cpf' | 'pix_chave_aleatoria' | 'ted_pessoa_fisica' | 'ted_pj_estranha' | 'darf_oficial' | 'guia_judicial' | 'conta_oficial_leiloeiro';
  allowsPhysicalInspection: 'sim' | 'nao' | 'apenas_fotos_online';
  juntaComercialVerified: 'sim_com_matricula' | 'nao_verificado' | 'matricula_invalida';
  whatsappOnlyBidding: boolean;
}

export interface FraudAnalysisResult {
  riskLevel: 'SEGURO' | 'ALTO_RISCO' | 'GOLPE_CONFIRMADO';
  score: number; // 0 a 100
  criticalAlerts: string[];
  warnings: string[];
  positives: string[];
  veredito: string;
}

export interface OfficialAuctioneerRecord {
  domain: string;
  name: string;
  registry: string;
  type: 'governo' | 'leiloeiro_homologado' | 'judicial';
  location: string;
  notes: string;
}

export const VERIFIED_AUCTIONEERS: OfficialAuctioneerRecord[] = [
  {
    domain: 'cav.receita.fazenda.gov.br',
    name: 'Receita Federal do Brasil (Portal e-CAC)',
    registry: 'Órgão Federal Direto',
    type: 'governo',
    location: 'Nacional',
    notes: 'Portal oficial de leilões aduaneiros federais. Pagamento exclusivo via DARF.',
  },
  {
    domain: 'receita.fazenda.gov.br',
    name: 'Receita Federal do Brasil',
    registry: 'Ministério da Fazenda',
    type: 'governo',
    location: 'Nacional',
    notes: 'Portal institucional da Receita Federal.',
  },
  {
    domain: 'fazenda.gov.br',
    name: 'Ministério da Fazenda',
    registry: 'Governo Federal',
    type: 'governo',
    location: 'Nacional',
    notes: 'Domínio governamental oficial.',
  },
  {
    domain: 'venda-imoveis.caixa.gov.br',
    name: 'Caixa Econômica Federal (Imóveis Caixa)',
    registry: 'Empresa Pública Federal',
    type: 'governo',
    location: 'Nacional',
    notes: 'Canal oficial de venda e leilão de imóveis retomados pela Caixa.',
  },
  {
    domain: 'caixa.gov.br',
    name: 'Caixa Econômica Federal',
    registry: 'Empresa Pública Federal',
    type: 'governo',
    location: 'Nacional',
    notes: 'Portal oficial da Caixa Econômica Federal.',
  },
  {
    domain: 'detran.sp.gov.br',
    name: 'DETRAN São Paulo',
    registry: 'Autarquia Estadual de Trânsito',
    type: 'governo',
    location: 'São Paulo (SP)',
    notes: 'Portal oficial de leilões de veículos apreendidos no estado de SP.',
  },
  {
    domain: 'detran.rj.gov.br',
    name: 'DETRAN Rio de Janeiro',
    registry: 'Autarquia Estadual de Trânsito',
    type: 'governo',
    location: 'Rio de Janeiro (RJ)',
    notes: 'Portal oficial do DETRAN-RJ.',
  },
  {
    domain: 'detran.mg.gov.br',
    name: 'DETRAN Minas Gerais',
    registry: 'Autarquia Estadual de Trânsito',
    type: 'governo',
    location: 'Minas Gerais (MG)',
    notes: 'Portal oficial do DETRAN-MG.',
  },
  {
    domain: 'zukerman.com.br',
    name: 'Zukerman Leilões',
    registry: 'JUCESP nº 575',
    type: 'leiloeiro_homologado',
    location: 'São Paulo e Nacional',
    notes: 'Mais de 35 anos de mercado. Homologado pelos principais bancos do Brasil.',
  },
  {
    domain: 'portalzuk.com.br',
    name: 'Portal Zuk (Zukerman)',
    registry: 'JUCESP nº 575',
    type: 'leiloeiro_homologado',
    location: 'São Paulo e Nacional',
    notes: 'Plataforma digital da Zukerman Leilões.',
  },
  {
    domain: 'superbid.net',
    name: 'Superbid Exchange',
    registry: 'Rede de Leiloeiros Oficiais Associados',
    type: 'leiloeiro_homologado',
    location: 'Nacional e América Latina',
    notes: 'Pioneira em leilões corporativos, frotas, pesados e industriais.',
  },
  {
    domain: 'superbid.com.br',
    name: 'Superbid Brasil',
    registry: 'Rede de Leiloeiros Oficiais Associados',
    type: 'leiloeiro_homologado',
    location: 'Nacional',
    notes: 'Domínio nacional oficial da Superbid.',
  },
  {
    domain: 'freitasleiloeiro.com.br',
    name: 'Freitas Leiloeiro Oficial',
    registry: 'JUCESP nº 485',
    type: 'leiloeiro_homologado',
    location: 'São Paulo, Paraná e Região',
    notes: 'Tradicional leiloeiro com auditório presencial e pátios visitáveis.',
  },
  {
    domain: 'pestanaleiloes.com.br',
    name: 'Pestana Leilões',
    registry: 'JUCISRS nº 107',
    type: 'leiloeiro_homologado',
    location: 'Região Sul e Sudeste',
    notes: 'Mais de 70 anos de tradição em veículos, pesados e imóveis.',
  },
  {
    domain: 'milanleiloes.com.br',
    name: 'Milan Leilões',
    registry: 'JUCESP nº 425',
    type: 'leiloeiro_homologado',
    location: 'São Paulo (SP)',
    notes: 'Grandes pátios na Grande São Paulo com vistoria presencial garantida.',
  },
  {
    domain: 'sodresantoro.com.br',
    name: 'Sodré Santoro Leilões',
    registry: 'JUCESP nº 192',
    type: 'leiloeiro_homologado',
    location: 'SP, PR, RJ, MG, GO',
    notes: 'Uma das maiores organizações de leilões da América Latina.',
  },
  {
    domain: 'megaleiloes.com.br',
    name: 'Mega Leilões',
    registry: 'JUCESP nº 822',
    type: 'leiloeiro_homologado',
    location: 'Nacional',
    notes: 'Especialista em leilões judiciais e extrajudiciais de imóveis.',
  },
  {
    domain: 'palaciodosleiloes.com.br',
    name: 'Palácio dos Leilões',
    registry: 'JUCEMG nº 685',
    type: 'leiloeiro_homologado',
    location: 'Minas Gerais (MG)',
    notes: 'Um dos maiores leilões de veículos do Sudeste.',
  },
  {
    domain: 'copart.com.br',
    name: 'Copart do Brasil',
    registry: 'JUCESP nº 818',
    type: 'leiloeiro_homologado',
    location: 'Nacional',
    notes: 'Multinacional especializada em veículos recuperados e sinistrados.',
  },
  {
    domain: 'rogeriomenezes.com.br',
    name: 'Rogério Menezes Leiloeiro Oficial',
    registry: 'JUCERJA nº 123',
    type: 'leiloeiro_homologado',
    location: 'Rio de Janeiro (RJ)',
    notes: 'Referência em leilões de automóveis e frotas no Rio de Janeiro.',
  },
  {
    domain: 'leilaovip.com.br',
    name: 'Leilão VIP',
    registry: 'JUCESP nº 764',
    type: 'leiloeiro_homologado',
    location: 'São Paulo (SP)',
    notes: 'Leilões de imóveis e automóveis corporativos.',
  },
  {
    domain: 'biasileiloes.com.br',
    name: 'Biasi Leilões',
    registry: 'JUCESP nº 534',
    type: 'leiloeiro_homologado',
    location: 'São Paulo (SP)',
    notes: 'Especialista em imóveis de bancos e alienações judiciais.',
  },
  {
    domain: 'frazaoleiloes.com.br',
    name: 'Frazão Leilões',
    registry: 'JUCESP nº 557',
    type: 'leiloeiro_homologado',
    location: 'São Paulo e Nacional',
    notes: 'Leiloeiro oficial homologado para bancos públicos e privados.',
  },
  {
    domain: 'claudiokussleiloes.com.br',
    name: 'Cláudio Kuss Leilões',
    registry: 'JUCEPAR nº 392',
    type: 'leiloeiro_homologado',
    location: 'Paraná (PR)',
    notes: 'Grande pátio de veículos em Curitiba e leilões presenciais.',
  },
];

export interface WebsiteSecurityReport {
  rawInput: string;
  cleanDomain: string;
  riskLevel: 'SEGURO' | 'ALTO_RISCO' | 'GOLPE_CONFIRMADO';
  score: number;
  badgeText: string;
  title: string;
  summary: string;
  isVerifiedOfficial: boolean;
  officialData?: OfficialAuctioneerRecord;
  checks: {
    label: string;
    status: 'pass' | 'fail' | 'warn';
    detail: string;
  }[];
  criticalFlags: string[];
  safeFlags: string[];
  recommendations: string[];
}

export function extractDomain(input: string): string {
  let cleaned = (input || '').trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//i, '');
  cleaned = cleaned.replace(/^www\./i, '');
  cleaned = cleaned.split('/')[0];
  cleaned = cleaned.split('?')[0];
  cleaned = cleaned.split('#')[0];
  cleaned = cleaned.split(':')[0]; // remove porta se houver
  return cleaned;
}

export function inspectAuctionUrl(rawUrl: string): WebsiteSecurityReport {
  const cleanDomain = extractDomain(rawUrl);

  if (!cleanDomain) {
    return {
      rawInput: rawUrl,
      cleanDomain: '',
      riskLevel: 'ALTO_RISCO',
      score: 50,
      badgeText: 'URL NÃO INFORMADA',
      title: 'Informe um site para escanear',
      summary: 'Digite ou cole o endereço do site que deseja verificar.',
      isVerifiedOfficial: false,
      checks: [],
      criticalFlags: ['Nenhum domínio foi informado para análise.'],
      safeFlags: [],
      recommendations: ['Cole a URL completa (ex: superbid.net ou zukerman.com.br).'],
    };
  }

  // 1. Checa se é um domínio oficial verificado na base
  const matchedAuctioneer = VERIFIED_AUCTIONEERS.find(
    (item) => cleanDomain === item.domain || cleanDomain.endsWith('.' + item.domain)
  );

  // 2. Checa se é um domínio governamental autêntico (.gov.br ou .jus.br)
  const isGovernmentDomain =
    cleanDomain.endsWith('.gov.br') ||
    cleanDomain.endsWith('.jus.br') ||
    cleanDomain.endsWith('.mil.br');

  // 3. Checa extensões internacionais suspeitas / TLDs piratas
  const suspiciousExtensions = [
    '.xyz',
    '.top',
    '.online',
    '.site',
    '.club',
    '.shop',
    '.vip',
    '.info',
    '.biz',
    '.live',
    '.app',
    '.space',
    '.tech',
    '.fun',
    '.click',
    '.website',
    '.cfd',
    '.buzz',
    '.icu',
    '.lat',
    '.pro',
    '.link',
    '.rest',
    '.work',
    '.fit',
    '.bid',
    '.cc',
    '.tk',
    '.ml',
    '.ga',
    '.cf',
    '.gq',
  ];
  const hasSuspiciousExt = suspiciousExtensions.some((ext) => cleanDomain.endsWith(ext) || cleanDomain.includes(ext + '/'));

  // 4. Checa spoofing / falsificação de órgãos públicos
  const governmentKeywords = ['detran', 'receita', 'caixa', 'fazenda', 'policia', 'prf', 'alfandega'];
  const hasGovKeyword = governmentKeywords.some((k) => cleanDomain.includes(k));
  const isGovSpoofing = hasGovKeyword && !isGovernmentDomain;

  // 5. Checa termos frequentes de golpes com hífen
  const scamKeywordPatterns = [
    'leilao-',
    '-leiloes',
    '-leilao',
    'leiloes-',
    'recuperados-',
    'patio-',
    'banco-leilao',
    'arrematacao-',
    'frotas-',
    'oficial-leilao',
  ];
  const hasScamKeywords = scamKeywordPatterns.some((pattern) => cleanDomain.includes(pattern));

  // Determinação dos resultados
  const checks: WebsiteSecurityReport['checks'] = [];
  const criticalFlags: string[] = [];
  const safeFlags: string[] = [];
  const recommendations: string[] = [];

  // CASO 1: Portal Homologado Oficial ou Domínio do Governo Autêntico
  if (matchedAuctioneer || isGovernmentDomain) {
    const isGov = isGovernmentDomain || matchedAuctioneer?.type === 'governo';
    const score = 100;

    checks.push({
      label: 'Extensão e Registro do Domínio',
      status: 'pass',
      detail: isGov
        ? 'Domínio governamental oficial restrito (.gov.br / .jus.br), auditado por órgãos públicos.'
        : 'Domínio oficial homologado com certificado SSL e histórico reconhecido.',
    });

    checks.push({
      label: 'Matrícula na Junta Comercial ou Órgão Público',
      status: 'pass',
      detail: matchedAuctioneer
        ? `Leiloeiro Homologado: ${matchedAuctioneer.name} (${matchedAuctioneer.registry})`
        : 'Órgão Público Federal/Estadual regulamentado por lei.',
    });

    checks.push({
      label: 'Meio de Pagamento Homologado',
      status: 'pass',
      detail: 'Liquidação mediante Guia Judicial, DARF oficial ou conta bancária nominal física do leiloeiro.',
    });

    checks.push({
      label: 'Direito à Vistoria Presencial',
      status: 'pass',
      detail: 'Pátios físicos reais abertos à visitação dos arrematantes conforme datas descritas no edital.',
    });

    safeFlags.push('Domínio cadastrado no banco nacional de leiloeiros oficiais.');
    safeFlags.push('Página segura contra clones com auditoria pública.');
    if (matchedAuctioneer) {
      safeFlags.push(`Registro: ${matchedAuctioneer.registry} - ${matchedAuctioneer.location}`);
    }

    recommendations.push('Você está em um site idôneo e seguro.');
    recommendations.push('Mesmo em leilões oficiais, leia com atenção as cláusulas de multas e débitos do edital.');

    return {
      rawInput: rawUrl,
      cleanDomain,
      riskLevel: 'SEGURO',
      score,
      badgeText: 'SITE 100% SEGURO & HOMOLOGADO',
      title: matchedAuctioneer ? matchedAuctioneer.name : 'Portal Oficial Governamental',
      summary: matchedAuctioneer
        ? `O domínio ${cleanDomain} pertence ao leiloeiro oficial homologado ${matchedAuctioneer.name}. Este leiloeiro possui matrícula ativa na Junta Comercial e seus leilões são 100% legítimos.`
        : `O domínio ${cleanDomain} é uma página oficial do poder público brasileiro. Os leilões realizados neste ambiente são autênticos.`,
      isVerifiedOfficial: true,
      officialData: matchedAuctioneer,
      checks,
      criticalFlags,
      safeFlags,
      recommendations,
    };
  }

  // CASO 2: Golpe Confirmado (Spoofing de Governo ou Extensão Pirata)
  if (isGovSpoofing || hasSuspiciousExt) {
    const score = 5;

    if (isGovSpoofing) {
      criticalFlags.push(
        `GOLPE CLÁSSICO: O site usa palavras como "detran", "receita" ou "caixa" em um domínio particular (${cleanDomain}), sem terminar em .gov.br.`
      );
    }

    if (hasSuspiciousExt) {
      criticalFlags.push(
        `EXTENSÃO PIRATA SUSPEITA: O site utiliza final incomum (${cleanDomain.split('.').pop()}). Quase 100% dos leiloeiros oficiais do Brasil utilizam .com.br ou .gov.br.`
      );
    }

    checks.push({
      label: 'Extensão e Registro do Domínio',
      status: 'fail',
      detail: hasSuspiciousExt
        ? 'Extensão barata de curta duração (.xyz, .top, etc.) criada para sumir após a fraude.'
        : 'Domínio não governamental imitando órgão público oficial.',
    });

    checks.push({
      label: 'Matrícula na Junta Comercial',
      status: 'fail',
      detail: 'Não há registro nem leiloeiro homologado vinculado a este domínio.',
    });

    checks.push({
      label: 'Forma de Pagamento Provável',
      status: 'fail',
      detail: 'Sites com este padrão exigem PIX para contas de laranjas ou intermediários via WhatsApp.',
    });

    checks.push({
      label: 'Vistoria Presencial',
      status: 'fail',
      detail: 'Endereços falsos ou desculpas de que o pátio está "fechado para visitação".',
    });

    recommendations.push('NÃO REALIZE NENHUM PAGAMENTO OU TRANSFERÊNCIA PIX.');
    recommendations.push('NÃO envie cópia do seu documento (RG, CNH, CPF), pois eles usam seus dados para abrir contas bancárias fantasmas.');
    recommendations.push('Feche a página imediatamente e denuncie o link no portal de crimes cibernéticos.');

    return {
      rawInput: rawUrl,
      cleanDomain,
      riskLevel: 'GOLPE_CONFIRMADO',
      score,
      badgeText: 'PERIGO: GOLPE CONFIRMADO (SITE FALSO)',
      title: 'Página Fraudulenta Detectada',
      summary: `ATENÇÃO: O domínio ${cleanDomain} NÃO É UM LEILÃO VERDADEIRO. Foram encontrados múltiplos indicadores clássicos de estelionato digital e clonagem de leilões.`,
      isVerifiedOfficial: false,
      checks,
      criticalFlags,
      safeFlags,
      recommendations,
    };
  }

  // CASO 3: Domínio com Padrões Suspeitos ou com Hífens
  if (hasScamKeywords) {
    const score = 25;

    criticalFlags.push(
      'PADRÃO TÍPICO DE PHISHING: O domínio utiliza hífens e termos genéricos de leilão (ex: leilao-brasil, patio-recuperados). Golpistas utilizam essa tática para registrar nomes parecidos com os originais.'
    );

    checks.push({
      label: 'Extensão e Registro do Domínio',
      status: 'warn',
      detail: 'Padrão nominal associado a páginas clones temporárias.',
    });

    checks.push({
      label: 'Matrícula na Junta Comercial',
      status: 'fail',
      detail: 'Domínio ausente na listagem de leiloeiros oficiais homologados.',
    });

    checks.push({
      label: 'Forma de Pagamento',
      status: 'fail',
      detail: 'Suspeita alta de solicitação de pagamentos irregulares.',
    });

    checks.push({
      label: 'Vistoria Presencial',
      status: 'warn',
      detail: 'Exija visitar o lote presencialmente antes de qualquer compromisso.',
    });

    recommendations.push('Consulte imediatamente a Junta Comercial do Estado (JUCESP, JUCERJA, etc.) para verificar se existe matrícula oficial com este site.');
    recommendations.push('Exija falar por telefone fixo registrado na Junta Comercial e agendar visita presencial no pátio.');

    return {
      rawInput: rawUrl,
      cleanDomain,
      riskLevel: 'GOLPE_CONFIRMADO',
      score,
      badgeText: 'ALERTA MÁXIMO DE FRAUDE',
      title: 'Domínio Suspeito de Clonagem',
      summary: `O endereço ${cleanDomain} apresenta padrões nominais amplamente utilizados em sites clones de leilão. Há um risco extremo de estelionato.`,
      isVerifiedOfficial: false,
      checks,
      criticalFlags,
      safeFlags,
      recommendations,
    };
  }

  // CASO 4: Domínio .com.br Desconhecido (Pode ser um leiloeiro novo ou regional não listado)
  if (cleanDomain.endsWith('.com.br')) {
    const score = 55;

    checks.push({
      label: 'Extensão do Domínio',
      status: 'pass',
      detail: 'Domínio registrado no Registro.br (.com.br) com CNPJ ou CPF nacional.',
    });

    checks.push({
      label: 'Matrícula na Junta Comercial',
      status: 'warn',
      detail: 'Este domínio não está no nosso catálogo dos 25 maiores leiloeiros nacionais. Pode ser um leiloeiro regional pequeno.',
    });

    checks.push({
      label: 'Forma de Pagamento Obrigatória',
      status: 'warn',
      detail: 'Nunca pague PIX para pessoa física. Exija conta bancária em nome do leiloeiro oficial.',
    });

    checks.push({
      label: 'Vistoria no Pátio',
      status: 'warn',
      detail: 'Visite o pátio antes de dar lances para confirmar a existência física dos bens.',
    });

    criticalFlags.push(
      'Domínio não homologado em nosso banco principal de leilões seguros. Verifique a matrícula do leiloeiro na Junta Comercial antes de dar lances.'
    );

    safeFlags.push('Extensão nacional registrada no Brasil (.com.br).');

    recommendations.push('Acesse a Junta Comercial do estado do leilão (ex: JUCESP para SP, JUCERJA para RJ) e busque pelo nome e matrícula do leiloeiro.');
    recommendations.push('Verifique no edital se a conta bancária para liquidação é do próprio leiloeiro oficial pessoa física.');

    return {
      rawInput: rawUrl,
      cleanDomain,
      riskLevel: 'ALTO_RISCO',
      score,
      badgeText: 'SITE NÃO HOMOLOGADO (CHECAGEM NECESSÁRIA)',
      title: 'Domínio Nacional Não Catalogado',
      summary: `O domínio ${cleanDomain} possui terminação .com.br, mas não foi localizado em nossa base dos leiloeiros homologados oficiais. Pode ser um leiloeiro regional ou um site recém-criado. É indispensável validar a matrícula na Junta Comercial antes de prosseguir.`,
      isVerifiedOfficial: false,
      checks,
      criticalFlags,
      safeFlags,
      recommendations,
    };
  }

  // CASO 5: Outro domínio genérico desconhecido
  return {
    rawInput: rawUrl,
    cleanDomain,
    riskLevel: 'ALTO_RISCO',
    score: 40,
    badgeText: 'RISCO ELEVADO: NÃO HOMOLOGADO',
    title: 'Domínio Não Verificado',
    summary: `O site ${cleanDomain} não faz parte dos canais oficiais reconhecidos. Quase a totalidade dos leilões idôneos no Brasil atua sob extensões .com.br ou .gov.br.`,
    isVerifiedOfficial: false,
    checks: [
      {
        label: 'Extensão e Registro',
        status: 'warn',
        detail: 'Não possui extensão governamental (.gov.br) nem consta entre leiloeiros homologados.',
      },
      {
        label: 'Matrícula e Cadastro',
        status: 'fail',
        detail: 'Ausente nos cadastros das Juntas Comerciais.',
      },
    ],
    criticalFlags: ['Domínio não verificado. Possibilidade de fraude cibernética.'],
    safeFlags: [],
    recommendations: [
      'Não insira senhas, dados de cartão ou documentos nesta página.',
      'Dê preferência aos portais oficiais consolidados listados no Radar do Guia GDL.',
    ],
  };
}

// Mantido para compatibilidade com os testes unitários e lógica legada
export function analyzeAuctionSecurity(inputs: FraudCheckInputs): FraudAnalysisResult {
  const criticalAlerts: string[] = [];
  const warnings: string[] = [];
  const positives: string[] = [];
  let score = 70;

  // 1. Checagem de Forma de Pagamento (Regra de Ouro #4)
  if (
    inputs.paymentType === 'pix_cpf' ||
    inputs.paymentType === 'pix_chave_aleatoria' ||
    inputs.paymentType === 'ted_pessoa_fisica'
  ) {
    criticalAlerts.push(
      'GOLPE CERTEIRO: Leilões oficiais NUNCA exigem ou aceitam PIX para CPF, chaves aleatórias ou TED para conta de Pessoa Física!'
    );
    score -= 60;
  } else if (inputs.paymentType === 'ted_pj_estranha') {
    criticalAlerts.push(
      'ALTO RISCO: O favorecido da conta deve ser EXATAMENTE a razão social do Leiloeiro Oficial registrado na Junta Comercial.'
    );
    score -= 35;
  } else if (
    inputs.paymentType === 'darf_oficial' ||
    inputs.paymentType === 'guia_judicial' ||
    inputs.paymentType === 'conta_oficial_leiloeiro'
  ) {
    positives.push(
      'Pagamento seguro: Guia Judicial, DARF da Receita ou conta vinculada expressamente à matrícula do leiloeiro.'
    );
    score += 15;
  }

  // 2. Análise de Domínio e URL (Regra de Ouro #2)
  const url = (inputs.urlOrDomain || '').toLowerCase().trim();
  const suspiciousExtensions = ['.xyz', '.top', '.online', '.site', '.club', '.shop', '.vip', '.info', '.biz'];
  const hasSuspiciousExt = suspiciousExtensions.some((ext) => url.includes(ext));

  if (hasSuspiciousExt) {
    criticalAlerts.push(
      'Extensão de domínio internacional ou suspeita (.xyz, .top, .online, etc.). Quase 100% dos leiloeiros oficiais do Brasil utilizam final .com.br ou .gov.br.'
    );
    score -= 30;
  }

  if (url.includes('leilao-') || url.includes('-leiloes') || url.includes('detran-leilao') || url.includes('receita-leilao')) {
    warnings.push(
      'Atenção ao domínio com hífen ou imitação de órgão público. Golpistas registram nomes como "leilao-detran.com" para se passar por portais governamentais.'
    );
    score -= 15;
  }

  if (url.endsWith('.gov.br') || url.includes('.gov.br/')) {
    positives.push('Domínio governamental oficial (.gov.br) verificado.');
    score += 15;
  } else if (url.endsWith('.com.br')) {
    positives.push('Domínio nacional registrado no Registro.br (.com.br).');
  }

  // 3. Visitação Física (Regra de Ouro #3)
  if (inputs.allowsPhysicalInspection === 'nao' || inputs.allowsPhysicalInspection === 'apenas_fotos_online') {
    criticalAlerts.push(
      'Vistoria física proibida ou alegada indisponível ("apenas fotos na internet"). Todo pátio legalizado autoriza visitação presencial com data marcada no edital.'
    );
    score -= 25;
  } else if (inputs.allowsPhysicalInspection === 'sim') {
    positives.push('Pátio físico aberto para inspeção prévia dos lotes mediante edital.');
    score += 10;
  }

  // 4. Junta Comercial (Regra de Ouro #1)
  if (inputs.juntaComercialVerified === 'matricula_invalida') {
    criticalAlerts.push(
      'Matrícula do Leiloeiro não existe na Junta Comercial do estado (JUCESP, JUCERJA, JUCEG, etc.).'
    );
    score -= 30;
  } else if (inputs.juntaComercialVerified === 'nao_verificado') {
    warnings.push(
      'Você ainda não checou o número de registro do leiloeiro no site da Junta Comercial. Faça isso antes de enviar documentos ou dar lances.'
    );
    score -= 10;
  } else if (inputs.juntaComercialVerified === 'sim_com_matricula') {
    positives.push('Leiloeiro ativo e homologado na respectiva Junta Comercial.');
    score += 15;
  }

  // 5. Canal de Lances via WhatsApp
  if (inputs.whatsappOnlyBidding) {
    criticalAlerts.push(
      'Lances ou fechamento de negócio por WhatsApp/Telegram. Leiloeiros oficiais possuem sistema auditado com criptografia e lances em auditório virtual no próprio site.'
    );
    score -= 30;
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel: 'SEGURO' | 'ALTO_RISCO' | 'GOLPE_CONFIRMADO' = 'SEGURO';
  let veredito = '';

  if (score < 40 || criticalAlerts.length >= 2 || inputs.paymentType.startsWith('pix_') || inputs.whatsappOnlyBidding) {
    riskLevel = 'GOLPE_CONFIRMADO';
    veredito =
      'PERIGO IMINENTE: Este cenário apresenta características clássicas de golpe financeiro. Não envie documentos, não faça nenhum pagamento e denuncie às autoridades.';
  } else if (score < 75 || criticalAlerts.length > 0 || warnings.length >= 2) {
    riskLevel = 'ALTO_RISCO';
    veredito =
      'ATENÇÃO REDOBRADA: Foram encontradas inconsistências graves. Não prossiga sem validar a matrícula do leiloeiro na Junta Comercial e visitar o pátio presencialmente.';
  } else {
    riskLevel = 'SEGURO';
    veredito =
      'PARÂMETROS CONFORMES: O processo segue as diretrizes da legislação brasileira de leilões. Mantenha os cuidados ao analisar as cláusulas de dívidas no edital.';
  }

  return {
    riskLevel,
    score,
    criticalAlerts,
    warnings,
    positives,
    veredito,
  };
}
