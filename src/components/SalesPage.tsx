import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Calculator,
  ShieldAlert,
  Star,
  Award,
  Zap,
  Clock,
  Sparkles,
  HelpCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Car,
  Home,
  Laptop,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatBRL } from '../utils/calculator';

interface SalesPageProps {
  onOpenCheckout: () => void;
  onPreviewEbook: () => void;
  onOpenCalculator: () => void;
  onOpenScanner: () => void;
}

interface Testimonial {
  nome: string;
  cidade: string;
  avatar: string;
  arrematacao: string;
  economia: string;
  depoimento: string;
  estrelas: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    nome: 'Marcos Vinicius Ribeiro',
    cidade: 'Campinas - SP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    arrematacao: 'Chevrolet Tracker 2022',
    economia: 'Economia de R$ 26.400 na FIPE',
    depoimento:
      'Eu tinha muito medo de cair em golpe de leilão falso pela internet. A Regra dos 65% e a checagem na Junta Comercial me deram a segurança que faltava. Arrematei no Freitas Leiloeiro e o carro já está no meu nome.',
    estrelas: 5,
  },
  {
    nome: 'Dra. Camila Nogueira',
    cidade: 'Belo Horizonte - MG',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    arrematacao: 'Apartamento Retomado Caixa',
    economia: 'Desconto de R$ 95.000 do valor de mercado',
    depoimento:
      'Comprei o imóvel na modalidade Venda Direta Online da Caixa seguindo exatamente as instruções do Módulo 1. Usei meu FGTS para quitar parte e nem precisei disputar lances. O guia se pagou milhares de vezes.',
    estrelas: 5,
  },
  {
    nome: 'Rodrigo Santoro Mendes',
    cidade: 'Curitiba - PR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    arrematacao: 'Lote de 4 MacBooks Pro M1',
    economia: 'Lucro líquido de R$ 14.800',
    depoimento:
      'O passo a passo da conta Gov.br nível Ouro no portal e-CAC da Receita Federal me ensinou a filtrar lotes para pessoa física. Paguei via DARF sem nenhum estresse e revendi em 2 semanas.',
    estrelas: 5,
  },
];

const FAQS = [
  {
    pergunta: 'Nunca participei de um leilão. Este guia serve para mim?',
    resposta:
      'Sim, 100%! O guia foi escrito em linguagem direta, sem juridiquês, focado no comprador comum e investidor iniciante. Você aprende desde como criar sua conta gratuita no Gov.br até como retirar o bem no pátio.',
  },
  {
    pergunta: 'Como sei que não vou cair em um site falso de leilão?',
    resposta:
      'O Módulo 4 traz o Manual Antigolpe com as 4 Regras de Ouro. Você aprenderá a consultar a matrícula do leiloeiro na Junta Comercial e identificar clones que usam PIX falso para CPF.',
  },
  {
    pergunta: 'Como recebo o e-book e os bônus após o pagamento?',
    resposta:
      'O acesso é imediato! Assim que o pagamento (PIX ou Cartão) for confirmado, você terá acesso imediato à versão digital, ao download do documento em PDF diagramado e a todas as ferramentas interativas.',
  },
  {
    pergunta: 'E se eu não gostar do conteúdo?',
    resposta:
      'Você tem garantia incondicional de 7 dias. Se por qualquer motivo achar que o manual não agregou valor, basta solicitar o reembolso e devolveremos 100% do seu dinheiro.',
  },
];

export const SalesPage: React.FC<SalesPageProps> = ({
  onOpenCheckout,
  onPreviewEbook,
  onOpenCalculator,
  onOpenScanner,
}) => {
  // Simulador interativo de economia
  const [selectedAsset, setSelectedAsset] = useState<'carro' | 'suv' | 'imovel' | 'tech'>('carro');

  // Quiz interativo
  const [quizStep, setQuizStep] = useState(0);
  const [capital, setCapital] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [tolerancia, setTolerancia] = useState('');
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getSimulatedData = () => {
    switch (selectedAsset) {
      case 'suv':
        return {
          tipo: 'SUV Médio (Jeep Compass / Corolla Cross)',
          fipe: 120000,
          lance: 68000,
          custoReal: 78500,
          economia: 41500,
          roi: 'Mais de 1.000x o valor do guia',
        };
      case 'imovel':
        return {
          tipo: 'Apartamento Retomado Caixa (2 Quartos)',
          fipe: 280000,
          lance: 135000,
          custoReal: 154000,
          economia: 126000,
          roi: 'Mais de 3.300x o valor do guia',
        };
      case 'tech':
        return {
          tipo: 'Lote Tecnologia Receita (MacBook + 2 iPhones)',
          fipe: 22000,
          lance: 8500,
          custoReal: 9600,
          economia: 12400,
          roi: 'Mais de 320x o valor do guia',
        };
      default:
        return {
          tipo: 'Carro Popular Seminovo (Onix / HB20 / Polo)',
          fipe: 54000,
          lance: 29500,
          custoReal: 34800,
          economia: 19200,
          roi: 'Mais de 500x o valor do guia',
        };
    }
  };

  const simData = getSimulatedData();

  const handleFinishQuiz = () => {
    let rec = '';
    if (capital === 'baixo' || objetivo === 'tech') {
      rec =
        'Leilões da Receita Federal (e-CAC) e DETRAN: Ideal para começar com capital reduzido, arrematar eletrônicos de consumo e motos de pátio com liquidez imediata.';
    } else if (objetivo === 'imovel') {
      rec =
        'Caixa Econômica Federal (Venda Direta Online): A melhor opção para multiplicar patrimônio imobiliário com descontos de até 60% e uso de FGTS.';
    } else {
      rec =
        'Leilões Extrajudiciais de Bancos e Frotas (Zukerman, Superbid, Freitas): O canal mais rápido para comprar veículos seminovos com desocupação e nota em 48h.';
    }
    setQuizResult(rec);
  };

  return (
    <div className="bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 py-2 px-4 text-center text-xs font-black tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 fill-slate-950" />
        <span>CONDIÇÃO ESPECIAL DE LANÇAMENTO: 60% OFF + 4 BÔNUS EXCLUSIVOS INCLUSOS</span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Brand Logo Header */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-6">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="GDL Leilões Oficial"
              className="w-9 h-9 object-contain"
            />
            <div className="text-left">
              <span className="text-xs font-black tracking-widest uppercase text-amber-400 block">
                GDL LEILÕES
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Inteligência em Arrematações Oficiais
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Como Arrematar Carros, Imóveis e Eletrônicos com até{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 underline decoration-amber-500/50 decoration-wavy">
              70% de Desconto Real
            </span>{' '}
            nos Portais Oficiais
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto mb-8">
            O método prático, passo a passo e blindado contra golpes para comprar bens apreendidos da
            <strong> Caixa Econômica, Receita Federal e DETRAN</strong> sem precisar de advogado ou ser especialista.
          </p>

          {/* CTA Box Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <button
              onClick={onOpenCheckout}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span>Quero o Guia com 60% OFF</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onPreviewEbook}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-bold transition flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Ver Amostra do Guia</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Decreto nº 21.981/32 &amp; CPC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Acesso Digital Imediato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Garantia Total de 7 Dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE TOOL 1: SIMULADOR DE ECONOMIA (ROI)
         ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-4 border border-amber-500/30">
            <Calculator className="w-3.5 h-3.5" />
            Simulador Interativo de Retorno Financeiro
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Quanto Você Vai Economizar no Seu Primeiro Leilão?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-2xl">
            Selecione a categoria de bem que você deseja arrematar e veja o poder do método dos 65% na prática:
          </p>

          {/* Select Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            <button
              onClick={() => setSelectedAsset('carro')}
              className={`p-3 rounded-xl border text-left text-xs transition flex flex-col items-center sm:items-start gap-1 ${
                selectedAsset === 'carro'
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Carro Popular</span>
            </button>

            <button
              onClick={() => setSelectedAsset('suv')}
              className={`p-3 rounded-xl border text-left text-xs transition flex flex-col items-center sm:items-start gap-1 ${
                selectedAsset === 'suv'
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>SUV Médio</span>
            </button>

            <button
              onClick={() => setSelectedAsset('imovel')}
              className={`p-3 rounded-xl border text-left text-xs transition flex flex-col items-center sm:items-start gap-1 ${
                selectedAsset === 'imovel'
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Imóvel Caixa</span>
            </button>

            <button
              onClick={() => setSelectedAsset('tech')}
              className={`p-3 rounded-xl border text-left text-xs transition flex flex-col items-center sm:items-start gap-1 ${
                selectedAsset === 'tech'
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Eletrônicos RFB</span>
            </button>
          </div>

          {/* Results Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 items-center">
            <div className="md:col-span-7 space-y-3 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                {simData.tipo}
              </span>
              <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>Valor de Mercado / Tabela FIPE:</span>
                <span className="font-bold text-white">{formatBRL(simData.fipe)}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>Lance Base Sugerido:</span>
                <span className="font-bold text-amber-400">{formatBRL(simData.lance)}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>Custo Real Total (com 5% + pátio + débitos + frete):</span>
                <span className="font-bold text-slate-200">{formatBRL(simData.custoReal)}</span>
              </div>
            </div>

            <div className="md:col-span-5 bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/40 p-5 rounded-xl text-center">
              <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider block">
                Sua Economia Líquida Estimada:
              </span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400 block my-1">
                {formatBRL(simData.economia)}
              </span>
              <span className="text-[11px] text-slate-300 block mb-3">
                Investimento no Guia: <strong>apenas R$ 37,90</strong>
              </span>
              <button
                onClick={onOpenCheckout}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md"
              >
                Aprender o Passo a Passo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE TOOL 2: QUIZ DO PERFIL DE ARREMATAÇÃO
         ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Quiz Interativo de Diagnóstico
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Descubra Qual Leilão é Perfeito Para o Seu Bolso
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
            Responda 3 perguntas rápidas e receba uma recomendação personalizada de qual órgão ou portal começar:
          </p>

          {!quizResult ? (
            <div className="max-w-md mx-auto text-left space-y-6">
              {/* Pergunta 1 */}
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase mb-2">
                  1. Quanto capital você tem disponível hoje para arrematar?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'baixo', label: 'Até R$ 5.000 (Motos, celulares, lotes eletrônicos)' },
                    { id: 'medio', label: 'De R$ 5.000 a R$ 35.000 (Carros populares e semirenovados)' },
                    { id: 'alto', label: 'Acima de R$ 35.000 (Imóveis Caixa, SUVs e frotas)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCapital(opt.id)}
                      className={`p-3 rounded-xl border text-xs text-left transition ${
                        capital === opt.id
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pergunta 2 */}
              {capital && (
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase mb-2">
                    2. Qual é o seu principal objetivo?
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'veiculo', label: 'Comprar carro ou moto para uso próprio com economia' },
                      { id: 'revenda', label: 'Revender para obter lucro financeiro rápido' },
                      { id: 'imovel', label: 'Conquistar a casa própria ou renda de aluguel' },
                      { id: 'tech', label: 'Adquirir computadores, smartphones e gadgets' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setObjetivo(opt.id)}
                        className={`p-3 rounded-xl border text-xs text-left transition ${
                          objetivo === opt.id
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/60'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {capital && objetivo && (
                <div className="text-center pt-2">
                  <button
                    onClick={handleFinishQuiz}
                    className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
                  >
                    Ver Minha Recomendação Oficial &amp; Ganhar Cupom
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 max-w-lg mx-auto text-center space-y-4 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Seu Caminho Recomendado:</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {quizResult}
              </p>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                Você desbloqueou o cupom <strong>GDL10</strong> (10% de desconto adicional no checkout).
              </div>
              <button
                onClick={onOpenCheckout}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider hover:from-amber-600 hover:to-amber-700 transition"
              >
                Aplicar Cupom &amp; Comprar Guia Completo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          WHAT YOU WILL LEARN (O CONTEÚDO DO GUIA)
         ========================================================= */}
      <section id="conteudo" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Metodologia Completa
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Tudo o que Você Precisa para Comprar com Segurança
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Organizado em 4 módulos cirúrgicos, do cadastro inicial à retirada do bem:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <span className="font-mono text-xs font-bold text-amber-400">MÓDULO 01</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">O Mapa dos Leilões no Brasil</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Onde achar os melhores lotes da Receita Federal (smartphones e informática), Caixa Econômica (imóveis desocupados e Venda Direta Online) e DETRANs (veículos sem dívidas passadas).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <span className="font-mono text-xs font-bold text-amber-400">MÓDULO 02</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">Cadastro, Habilitação &amp; Edital</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Como subir a conta Gov.br para nível Prata ou Ouro em 2 minutos e os 3 pontos obrigatórios do Edital que ninguém lê (prazo de pagamento de 24h, responsabilidade de débitos e diárias de pátio).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <span className="font-mono text-xs font-bold text-amber-400">MÓDULO 03</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">A Matemática do Lance &amp; Regra 65%</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aprenda a calcular a comissão de 5%, taxa administrativa, IPVAs, guincho e transferência. O estudo prático do carro de R$ 50k arrematado com R$ 15k de lucro líquido.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <span className="font-mono text-xs font-bold text-amber-400">MÓDULO 04</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2">O Manual Antigolpe Blindado</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              As 4 Regras de Ouro: Checagem de matrícula na Junta Comercial, consulta de domínio no Registro.br, exigência de vistoria presencial e o alerta máximo: leilão oficial NUNCA recebe PIX para CPF.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE 4 EXCLUSIVE BONUSES
         ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Presentes Exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            4 Bônus Exclusivos Inclusos Gratuitamente
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Ao adquirir o Guia Oficial GDL hoje, você leva todo o ecossistema de ferramentas:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Bônus #1 (Valor R$ 47)
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">
                Calculadora da Regra dos 65%
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ferramenta web para calcular o custo total real e não errar o teto do lance.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-4">Grátis Hoje</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Bônus #2 (Valor R$ 47)
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">
                Detector &amp; Scanner Antigolpe
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auditoria imediata de link, leiloeiro e forma de pagamento com score de risco.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-4">Grátis Hoje</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Bônus #3 (Valor R$ 37)
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">
                Diretório de Portais Homologados
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Acesso à lista dos leiloeiros oficiais e canais para acompanhar editais com 30 dias de antecedência.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-4">Grátis Hoje</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Bônus #4 (Valor R$ 27)
              </span>
              <h4 className="font-bold text-white text-sm mt-2 mb-1">
                Checklist Oficial de 8 Etapas
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Roteiro operacional com verificação de documentos para você não esquecer nada.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-4">Grátis Hoje</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING CARD (OFERTA FINAL)
         ========================================================= */}
      <section id="oferta" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest py-1.5 px-6 rounded-full inline-block mb-6 shadow">
            OFERTA VÁLIDA POR TEMPO LIMITADO
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Garanta Seu Acesso ao Guia Definitivo GDL
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-8">
            Tenha em mãos o dossiê completo em PDF + todas as ferramentas interativas pelo menor preço da história:
          </p>

          <div className="my-6">
            <span className="text-slate-500 line-through text-sm sm:text-base block">
              De R$ 97,00 por apenas
            </span>
            <div className="flex items-baseline justify-center gap-1 text-amber-400 my-2">
              <span className="text-xl sm:text-2xl font-bold">R$</span>
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                37
              </span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400">,90</span>
            </div>
            <span className="text-xs text-slate-400 block">
              Ou em até 4x de R$ 9,90 no cartão de crédito
            </span>
          </div>

          <button
            onClick={onOpenCheckout}
            className="w-full max-w-md mx-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:scale-102 flex items-center justify-center gap-2 mb-4"
          >
            <span>Quero Arrematar com Segurança Agora</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span>&bull; Pagamento Único (Sem Mensalidades)</span>
            <span>&bull; Acesso Vitalício</span>
            <span>&bull; Garantia de 7 Dias</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          SOCIAL PROOF (DEPOIMENTOS)
         ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Resultados Comprovados
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            O que Dizem Quem Já Arrematou com o Guia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(t.estrelas)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                  "{t.depoimento}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.nome}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h5 className="font-bold text-white text-xs">{t.nome}</h5>
                    <span className="text-[10px] text-slate-400 block">{t.cidade}</span>
                    <span className="text-[10px] text-amber-400 font-bold block mt-0.5">
                      {t.arrematacao} &bull; {t.economia}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION
         ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between hover:bg-slate-800/50 transition"
              >
                <span>{faq.pergunta}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Sales Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 sm:p-4 no-print shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="GDL Leilões"
              className="w-8 h-8 object-contain hidden sm:block"
            />
            <div>
              <span className="text-xs font-bold text-white block">
                O Guia Definitivo dos Leilões (Edição 2026)
              </span>
              <span className="text-[11px] text-amber-400">
                De <span className="line-through text-slate-400">R$ 97,00</span> por apenas{' '}
                <strong>R$ 37,90</strong> (60% OFF)
              </span>
            </div>
          </div>
          <button
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
          >
            <span>Comprar Agora</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
