import React, { useState } from 'react';
import { CHAPTERS, MAIORES_LEILOEIROS, CANAIS_ACOMPANHAMENTO, CHECKLIST_STEPS } from '../data/ebookContent';
import {
  BookOpen,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
  Info,
  Car,
  Home,
  Laptop,
  Scale,
  ExternalLink,
  ChevronRight,
  Calculator,
  Lock,
} from 'lucide-react';
import { VipLockOverlay } from './VipLockOverlay';

interface EbookReaderProps {
  onOpenCalculator: () => void;
  onOpenScanner: () => void;
  onOpenRadar: () => void;
  onOpenChecklist: () => void;
  isVip?: boolean;
  onOpenCheckout?: () => void;
  onOpenLogin?: () => void;
}

export const EbookReader: React.FC<EbookReaderProps> = ({
  onOpenCalculator,
  onOpenScanner,
  onOpenRadar,
  onOpenChecklist,
  isVip = false,
  onOpenCheckout = () => {},
  onOpenLogin = () => {},
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('capa-intro');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const scrollToSection = (id: string) => {
    setActiveChapterId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[17px] leading-relaxed';
      case 'xlarge':
        return 'text-[19px] leading-loose';
      default:
        return 'text-[15px] leading-relaxed';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Chapter Index Nav (Left Sidebar) */}
        <aside className="lg:col-span-3 sticky top-24 space-y-4 no-print">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Sumário do Livro
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    fontSize === 'normal' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  title="Tamanho Normal"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    fontSize === 'large' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  title="Texto Maior"
                >
                  A+
                </button>
              </div>
            </div>

            <nav className="space-y-1">
              {CHAPTERS.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => scrollToSection(chap.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between group ${
                    activeChapterId === chap.id
                      ? 'bg-amber-50 text-amber-950 font-bold border-l-4 border-amber-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-600">
                      {chap.number}
                    </span>
                    <span className="line-clamp-1">{chap.shortTitle}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-slate-400" />
                </button>
              ))}
            </nav>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                Atalhos Rápidos:
              </span>
              <button
                onClick={onOpenCalculator}
                className="w-full text-left p-2 rounded-md bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 text-xs flex items-center gap-2 border border-slate-200/80 transition"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulador de Custos (65%)</span>
              </button>
              <button
                onClick={onOpenScanner}
                className="w-full text-left p-2 rounded-md bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-900 text-xs flex items-center gap-2 border border-slate-200/80 transition"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>Scanner Antigolpe</span>
              </button>
              <button
                onClick={onOpenRadar}
                className="w-full text-left p-2 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs flex items-center gap-2 border border-slate-200/80 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                <span>Portais Homologados</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm text-slate-800 ${getFontSizeClass()}`}>
          
          {/* =========================================================
              SEÇÃO 1: CAPA & INTRODUÇÃO
             ========================================================= */}
          <section id="capa-intro" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
            {/* Header Document Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
                  alt="GDL Leilões"
                  className="w-10 h-10 object-contain rounded-lg border border-amber-500/30 p-1"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 text-amber-400 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                      GDL LEILÕES &bull; DOSSIÊ OFICIAL
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      REF: 2026-GDL-LEIL
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">Inteligência Financeira em Arrematações</span>
                </div>
              </div>
              <span className="text-xs text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded border border-amber-300">
                Guia Prático 100% Descomplicado &bull; Sem Juridiquês
              </span>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
                O GUIA DEFINITIVO DOS LEILÕES
              </h1>
              <p className="text-lg sm:text-xl font-medium text-amber-800 mb-6 leading-relaxed">
                Como Arrematar Carros, Imóveis e Eletrônicos com até 70% de Desconto nos Portais Oficiais (Sem Cair em Golpes).
              </p>
            </div>

            {/* Banner de Impacto */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl my-8 shadow-md border-l-4 border-amber-500">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
                O Fim do Mito: Leilão NÃO é exclusividade de milionários ou advogados
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Durante décadas, o mercado de leilões no Brasil foi tratado como um círculo restrito, protegido por
                uma cortina densa de linguagem jurídica e preconceitos populares de que "carro de leilão não presta"
                ou "imóvel retomado dá processo infinito". A verdade que investidores experientes guardam a sete chaves
                é simples: <strong>qualquer cidadão comum, com CPF regular e acesso à internet, pode arrematar bens com descontos
                agressivos de até 70% direto de bancos estatais e órgãos do governo.</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center">
                <div className="bg-slate-800/80 p-3 rounded-lg">
                  <span className="text-xl font-black text-emerald-400 block">Até -70%</span>
                  <span className="text-[11px] text-slate-400">Abaixo da Tabela FIPE ou Mercado</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg">
                  <span className="text-xl font-black text-white block">100% Online</span>
                  <span className="text-[11px] text-slate-400">Lances auditados em auditório virtual</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg">
                  <span className="text-xl font-black text-amber-400 block">Conta Gov.br</span>
                  <span className="text-[11px] text-slate-400">Nível Prata ou Ouro já habilita</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">
              A Grande Oportunidade: Por Que Bens São Vendidos Tão Barato?
            </h3>
            <p className="mb-4">
              Muitas pessoas desconfiam quando veem um carro seminovo avaliado em R$ 60.000 com lance inicial de R$ 22.000,
              ou um apartamento de R$ 300.000 anunciado na Caixa Econômica por R$ 130.000. Elas se perguntam: <em>"Onde está a pegadinha?"</em>
            </p>
            <p className="mb-4">
              Não existe mágica; existe <strong>custo operacional financeiro</strong>. Entenda a lógica de cada vendedor:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
                  <Home className="w-4 h-4 text-emerald-600" />
                  <span>Bancos (Caixa, Itaú, Bradesco)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bancos não são imobiliárias. Um imóvel retomado por inadimplência gera IPTU, condomínio mensal e exige
                  provisão de risco de crédito no Banco Central. O banco quer apenas liquidar o saldo devedor o mais rápido
                  possível para reaver liquidez em dinheiro vivo.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
                  <Laptop className="w-4 h-4 text-emerald-600" />
                  <span>Receita Federal do Brasil</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mercadorias retidas em alfândegas (iPhones, computadores, consoles lacrados e carros) ocupam galpões
                  aeroportuários com custos milionários de armazenagem. O objetivo do leilão não é o lucro comercial, mas
                  esvaziar os recintos aduaneiros e arrecadar tributos federais.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
                  <Car className="w-4 h-4 text-emerald-600" />
                  <span>DETRANs &amp; Pátios Públicos</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pela Lei Federal de Trânsito, veículos apreendidos em blitz e não resgatados pelo proprietário em 60 dias
                  são levados a leilão público. A lei autoriza a <strong>desvinculação das multas e IPVAs antigos</strong>,
                  entregando o bem livre de passivos anteriores para o comprador arrematante.
                </p>
              </div>
            </div>

            {/* Caixa de Atenção */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-6">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Aviso Fundamental: Leilão Não é Cassino</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Leilão não é jogo de sorte, é <strong>cálculo matemático e auditoria de edital</strong>. Quem compra com
                emoção e sem somar as despesas obrigatórias pode pagar mais caro que na concessionária. Quem segue as regras
                deste manual constrói patrimônio sólido e multiplica capital.
              </p>
            </div>
          </section>

          {/* =========================================================
              SEÇÃO 2: MÓDULO 1: O MAPA DOS LEILÕES NO BRASIL
             ========================================================= */}
          <section id="modulo-1" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Módulo 01
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Panorama Estrutural
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              O Mapa dos Leilões no Brasil: Onde Estão as Melhores Oportunidades
            </h2>
            <p className="mb-4">
              Para vencer nos leilões, você precisa saber com quem está negociando. No Brasil, os leilões se dividem em
              quatro grandes frentes operacionais:
            </p>

            {/* Card 1: Receita Federal */}
            <div className="border border-slate-200 rounded-xl p-5 mb-4 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Laptop className="w-5 h-5 text-blue-600" />
                <span>1. Leilões da Receita Federal (e-CAC)</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                São os leilões mais cobiçados para <strong>eletrônicos lacrados</strong> (smartphones topo de linha,
                tablets, notebooks de última geração, relógios inteligentes, drones), além de vinhos importados,
                instrumentos musicais e veículos apreendidos nas fronteiras.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>Exigência Chave:</strong> Acesso restrito via conta Gov.br nível Prata ou Ouro no Sistema de Leilão Eletrônico (SLE).</li>
                <li><strong>Divisão de Lotes:</strong> Existem lotes destinados a <em>Pessoas Físicas</em> (para uso e consumo próprio) e lotes para <em>Pessoas Jurídicas</em> (destinados a revenda no comércio).</li>
                <li><strong>Garantia de Legalidade:</strong> Mercadorias 100% legalizadas e desembaraçadas. O pagamento do lote é feito exclusivamente por DARF (Documento de Arrecadação de Receitas Federais).</li>
              </ul>
            </div>

            {/* Card 2: Caixa Econômica Federal */}
            <div className="border border-slate-200 rounded-xl p-5 mb-4 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-emerald-600" />
                <span>2. Leilões de Bancos (Destaque Caixa Econômica Federal)</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                A Caixa é a maior financiadora habitacional do país e detém o maior estoque de casas e apartamentos retomados.
                Possui modalidades extremamente vantajosas:
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>1º e 2º Leilão:</strong> No 1º leilão, o imóvel é ofertado pelo valor de avaliação de mercado. Se não houver compradores, vai para o 2º leilão com até 50% ou 60% de abatimento.</li>
                <li><strong>Venda Online &amp; Venda Direta Online:</strong> Se o imóvel não foi arrematado nos leilões tradicionais, ele entra no portal da Caixa para venda direta. O primeiro que ofertar o valor mínimo estipulado leva o imóvel, sem disputa de lances!</li>
                <li><strong>Facilidades de Financiamento:</strong> Em muitos lotes da Caixa, é permitido financiar até 80% do valor do leilão e utilizar saldo do FGTS para abatimento.</li>
              </ul>
            </div>

            {/* Card 3: DETRAN e Pátios Públicos */}
            <div className="border border-slate-200 rounded-xl p-5 mb-4 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-amber-600" />
                <span>3. Leilões do DETRAN e Pátios Públicos</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Focados em motos, carros populares e veículos utilitários recolhidos em fiscalizações de trânsito ou abandonados.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>Classificação:</strong> Veículos com direito a documentação (aptos a circular) vs Sucatas (para desmonte de peças por oficinas credenciadas).</li>
                <li><strong>Limpeza de Débitos:</strong> Pela legislação de trânsito brasileira, o dinheiro arrecadado na arrematação paga as despesas de guincho e pátio; os débitos anteriores de IPVA e multas são desvinculados do prontuário do veículo.</li>
              </ul>
            </div>

            {/* Diferença: Judiciais vs Extrajudiciais */}
            <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5" />
                <span>Leilões Judiciais vs. Leilões Extrajudiciais: Onde Investir?</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <span className="font-extrabold text-white text-sm block mb-1">Leilões Judiciais</span>
                  <p className="text-slate-300 leading-relaxed">
                    Determinado por um Juiz de Direito para pagar execuções fiscais, dívidas trabalhistas ou divórcios.
                    <br /><strong className="text-emerald-300">Vantagem:</strong> Preço imbatível na 2ª praça (50% da avaliação oficial).
                    <br /><strong className="text-amber-300">Desvantagem:</strong> Rito burocrático mais lento. A emissão da Carta de Arrematação depende de despacho judicial no cartório da vara.
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <span className="font-extrabold text-white text-sm block mb-1">Leilões Extrajudiciais</span>
                  <p className="text-slate-300 leading-relaxed">
                    Organizados diretamente por bancos, seguradoras (Porto Seguro, Bradesco Auto) e frotas de empresas privadas.
                    <br /><strong className="text-emerald-300">Vantagem:</strong> Agilidade extrema. A nota de venda é emitida em 24h a 48h e a liberação no pátio é imediata.
                    <br /><strong className="text-emerald-300">Recomendação:</strong> Ideal para quem está começando e quer menor dor de cabeça burocrática.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabela dos Maiores Leiloeiros */}
            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">
              Tabela de Referência: Os Maiores Leiloeiros Oficiais do Brasil
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Guarde esta tabela. Mais de 90% dos leilões legítimos passam por estas plataformas homologadas:
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Organização</th>
                    <th className="py-2.5 px-3">Domínio Oficial</th>
                    <th className="py-2.5 px-3">Registro / Junta</th>
                    <th className="py-2.5 px-3">Foco Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {MAIORES_LEILOEIROS.slice(0, 7).map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{item.nome}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-800 font-semibold">{item.siteOficial}</td>
                      <td className="py-2.5 px-3 text-[11px]">{item.juntaComercial}</td>
                      <td className="py-2.5 px-3">{item.especialidades.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* =========================================================
              SEÇÃO 3: MÓDULO 2: CADASTRO E HABILITAÇÃO PASSO A PASSO
             ========================================================= */}
          <section id="modulo-2" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Módulo 02
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Operação &amp; Análise
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              Cadastro, Habilitação &amp; O Segredo do Edital
            </h2>
            <p className="mb-4">
              Para dar lances em leilões sérios, você precisa passar por um filtro prévio de conformidade cadastral.
              Abaixo está o roteiro prático para estar pronto no dia do pregão:
            </p>

            <div className="space-y-4 my-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Conta Gov.br Nível Prata ou Ouro (Portal e-CAC da Receita)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  A Receita Federal aposentou certificados digitais físicos para pessoas físicas. Hoje, para dar lances
                  no Sistema de Leilão Eletrônico (SLE), é obrigatório possuir uma conta Gov.br nível Prata ou Ouro.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <strong>Como elevar para Prata ou Ouro em 2 minutos:</strong> Acesse o aplicativo Gov.br no celular e valide
                  seu rosto por biometria facial (base da CNH ou TSE) ou faça login integrado com as credenciais do seu banco
                  (Banco do Brasil, Bradesco, Santander, Itaú, Nubank, Caixa). Isso eleva seu nível imediatamente.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Cadastro e Habilitação nos Leiloeiros Privados Homologados</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Nos sites privados (Zukerman, Superbid, Freitas, Milan), você deve criar conta e solicitar a
                  <strong> habilitação para o leilão específico</strong> com no mínimo 48 horas de antecedência.
                </p>
                <ul className="text-xs text-slate-700 list-disc pl-5 space-y-1">
                  <li>Envio de cópia digitalizada de RG ou CNH frente e verso.</li>
                  <li>Comprovante de residência em nome próprio recente (últimos 90 dias).</li>
                  <li>Se casado: certidão de casamento e anuência do cônjuge (obrigatório para arrematação de imóveis).</li>
                  <li>Assinatura eletrônica do Termo de Adesão e Responsabilidade.</li>
                </ul>
              </div>
            </div>

            {/* O Segredo do Edital */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 my-8 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide mb-2">
                <FileText className="w-4 h-4" />
                <span>A Bíblia da Operação</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-3">
                Os 3 Pontos Obrigatórios do Edital que Ninguém Lê (e Que Podem Te Quebrar)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                O edital é a lei que rege a arrematação. Jamais compre um lote olhando apenas as fotos ilustrativas.
                Abra o PDF oficial do edital e dê um "Ctrl + F" procurando exatamente por estes 3 pontos:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-800/90 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                  <span className="font-extrabold text-white text-sm block mb-1">
                    1. Prazo Improrrogável de Pagamento (Geralmente 24h)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Em leilão não existe "vou ver se o banco aprova meu empréstimo semana que vem". A batida do martelo
                    obriga a liquidação à vista em até 24 ou 48 horas. Se você não pagar, é considerado remisso: o lote é cancelado,
                    você perde os 5% da comissão e pode ter seu CPF negativado e suspenso de dar lances em todo o país por até 2 anos.
                  </p>
                </div>

                <div className="bg-slate-800/90 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <span className="font-extrabold text-white text-sm block mb-1">
                    2. Responsabilidade sobre Débitos Anteriores (A Armadilha do IPVA e Condomínio)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O edital diz claramente: <em>"Débitos até a data do leilão por conta do comitente vendedor"</em> OU
                    <em> "Débitos de IPVA, multas e taxa de licenciamento por conta do arrematante"</em>. Se o edital transferir
                    a dívida para o arrematante, você terá que pagar cada centavo de IPVA atrasado. Se não somar isso ao lance,
                    o desconto evapora.
                  </p>
                </div>

                <div className="bg-slate-800/90 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <span className="font-extrabold text-white text-sm block mb-1">
                    3. Prazo de Retirada &amp; Diárias de Pátio
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Após a emissão da nota de leilão, você tem entre 5 a 15 dias úteis para retirar o carro ou bem com guincho
                    agendado. Se você demorar, o pátio cobra diárias de estadia que variam de R$ 40 a R$ 90 por dia. Planeje
                    o frete antes mesmo do pregão começar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {!isVip ? (
            <div className="my-8">
              <VipLockOverlay
                title="Módulos 3, 4 e Checklists Bloqueados no Modo Visitante"
                description="Você visualizou os dois primeiros módulos do guia. Para ter acesso à fórmula matemática completa da Regra dos 65%, ao Manual Antigolpe com auditoria das Juntas Comerciais e ao Checklist oficial em 8 etapas, desbloqueie seu Acesso VIP."
                features={[
                  'Módulo 3: Planilha matemática e fórmula do Custo Real',
                  'Módulo 4: As 4 Regras de Ouro contra mais de 5.000 clones falsos',
                  'Diretório com todos os links oficiais de leiloeiros homologados',
                  'Checklist de campo em 8 etapas com emissão da Carta de Arrematação',
                ]}
                onOpenCheckout={onOpenCheckout}
                onOpenLogin={onOpenLogin}
              />
            </div>
          ) : (
            <>
              {/* =========================================================
                  SEÇÃO 4: MÓDULO 3: A MATEMÁTICA DO LANCE
                 ========================================================= */}
              <section id="modulo-3" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Módulo 03
                  </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Inteligência Financeira
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              A Matemática do Lance &amp; A Regra dos 65%
            </h2>
            <p className="mb-4">
              O maior erro de um iniciante é olhar um carro de R$ 50.000 anunciado com lance de R$ 28.000 e achar que
              gastará exatamente R$ 28.000. <strong>Preço de tela NÃO é o preço final.</strong>
            </p>

            {/* A Fórmula do Custo Real */}
            <div className="bg-slate-50 border-2 border-emerald-500/40 rounded-2xl p-6 my-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                A Fórmula Universal do Custo Real em Leilão:
              </span>
              <div className="p-4 bg-white rounded-xl border border-slate-200 font-mono text-xs sm:text-sm font-bold text-slate-900 overflow-x-auto">
                CUSTO TOTAL = Lance + 5% (Comissão Obrigatória) + Taxa Administrativa do Pátio + Débitos do Edital + Guincho/Transporte + Despachante/Transferência
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>5% Comissão:</strong> Fixada pelo Decreto-Lei nº 21.981/32, paga diretamente ao leiloeiro oficial.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Taxa de Pátio:</strong> Varia de R$ 400 a R$ 1.200 conforme porte do veículo ou bem.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Transporte/Guincho:</strong> Carro de leilão sai guinchado (custo médio R$ 300 a R$ 600 na mesma cidade).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Despachante:</strong> Vistoria de identificação veicular, baixa de restrições e emissão de novo CRV.</span>
                </div>
              </div>
            </div>

            {/* A Regra dos 65% */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-7 my-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-black text-emerald-300">
                  A Sagrada "Regra dos 65%"
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                  TETO MÁXIMO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Investidores profissionais utilizam um mandamento inviolável:
                <strong> A soma de TODAS as despesas (lance + comissão + taxas + débitos + frete + revisão) JAMAIS pode ultrapassar 65% do valor de mercado ou da Tabela FIPE.</strong>
              </p>
              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/60 text-xs text-emerald-100">
                <strong>Por que 65%?</strong> Porque ao manter o custo em 65%, você garante uma <strong>margem líquida de 35%</strong>.
                Se o carro precisar de 4 pneus novos, troca de óleo ou pintura de para-choque, você ainda terá um lucro espetacular
                ou economizará dezenas de milhares de reais para uso pessoal. Se ultrapassar 75%, o risco supera a recompensa.
              </div>
            </div>

            {/* Exemplo Prático Simulado */}
            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">
              Estudo de Caso Real: Carro de FIPE R$ 50.000 com Lucro Limpo de R$ 15.000
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Veja a simulação matemática detalhada de um Chevrolet Onix 2021 arrematado em leilão de financeira:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 block">Tabela FIPE de Referência:</span>
                  <span className="text-lg font-black text-slate-900">R$ 50.000,00</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Teto Máximo Permitido (65%):</span>
                  <span className="text-lg font-black text-emerald-700">R$ 32.500,00</span>
                </div>
              </div>

              <div className="py-3 space-y-1.5 border-b border-slate-200 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>(+) Lance de Batida do Martelo:</span>
                  <span className="font-bold text-slate-900">R$ 28.000,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(+) 5% Comissão do Leiloeiro:</span>
                  <span>R$ 1.400,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(+) Taxa de Pátio / Administrativa:</span>
                  <span>R$ 800,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(+) IPVA e multas previstos no edital:</span>
                  <span>R$ 1.200,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(+) Frete em Guincho Plataforma:</span>
                  <span>R$ 500,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(+) Despachante, Laudo Cautelar e Transferência:</span>
                  <span>R$ 900,00</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-500 block">Custo Total Desembolsado:</span>
                  <span className="text-xl font-black text-slate-950 font-mono">R$ 32.800,00</span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">65,6% da FIPE (Margem Excelente)</span>
                </div>
                <div className="bg-emerald-100 border border-emerald-300 p-3 rounded-lg text-emerald-950 text-right">
                  <span className="text-[10px] uppercase font-bold block">Economia / Lucro Real na Revenda:</span>
                  <span className="text-xl font-black text-emerald-800">R$ 17.200,00</span>
                  <span className="text-[10px] block">Vendendo rápido a R$ 48.000 = +R$ 15.200 de lucro líquido!</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Testar Outros Valores na Calculadora Interativa</span>
              </button>
            </div>
          </section>

          {/* =========================================================
              SEÇÃO 5: MÓDULO 4: O MANUAL ANTIGOLPE
             ========================================================= */}
          <section id="modulo-4" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-red-100 text-red-800">
                Módulo 04
              </span>
              <span className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                Segurança Máxima
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              O Manual Antigolpe: Como Se Blindar de Fraudes
            </h2>
            <p className="mb-4">
              Segundo dados da Associação dos Leiloeiros Oficiais, <strong>mais de 5.000 sites falsos de leilão são criados todos os meses</strong>.
              Golpistas compram anúncios no Google patrocinado, clonam o visual de leiloeiros famosos (Freitas, Superbid, Zukerman) ou
              criam portais com fotos de brasões da Polícia e do DETRAN para enganar compradores ingênuos.
            </p>

            {/* As 4 Regras de Ouro */}
            <div className="space-y-4 my-6">
              <div className="border-l-4 border-slate-900 bg-slate-50 p-5 rounded-r-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Regra de Ouro #1
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Checagem Obrigatória na Junta Comercial do Estado
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  No Brasil, toda pessoa que realiza leilão público é um <strong>Leiloeiro Oficial</strong> matriculado
                  em uma Junta Comercial (JUCESP em São Paulo, JUCERJA no Rio, JUCEG em Goiás, JUCISRS no Rio Grande do Sul).
                  <br /><strong>Como checar:</strong> Nunca confie apenas no que está escrito no site. Abra a página da Junta Comercial,
                  vá na aba "Consulta de Leiloeiros" e digite o nome do profissional. O site oficial dele DEVE ser rigorosamente
                  idêntico ao domínio cadastrado na Junta.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50/50 p-5 rounded-r-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  Regra de Ouro #2
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Consulta de Data e Extensão do Domínio (Registro.br)
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Praticamente 100% dos leiloeiros oficiais do Brasil utilizam extensões <strong>.com.br</strong> ou órgãos do governo
                  usam <strong>.gov.br</strong>. Desconfie imediatamente de sites terminados em <em>.top, .online, .site, .vip, .xyz, .cc</em>.
                  <br /><strong>Dica técnica:</strong> Consulte o Whois no Registro.br. Se o site tiver sido registrado há 20 dias,
                  é golpe certeiro. Leiloeiros consolidados possuem domínios registrados há mais de 10 ou 20 anos.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 bg-amber-50/50 p-5 rounded-r-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Regra de Ouro #3
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Visitação Física aos Pátios Credenciados
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Todo leilão idôneo possui pátio físico e é obrigado por lei a abrir para visitação pública prévia, informando
                  endereço, datas e horários no edital. Golpistas sempre inventam desculpas: <em>"Devido à pandemia ou reformas,
                  as visitas estão suspensas, veja apenas as fotos em nosso site"</em>. Se não puder visitar, não dê lances.
                </p>
              </div>

              <div className="border-l-4 border-red-600 bg-red-50 p-5 rounded-r-xl">
                <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Regra de Ouro #4 &bull; Alerta Vermelho Absoluto</span>
                </div>
                <h3 className="text-base font-bold text-red-950 mb-2">
                  Forma de Pagamento: Leilão Oficial NUNCA Recebe PIX para CPF
                </h3>
                <p className="text-xs text-red-900 leading-relaxed mb-3">
                  Esta é a regra mais importante de todo o e-book: <strong>Leilão de verdade NUNCA recebe PIX para conta de pessoa física,
                  chaves aleatórias, contas de "diretores financeiros" ou links de pagamento enviados por WhatsApp.</strong>
                </p>
                <div className="bg-white p-3 rounded-lg border border-red-200 text-xs text-slate-800 space-y-1">
                  <div><strong>Receita Federal:</strong> Paga exclusivamente via DARF gerado no portal e-CAC.</div>
                  <div><strong>Leilão Judicial:</strong> Paga exclusivamente por Guia de Depósito Judicial vinculada ao processo (BB ou Caixa).</div>
                  <div><strong>Leiloeiro Privado:</strong> TED ou boleto nominal com o nome exato e matrícula do Leiloeiro Oficial registrado na Junta Comercial.</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-white text-xs font-bold transition shadow-sm"
              >
                <ShieldAlert className="w-4 h-4 text-red-300" />
                <span>Abrir Scanner Interativo Antigolpe</span>
              </button>
            </div>
          </section>

          {/* =========================================================
              SEÇÃO 6: ONDE ACOMPANHAR LEILÕES QUE VÃO ACONTECER
             ========================================================= */}
          <section id="radar-sites" className="scroll-mt-28 mb-16 pb-12 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Diretório
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Fontes Primárias
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              Onde Acompanhar os Leilões que Vão Acontecer
            </h2>
            <p className="mb-4">
              Para encontrar oportunidades antes da maioria, acompanhe estes canais oficiais:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {CANAIS_ACOMPANHAMENTO.map((c, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">{c.canal}</h3>
                  <p className="text-slate-600 mb-2"><strong>Como acessar: </strong>{c.comoAcessar}</p>
                  <p className="text-slate-600 mb-2"><strong>Frequência: </strong>{c.frequencia}</p>
                  <div className="bg-emerald-50 text-emerald-950 p-2 rounded border border-emerald-200 text-[11px]">
                    <strong>Segredo: </strong>{c.dicaPratica}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={onOpenRadar}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>Explorar Todos os Portais e Leiloeiros no Radar</span>
              </button>
            </div>
          </section>

          {/* =========================================================
              SEÇÃO 7: CHECKLIST FINAL DE ARREMATAÇÃO
             ========================================================= */}
          <section id="checklist" className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Checklist
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Auditoria de Campo
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
              Checklist Final de Arrematação em 8 Etapas
            </h2>
            <p className="mb-4">
              Antes de transferir um único centavo ou comparecer ao pátio, certifique-se de ter concluído
              todas as 8 etapas do roteiro de segurança:
            </p>

            <div className="space-y-3 my-6">
              {CHECKLIST_STEPS.map((step) => (
                <div key={step.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-start gap-3 text-xs">
                  <span className="font-mono font-bold text-slate-900 bg-white border border-slate-300 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {step.id}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{step.titulo}</h3>
                    <p className="text-slate-600 mb-2 leading-relaxed">{step.descricao}</p>
                    <div className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                      <strong>Documento de Validação: </strong>{step.documentoChave}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Abrir Checklist Interativo com Salva Automática</span>
              </button>
            </div>
          </section>
                </>
              )}

        </main>
      </div>
    </div>
  );
};
