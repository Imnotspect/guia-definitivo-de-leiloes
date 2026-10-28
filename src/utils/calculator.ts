export interface AuctionCostInput {
  lance: number;
  fipeOrMarketValue: number;
  taxaPatio?: number;
  debitos?: number;
  transporteGuincho?: number;
  despachanteCustas?: number;
  outrosCustos?: number;
}

export interface AuctionCostResult {
  lance: number;
  comissaoLeiloeiro: number; // 5% do lance
  taxaPatio: number;
  debitos: number;
  transporteGuincho: number;
  despachanteCustas: number;
  outrosCustos: number;
  custoTotal: number;
  fipeOrMarketValue: number;
  percentualSobreFipe: number;
  dentroRegra65: boolean;
  economiaBruta: number;
  margemLucroPercentual: number;
  status: 'excelente' | 'atencao' | 'arriscado';
  mensagem: string;
}

/**
 * Calcula o Custo Real de arrematação em leilão
 * Fórmula: Custo Total = Lance + 5% (comissão) + Taxa do Pátio + Débitos + Transporte + Despachante + Outros
 */
export function calculateAuctionCosts(input: AuctionCostInput): AuctionCostResult {
  const lance = Math.max(0, input.lance || 0);
  const fipe = Math.max(0, input.fipeOrMarketValue || 0);
  const comissaoLeiloeiro = lance * 0.05;
  const taxaPatio = Math.max(0, input.taxaPatio || 0);
  const debitos = Math.max(0, input.debitos || 0);
  const transporteGuincho = Math.max(0, input.transporteGuincho || 0);
  const despachanteCustas = Math.max(0, input.despachanteCustas || 0);
  const outrosCustos = Math.max(0, input.outrosCustos || 0);

  const custoTotal =
    lance +
    comissaoLeiloeiro +
    taxaPatio +
    debitos +
    transporteGuincho +
    despachanteCustas +
    outrosCustos;

  const percentualRaw = fipe > 0 ? (custoTotal / fipe) * 100 : 0;
  const percentualSobreFipe = Math.round(percentualRaw * 100) / 100;
  const dentroRegra65 = percentualSobreFipe <= 65;
  const economiaBruta = fipe > 0 ? fipe - custoTotal : 0;
  const margemRaw = custoTotal > 0 && fipe > 0 ? ((fipe - custoTotal) / custoTotal) * 100 : 0;
  const margemLucroPercentual = Math.round(margemRaw * 100) / 100;

  let status: 'excelente' | 'atencao' | 'arriscado' = 'excelente';
  let mensagem = '';

  if (fipe === 0) {
    status = 'atencao';
    mensagem = 'Informe o valor FIPE ou de mercado para calcular o percentual e a margem real.';
  } else if (percentualSobreFipe <= 55) {
    status = 'excelente';
    mensagem = `Excelente oportunidade! O custo total representa apenas ${percentualSobreFipe.toFixed(1)}% do valor de mercado (muito abaixo do teto de 65%). Margem de segurança formidável.`;
  } else if (percentualSobreFipe <= 65) {
    status = 'excelente';
    mensagem = `Aprovado na Regra dos 65%! O custo total ficou em ${percentualSobreFipe.toFixed(1)}% da FIPE. Garante margem de lucro saudável ou economia substancial.`;
  } else if (percentualSobreFipe <= 75) {
    status = 'atencao';
    mensagem = `Atenção: O custo total atingiu ${percentualSobreFipe.toFixed(1)}% do valor de mercado. Ultrapassa a regra prudencial dos 65%. Qualquer imprevisto mecânico ou documental pode corroer o lucro.`;
  } else {
    status = 'arriscado';
    mensagem = `Alto risco financeiro! O custo total está em ${percentualSobreFipe.toFixed(1)}% da FIPE. Não vale a pena arrematar com essa margem mínima, pois o risco supera o desconto.`;
  }

  return {
    lance,
    comissaoLeiloeiro,
    taxaPatio,
    debitos,
    transporteGuincho,
    despachanteCustas,
    outrosCustos,
    custoTotal,
    fipeOrMarketValue: fipe,
    percentualSobreFipe,
    dentroRegra65,
    economiaBruta,
    margemLucroPercentual,
    status,
    mensagem,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(value);
}
