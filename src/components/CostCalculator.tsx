import React, { useState } from 'react';
import {
  calculateAuctionCosts,
  formatBRL,
  AuctionCostInput,
} from '../utils/calculator';
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  DollarSign,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface Preset {
  nome: string;
  descricao: string;
  data: AuctionCostInput;
}

const PRESETS: Preset[] = [
  {
    nome: 'Exemplo do Livro: Carro FIPE R$ 50k',
    descricao: 'Simulação oficial do Módulo 3 com lucro real estimado em R$ 15.000',
    data: {
      lance: 28000,
      fipeOrMarketValue: 50000,
      taxaPatio: 800,
      debitos: 1200,
      transporteGuincho: 500,
      despachanteCustas: 900,
      outrosCustos: 0,
    },
  },
  {
    nome: 'Apartamento Retomado Caixa (50% OFF)',
    descricao: 'Imóvel desocupado avaliado em R$ 260.000 arrematado em 2º leilão',
    data: {
      lance: 130000,
      fipeOrMarketValue: 260000,
      taxaPatio: 0,
      debitos: 4500, // IPTU / Condomínio pendente
      transporteGuincho: 0,
      despachanteCustas: 7500, // ITBI e Registro Imobiliário
      outrosCustos: 5000, // Pequenas reformas
    },
  },
  {
    nome: 'Lote Eletrônicos Receita Federal (MacBooks & iPhones)',
    descricao: 'Lote lacrado avaliado em R$ 24.000 no varejo nacional',
    data: {
      lance: 9000,
      fipeOrMarketValue: 24000,
      taxaPatio: 200,
      debitos: 0, // Receita Federal entrega limpo de tributos aduaneiros
      transporteGuincho: 350, // Frete/Sedex com seguro
      despachanteCustas: 0,
      outrosCustos: 0,
    },
  },
  {
    nome: 'Moto de Pátio DETRAN (FIPE R$ 16k)',
    descricao: 'Recuperada de blitz com lance inicial reduzido',
    data: {
      lance: 6200,
      fipeOrMarketValue: 16000,
      taxaPatio: 450,
      debitos: 0, // DETRAN desvincula multas antigas
      transporteGuincho: 250,
      despachanteCustas: 650, // Nova vistoria e placa Mercosul
      outrosCustos: 600, // Bateria nova e revisão
    },
  },
];

import { VipLockOverlay } from './VipLockOverlay';

interface CostCalculatorProps {
  isVip?: boolean;
  onOpenCheckout?: () => void;
  onOpenLogin?: () => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  isVip = false,
  onOpenCheckout = () => {},
  onOpenLogin = () => {},
}) => {
  const [inputs, setInputs] = useState<AuctionCostInput>(PRESETS[0].data);

  const result = calculateAuctionCosts(inputs);

  const handleInputChange = (field: keyof AuctionCostInput, value: string) => {
    const num = parseFloat(value.replace(/\D/g, '')) / 100 || 0;
    setInputs((prev) => ({
      ...prev,
      [field]: num,
    }));
  };

  const handleRawNumberChange = (field: keyof AuctionCostInput, val: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: Math.max(0, val),
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
              <Calculator className="w-3.5 h-3.5" />
              GDL Inteligência: Módulo 3
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Calculadora de Custo Real &amp; A Regra dos 65%
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Descubra por que o "preço de tela" engana amadores. Calcule todas as despesas obrigatórias
              (comissão de 5%, pátio, débitos e transferência) antes de dar o lance.
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center min-w-[200px]">
            <span className="text-xs uppercase text-slate-400 tracking-wider font-semibold block">
              Teto Máximo Recomendado
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 block mt-1">
              65% DA FIPE
            </span>
            <span className="text-[11px] text-slate-400">Garante margem de segurança</span>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Carregar Cenários de Estudo Prático:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInputs(p.data)}
                className="text-left p-3 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700/70 text-xs transition group"
              >
                <div className="font-semibold text-white group-hover:text-amber-400 flex items-center justify-between">
                  <span>{p.nome}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.descricao}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column (Left) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Parâmetros de Entrada</span>
              <button
                onClick={() => setInputs(PRESETS[0].data)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar Exemplo
              </button>
            </h3>

            <div className="space-y-4">
              {/* Valor FIPE / Mercado */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Valor de Mercado / Tabela FIPE (100%)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm font-semibold text-slate-400">R$</span>
                  <input
                    type="number"
                    value={inputs.fipeOrMarketValue || ''}
                    onChange={(e) => handleRawNumberChange('fipeOrMarketValue', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 text-base font-bold text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="50000"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  O valor de venda real em concessionária/mercado, não o valor inflacionado.
                </p>
              </div>

              {/* Lance Ofertado */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-1">
                  Seu Lance Máximo na Tela (Preço de Batida do Martelo)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm font-semibold text-amber-700">R$</span>
                  <input
                    type="number"
                    value={inputs.lance || ''}
                    onChange={(e) => handleRawNumberChange('lance', Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 text-base font-black text-amber-950 bg-white border border-amber-400 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="28000"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-amber-900 mt-2 font-medium">
                  <span>+ Comissão Obrigatória de 5%:</span>
                  <span className="font-bold">{formatBRL(result.comissaoLeiloeiro)}</span>
                </div>
              </div>

              {/* Despesas Acessórias Grid */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-3">
                  Despesas Adicionais do Edital (O que a maioria esquece):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Taxa de Pátio / Administrativa
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400">R$</span>
                      <input
                        type="number"
                        value={inputs.taxaPatio || ''}
                        onChange={(e) => handleRawNumberChange('taxaPatio', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                        placeholder="800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Débitos Previstos no Edital (IPVA/IPTU)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400">R$</span>
                      <input
                        type="number"
                        value={inputs.debitos || ''}
                        onChange={(e) => handleRawNumberChange('debitos', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                        placeholder="1200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Transporte / Guincho / Frete
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400">R$</span>
                      <input
                        type="number"
                        value={inputs.transporteGuincho || ''}
                        onChange={(e) => handleRawNumberChange('transporteGuincho', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                        placeholder="500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Despachante / Custas / ITBI / Transferência
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400">R$</span>
                      <input
                        type="number"
                        value={inputs.despachanteCustas || ''}
                        onChange={(e) => handleRawNumberChange('despachanteCustas', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                        placeholder="900"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Outros Gastos (Revisão mecânica, pequenas reformas, etc.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-xs text-slate-400">R$</span>
                    <input
                      type="number"
                      value={inputs.outrosCustos || ''}
                      onChange={(e) => handleRawNumberChange('outrosCustos', Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Column (Right) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Resultado Geral */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Composição Final do Custo
            </h3>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {formatBRL(result.custoTotal)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Preço real desembolsado para colocar o bem em seu nome.
            </p>

            {/* Gauge Rule of 65% */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">Percentual sobre a FIPE:</span>
                <span
                  className={`text-base font-extrabold ${
                    result.status === 'excelente'
                      ? 'text-emerald-600'
                      : result.status === 'atencao'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {result.percentualSobreFipe.toFixed(1)}%
                </span>
              </div>

              {/* Barra de progresso */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.status === 'excelente'
                      ? 'bg-emerald-500'
                      : result.status === 'atencao'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, result.percentualSobreFipe))}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0%</span>
                <span className="text-emerald-600 font-bold">65% (Teto Seguro)</span>
                <span>100% (FIPE)</span>
              </div>
            </div>

            {/* Status Feedback Box */}
            <div
              className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 ${
                result.status === 'excelente'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : result.status === 'atencao'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              {result.status === 'excelente' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : result.status === 'atencao' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed font-medium">
                {result.mensagem}
              </div>
            </div>

            {/* Breakdown Items List */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Lance Base (Batida):</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.lance)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>+ 5% Comissão Leiloeiro:</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.comissaoLeiloeiro)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>+ Taxa Administrativa do Pátio:</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.taxaPatio)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>+ Débitos Pendentes do Edital:</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.debitos)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>+ Transporte / Guincho:</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.transporteGuincho)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>+ Despachante &amp; Transferência:</span>
                <span className="font-semibold text-slate-800">{formatBRL(result.despachanteCustas + result.outrosCustos)}</span>
              </div>
            </div>

            {/* Lucro Estimado */}
            <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-500 block">
                    Economia Bruta vs FIPE
                  </span>
                  <span className="text-xl font-black text-emerald-700 block">
                    {formatBRL(result.economiaBruta)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-slate-500 block">
                    Margem sobre Custo
                  </span>
                  <span className="text-xl font-black text-slate-800 block">
                    +{result.margemLucroPercentual.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isVip && (
        <div className="mt-8">
          <VipLockOverlay
            title="Exportação de Relatório &amp; Cenários Imobiliários VIP"
            description="Você testou o simulador básico da Regra dos 65%. Na Área VIP, você tem acesso às planilhas editáveis de cálculo para arrematações de múltiplos imóveis da Caixa e frotas de empresas com exportação em PDF."
            features={[
              'Simulação de até 10 lotes simultâneos para revenda',
              'Cálculo automático de ITBI, emolumentos e desocupação judicial',
              'Exportação de laudo em PDF para apresentação a sócios ou investidores',
              'Acesso aos cenários secretos de leilões com 70% de desconto',
            ]}
            onOpenCheckout={onOpenCheckout}
            onOpenLogin={onOpenLogin}
          />
        </div>
      )}
    </div>
  );
};
