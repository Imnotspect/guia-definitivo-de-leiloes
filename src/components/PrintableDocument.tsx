import React from 'react';
import {
  MAIORES_LEILOEIROS,
  CANAIS_ACOMPANHAMENTO,
  CHECKLIST_STEPS,
} from '../data/ebookContent';
import {
  Printer,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Download,
  Building,
  HelpCircle,
} from 'lucide-react';
import { VipLockOverlay } from './VipLockOverlay';

interface PrintableDocumentProps {
  onPrint: () => void;
  isVip?: boolean;
  onOpenCheckout?: () => void;
  onOpenLogin?: () => void;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  onPrint,
  isVip = false,
  onOpenCheckout = () => {},
  onOpenLogin = () => {},
}) => {
  return (
    <div className="bg-slate-100 min-h-screen py-6 sm:py-10">
      {/* Action Bar (Screen Only) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 no-print">
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="GDL Leilões"
              className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1 border border-amber-500/30"
            />
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-0.5">
                <FileText className="w-4 h-4" />
                <span>GDL Leilões &bull; Modo Documento em PDF (Diagramação Editorial)</span>
              </div>
              <h2 className="text-lg font-bold">
                Visualização de Impressão &amp; Exportação Oficial em PDF
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Layout formatado em formato relatório técnico A4. Clique no botão ao lado para imprimir ou salvar como PDF no navegador.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Salvar / Imprimir PDF</span>
            </button>
          </div>
        </div>

        {/* Tip banner */}
        <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-950 p-3 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Dica para exportação perfeita:</strong> Na janela de impressão do seu navegador, escolha <em>"Destino: Salvar como PDF"</em> e marque a opção <em>"Gráficos de segundo plano"</em> para preservar cores e bordas.
            </span>
          </div>
        </div>
      </div>

      {/* Main A4 Document Sheet */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl border border-slate-300 p-8 sm:p-14 print:p-0 print:border-none print:shadow-none print:max-w-none text-slate-900 leading-normal">
        
        {/* =========================================================
            PÁGINA 1: CAPA DO RELATÓRIO CONFIDENCIAL
           ========================================================= */}
        <div className="min-h-[920px] flex flex-col justify-between border-4 border-slate-900 p-8 sm:p-12 mb-12 page-break-after relative bg-white">
          {/* Top Metadata Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
                alt="GDL Leilões"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-black tracking-widest block text-slate-950 uppercase text-sm">
                  GDL LEILÕES &bull; RELATÓRIO DE INTELIGÊNCIA
                </span>
                <span className="text-[10px] text-slate-500">
                  CLASSIFICAÇÃO: COMPRA SEGURA &bull; EDITAL COMPLIANCE
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-slate-950 text-amber-400 font-bold px-2.5 py-1 text-[10px] uppercase tracking-wider rounded border border-amber-500/30">
                DOCUMENTO OFICIAL
              </span>
              <span className="block text-[10px] text-slate-600 mt-1 font-mono">DOC ID: 2026-GDL-LEIL</span>
            </div>
          </div>

          {/* Title Hero */}
          <div className="my-auto py-10 text-center sm:text-left">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-widest rounded mb-6 border border-amber-300">
              Guia Prático Oficial &bull; Portais Homologados &bull; Blindagem Jurídica
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              O GUIA DEFINITIVO DOS LEILÕES
            </h1>

            <h2 className="text-lg sm:text-2xl font-bold text-slate-800 leading-snug mb-6">
              Como Arrematar Carros, Imóveis e Eletrônicos com até 70% de Desconto nos Portais Oficiais (Sem Cair em Golpes)
            </h2>

            <div className="w-24 h-1.5 bg-amber-500 mb-6 sm:mx-0 mx-auto"></div>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Manual confidencial de inteligência financeira desenvolvido pela <strong>GDL Leilões</strong> para o cidadão comum,
              investidor pessoa física e comprador de primeiro leilão. Aprenda a mapear editais da Receita Federal, Caixa Econômica e DETRANs,
              aplicar a matemática do custo real (Regra dos 65%) e neutralizar mais de 5.000 clones falsos.
            </p>
          </div>

          {/* Carimbo de Homologação & Rodapé da Capa */}
          <div className="border-t-2 border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="text-slate-600 text-[11px] space-y-0.5">
              <div><strong>Organização:</strong> GDL Leilões Oficial &bull; Treinamentos &amp; Inteligência</div>
              <div><strong>Fundamento Legal:</strong> Decreto nº 21.981/32, Lei nº 13.105/15 (CPC) e Lei nº 13.160/15</div>
              <div><strong>Ano de Referência:</strong> 2026 &bull; Edição Revisada e Ampliada</div>
            </div>

            {/* Simulated Seal */}
            <div className="border-2 border-dashed border-amber-600 text-amber-900 bg-amber-50/50 px-4 py-2 rounded-lg text-center uppercase font-mono text-[10px] font-bold tracking-widest">
              HOMOLOGADO GDL &bull; AUDITORIA PREVENTIVA
            </div>
          </div>
        </div>

        {/* =========================================================
            PÁGINA 2: INTRODUÇÃO & A GRANDE OPORTUNIDADE
           ========================================================= */}
        <div className="page-break-after mb-12">
          {/* Running Header */}
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
            <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
            <span>CAPÍTULO 00: INTRODUÇÃO</span>
          </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Introdução: O Fim do Mito &amp; A Oportunidade Oculta
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mb-6"></div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            Durante gerações, o leilão no Brasil foi cercado por mitos convenientes para quem já dominava o mercado:
            <em> "leilão só tem sucata"</em>, <em>"imóvel retomado demora 10 anos para entrar"</em> ou <em>"é só para advogados e mafiosos"</em>.
            Enquanto a maioria da população repetia esses preconceitos, uma minoria silenciosa construía patrimônio líquido
            comprando carros seminovos, imóveis e lotes de tecnologia com até 70% de desconto real.
          </p>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-5 my-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Por que os Vendedores Entregam Bens com até 70% Abaixo da FIPE ou Mercado?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O segredo que o investidor experiente compreende é que <strong>bancos, Receita Federal e DETRAN não têm interesse em especular no varejo</strong>.
              Para uma instituição financeira como a Caixa Econômica, um imóvel desocupado é um gerador de despesas contínuas (condomínio, IPTU e exigência de provisão de capital exigida pelo Banco Central).
              Para o DETRAN e a Receita Federal, veículos e eletrônicos parados geram custos astronômicos de diárias de pátio e galpões alfandegados.
              O objetivo deles é apenas recuperar o valor de liquidação rápida. Quem sabe auditar o edital, ganha essa margem.
            </p>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
            As Três Regras Elementares para Não Errar
          </h3>
          <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5 mb-6">
            <li><strong>Desapego Emocional:</strong> Você não está comprando um bem pelo amor estético. Você está comprando uma oportunidade matemática com margem de segurança.</li>
            <li><strong>Auditoria do Edital:</strong> Cada vírgula do edital é soberana. O que não está no edital não existe no mundo dos fatos.</li>
            <li><strong>Blindagem Antifraude:</strong> Jamais efetuar pagamentos via PIX para terceiros ou confiar em anúncios patrocinados de buscadores sem validar a matrícula do leiloeiro na Junta Comercial.</li>
          </ul>
        </div>

        {/* =========================================================
            PÁGINA 3: MÓDULO 1: O MAPA DOS LEILÕES NO BRASIL
           ========================================================= */}
        <div className="page-break-after mb-12">
          {/* Running Header */}
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
            <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
            <span>MÓDULO 01: O MAPA DOS LEILÕES NO BRASIL</span>
          </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Módulo 1: O Mapa dos Leilões no Brasil
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mb-6"></div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            Compreender os quatro ecossistemas oficiais de leilão é o primeiro passo para posicionar seu capital com eficiência:
          </p>

          <div className="space-y-4 my-4">
            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50">
              <h4 className="font-bold text-xs uppercase text-slate-900 mb-1">
                1. Receita Federal do Brasil (e-CAC / SLE)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Apreensões aduaneiras e alfandegárias. Excelente para produtos lacrados, eletrônicos topo de linha (iPhones, MacBooks, iPads, drones), veículos de fronteira e bens importados. Exige conta Gov.br (Prata ou Ouro). Pagamento 100% oficial via DARF emitida no portal cav.receita.fazenda.gov.br.
              </p>
            </div>

            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50">
              <h4 className="font-bold text-xs uppercase text-slate-900 mb-1">
                2. Bancos Públicos e Privados (Destaque Caixa Econômica)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Retomada de financiamentos imobiliários. A Caixa Econômica Federal oferece a maior carteira imobiliária do país, com casas e apartamentos com até 70% de desconto. As modalidades de <strong>Venda Online</strong> e <strong>Venda Direta Online</strong> permitem arrematar sem concorrência ao pagar o valor mínimo de tabela estipulado.
              </p>
            </div>

            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50">
              <h4 className="font-bold text-xs uppercase text-slate-900 mb-1">
                3. DETRANs e Pátios Públicos Municipais
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Veículos recolhidos em blitz ou apreendidos por irregularidades não reclamados após 60 dias. Pela legislação de trânsito, as multas e IPVAs anteriores são desvinculados do prontuário do veículo pela autoridade de trânsito.
              </p>
            </div>

            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50">
              <h4 className="font-bold text-xs uppercase text-slate-900 mb-1">
                4. Leilões Judiciais vs. Extrajudiciais
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Judiciais:</strong> Processos que tramitam em Varas Cíveis, Trabalhistas e Falências. A 2ª praça com desconto de 50% é comum, mas o trâmite até a posse requer expedição da Carta de Arrematação pelo juiz.
                <br /><strong>Extrajudiciais:</strong> Realizados por bancos e financeiras. Processamento célere, emissão de nota em 48h e liberação rápida no pátio.
              </p>
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase text-slate-900 mt-6 mb-2">
            Tabela Sintética dos Principais Leiloeiros Oficiais Homologados
          </h3>
          <table className="min-w-full text-[11px] border border-slate-300 mb-4">
            <thead className="bg-slate-100 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2 border border-slate-300 text-left">Instituição / Leiloeiro</th>
                <th className="p-2 border border-slate-300 text-left">Domínio Oficial</th>
                <th className="p-2 border border-slate-300 text-left">Junta Comercial</th>
                <th className="p-2 border border-slate-300 text-left">Segmento Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MAIORES_LEILOEIROS.slice(0, 6).map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 border border-slate-300 font-bold">{item.nome}</td>
                  <td className="p-2 border border-slate-300 font-mono text-emerald-800 font-semibold">{item.siteOficial}</td>
                  <td className="p-2 border border-slate-300">{item.juntaComercial}</td>
                  <td className="p-2 border border-slate-300">{item.especialidades[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isVip ? (
          <div className="no-print">
            <VipLockOverlay
              title="Páginas 4 a 7 Bloqueadas no Modo Visitante"
              description="Você está no Modo Visitante (Amostra Grátis das 3 primeiras páginas). O restante do dossiê confidencial, contendo a fórmula matemática da Regra dos 65%, o Manual Antigolpe e o Checklist Oficial de 8 etapas, é liberado exclusivamente para alunos cadastrados."
              features={[
                'Página 4: Módulo 2 (Cadastro no e-CAC e 3 Cláusulas Ocultas do Edital)',
                'Página 5: Módulo 3 (Fórmula Matemática Completa do Custo Real)',
                'Página 6: Módulo 4 (Manual Antigolpe e Lista Negra de Fraudes)',
                'Página 7: Checklist Oficial de 8 Etapas para Impressão',
              ]}
              onOpenCheckout={onOpenCheckout}
              onOpenLogin={onOpenLogin}
            />
          </div>
        ) : (
          <>
            {/* =========================================================
                PÁGINA 4: MÓDULO 2: CADASTRO E HABILITAÇÃO & O EDITAL
               ========================================================= */}
            <div className="page-break-after mb-12">
              {/* Running Header */}
              <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
                <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
                <span>MÓDULO 02: CADASTRO, HABILITAÇÃO &amp; EDITAL</span>
              </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Módulo 2: Cadastro, Habilitação &amp; O Segredo do Edital
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mb-6"></div>

          <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">
            1. Procedimento de Habilitação Passo a Passo
          </h3>
          <div className="text-xs text-slate-700 space-y-2 mb-6">
            <p>
              <strong>Passo A (Gov.br):</strong> Para os leilões da Receita Federal, certifique-se de possuir selo Prata ou Ouro. Faça biometria facial no app Gov.br ou login com credenciais de seu banco credenciado.
            </p>
            <p>
              <strong>Passo B (Leiloeiros Privados):</strong> Crie seu cadastro no mínimo 48 horas antes do pregão. Envie RG/CNH legível, comprovante de residência atualizado em seu nome e certidão de casamento (se aplicável).
            </p>
            <p>
              <strong>Passo C (Termo de Adesão):</strong> Aceite eletronicamente as regras de auditório virtual do leilão específico.
            </p>
          </div>

          <div className="border-2 border-slate-900 rounded-lg p-5 bg-slate-50 my-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Os 3 Pontos Críticos do Edital que Ninguém Lê</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              O edital é o contrato supremo. Antes de qualquer lance, busque os 3 tópicos obrigatórios:
            </p>

            <div className="space-y-3 text-xs text-slate-800">
              <div className="p-3 bg-white border border-slate-300 rounded">
                <span className="font-bold text-slate-900 block mb-0.5">1. Prazo Improrrogável de Pagamento:</span>
                Geralmente de 24 horas úteis. O não pagamento gera cancelamento da arrematação, cobrança judicial da comissão de 5%, multa de até 20% e suspensão do CPF para participar de licitações públicas.
              </div>

              <div className="p-3 bg-white border border-slate-300 rounded">
                <span className="font-bold text-slate-900 block mb-0.5">2. Atribuição de Responsabilidade por Débitos:</span>
                Verifique se o edital declara se débitos de IPVA, multas, IPTU ou taxas de condomínio anteriores ao leilão serão quitados pelo comitente vendedor ou se ficarão por conta exclusiva do arrematante.
              </div>

              <div className="p-3 bg-white border border-slate-300 rounded">
                <span className="font-bold text-slate-900 block mb-0.5">3. Prazo de Retirada do Pátio &amp; Diárias Extras:</span>
                Janela comum de 5 a 15 dias úteis. Atrasos na retirada ensejam a cobrança de diárias de armazenagem que variam de R$ 50 a R$ 100 por dia.
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            PÁGINA 5: MÓDULO 3: A MATEMÁTICA DO LANCE
           ========================================================= */}
        <div className="page-break-after mb-12">
          {/* Running Header */}
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
            <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
            <span>MÓDULO 03: A MATEMÁTICA DO LANCE (REGRA DOS 65%)</span>
          </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Módulo 3: A Matemática do Lance &amp; A Regra dos 65%
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mb-6"></div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            O valor anunciado na tela não representa o desembolso final. A fórmula exata aplicada por investidores profissionais é:
          </p>

          <div className="p-4 bg-slate-900 text-white font-mono text-xs rounded-lg my-4 leading-relaxed">
            <strong>CUSTO REAL = Lance + 5% (Comissão Oficial) + Taxa Administrativa do Pátio + Débitos do Edital + Transporte/Guincho + Despachante/Transferência</strong>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-5 my-5">
            <h3 className="text-xs font-bold uppercase text-emerald-950 mb-1">
              O Princípio Prudencial da "Regra dos 65%"
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              O teto máximo da soma de <strong>todas as despesas</strong> jamais deve exceder <strong>65% do valor de mercado ou da Tabela FIPE</strong>.
              Esse intervalo de 35% de margem líquida absorve custos imprevistos (troca de bateria, revisão preventiva, pequenos retoques de pintura) e ainda preserva um retorno financeiro formidável.
            </p>
          </div>

          <h3 className="text-xs font-bold uppercase text-slate-900 mt-6 mb-2">
            Simulação Prática Real: Veículo Tabela FIPE R$ 50.000,00
          </h3>

          <table className="min-w-full text-xs border border-slate-300 font-mono mb-6">
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2 border border-slate-300 font-sans font-bold">Valor de Mercado / Tabela FIPE (100%)</td>
                <td className="p-2 border border-slate-300 font-bold text-right text-slate-900">R$ 50.000,00</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2 border border-slate-300 font-sans">Lance Final Ofertado no Auditório:</td>
                <td className="p-2 border border-slate-300 text-right">R$ 28.000,00</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 font-sans">(+) Comissão de 5% do Leiloeiro Oficial:</td>
                <td className="p-2 border border-slate-300 text-right">R$ 1.400,00</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2 border border-slate-300 font-sans">(+) Taxa Administrativa / Pátio:</td>
                <td className="p-2 border border-slate-300 text-right">R$ 800,00</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 font-sans">(+) Débitos Pendentes do Edital (IPVA/Multas):</td>
                <td className="p-2 border border-slate-300 text-right">R$ 1.200,00</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2 border border-slate-300 font-sans">(+) Transporte em Guincho Plataforma:</td>
                <td className="p-2 border border-slate-300 text-right">R$ 500,00</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-300 font-sans">(+) Despachante, Laudo e Taxas de Transferência:</td>
                <td className="p-2 border border-slate-300 text-right">R$ 900,00</td>
              </tr>
              <tr className="bg-slate-900 text-white font-bold">
                <td className="p-2.5 border border-slate-900 font-sans">CUSTO TOTAL DESEMBOLSADO:</td>
                <td className="p-2.5 border border-slate-900 text-right text-sm">R$ 32.800,00 (65,6% FIPE)</td>
              </tr>
              <tr className="bg-emerald-100 text-emerald-950 font-bold">
                <td className="p-2.5 border border-emerald-300 font-sans">ECONOMIA BRUTA / LUCRO REAL ESTIMADO:</td>
                <td className="p-2.5 border border-emerald-300 text-right text-sm">+ R$ 17.200,00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* =========================================================
            PÁGINA 6: MÓDULO 4: MANUAL ANTIGOLPE
           ========================================================= */}
        <div className="page-break-after mb-12">
          {/* Running Header */}
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
            <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
            <span>MÓDULO 04: MANUAL ANTIGOLPE</span>
          </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Módulo 4: O Manual Antigolpe (Blindagem de Fraudes)
          </h2>
          <div className="w-12 h-1 bg-red-600 mb-6"></div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            Mais de 5.000 sites falsos de leilão são criados todos os meses no Brasil. As quadrilhas utilizam anúncios patrocinados em buscadores e redes sociais para atrair vítimas. Abaixo estão as <strong>4 Regras de Ouro</strong> para imunidade total:
          </p>

          <div className="space-y-3 text-xs text-slate-800 my-4">
            <div className="border border-slate-300 rounded p-3 bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">
                Regra 1: Validação do Leiloeiro na Junta Comercial
              </span>
              Todo leiloeiro oficial no Brasil precisa de matrícula ativa na Junta Comercial de seu estado (JUCESP, JUCERJA, etc.). Acesse o portal oficial da Junta e compare o endereço do site com o registrado oficialmente.
            </div>

            <div className="border border-slate-300 rounded p-3 bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">
                Regra 2: Análise da Extensão do Domínio e Data de Criação
              </span>
              Desconfie de sites terminados em <em>.top, .xyz, .site, .online, .vip</em>. Leiloeiros legais utilizam <strong>.com.br</strong> ou <strong>.gov.br</strong>. Consulte o Whois no Registro.br; domínios criados há poucos dias ou semanas são 100% suspeitos.
            </div>

            <div className="border border-slate-300 rounded p-3 bg-slate-50">
              <span className="font-bold text-slate-900 block mb-1">
                Regra 3: Obrigatoriedade de Visitação Presencial
              </span>
              O Decreto nº 21.981/32 exige a possibilidade de exame dos bens. Se o suposto leilão proibir visitação alegando "reformas", "regras sanitárias" ou "leilão 100% digital", não participe.
            </div>

            <div className="border-2 border-red-600 rounded p-4 bg-red-50 text-red-950">
              <span className="font-black text-red-900 block text-xs uppercase mb-1">
                Regra 4 (Alerta Máximo): Leilão Oficial NUNCA Recebe PIX para CPF
              </span>
              <strong>Atenção Absoluta:</strong> Leilão de verdade NUNCA recebe PIX para conta de pessoa física, chave aleatória ou conta de terceiro em banco digital.
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-800">
                <li><strong>Receita Federal:</strong> Exclusivamente via DARF emitida no e-CAC.</li>
                <li><strong>Judicial:</strong> Exclusivamente via Guia de Depósito Judicial vinculada aos autos do processo.</li>
                <li><strong>Leiloeiro Privado:</strong> TED ou boleto nominal em nome exato do Leiloeiro Oficial com CNPJ/Razão Social idêntica à Junta Comercial.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================================
            PÁGINA 7: ONDE ACOMPANHAR LEILÕES & CHECKLIST FINAL
           ========================================================= */}
        <div className="mb-8">
          {/* Running Header */}
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 border-b border-slate-200 pb-2 mb-6">
            <span>O GUIA DEFINITIVO DOS LEILÕES &bull; RELATÓRIO TÉCNICO</span>
            <span>DIRETÓRIO &amp; CHECKLIST FINAL</span>
          </div>

          <h2 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">
            Onde Acompanhar Leilões &amp; Checklist de Arrematação
          </h2>
          <div className="w-12 h-1 bg-emerald-600 mb-6"></div>

          <h3 className="text-xs font-bold uppercase text-slate-900 mb-2">
            Fontes Primárias para Monitorar Editais que Vão Acontecer
          </h3>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5 mb-6">
            <li><strong>Sistema de Leilão Eletrônico (SLE - Receita Federal):</strong> cav.receita.fazenda.gov.br (editais semanais de mercadorias e veículos apreendidos).</li>
            <li><strong>Portal de Imóveis da Caixa:</strong> venda-imoveis.caixa.gov.br (seções "Venda Online" e "Venda Direta Online").</li>
            <li><strong>Diário Oficial da União (DOU) e Diários Estaduais:</strong> Publicação obrigatória de avisos de leilão com 15 a 30 dias de antecedência.</li>
            <li><strong>Painel de Leilões dos Tribunais de Justiça (TJSP, TJRJ, etc.):</strong> Segundas praças com 50% de redução na avaliação judicial.</li>
            <li><strong>Newsletter Homologada:</strong> Cadastro direto nas plataformas consolidadas (Zukerman, Superbid, Freitas, Milan, Sodré Santoro).</li>
          </ul>

          <h3 className="text-xs font-bold uppercase text-slate-900 mt-6 mb-2">
            Checklist de Campo (8 Etapas Obrigatórias de Arrematação)
          </h3>

          <div className="space-y-2 text-xs border border-slate-300 rounded-lg p-4 bg-slate-50 mb-8">
            {CHECKLIST_STEPS.map((step) => (
              <div key={step.id} className="flex items-start gap-2.5 py-1.5 border-b border-slate-200 last:border-none">
                <span className="w-4 h-4 rounded border-2 border-slate-400 shrink-0 mt-0.5 inline-block"></span>
                <div>
                  <span className="font-bold text-slate-900">
                    Etapa #{step.id}: {step.titulo}
                  </span>
                  <span className="block text-[11px] text-slate-600">{step.descricao}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Document Sign-off */}
          <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>FIM DO RELATÓRIO OFICIAL</span>
            <span>DISTRIBUIÇÃO AUTORIZADA &bull; COMPLIANCE LEGISLATIVO</span>
          </div>
        </div>
          </>
        )}

      </div>
    </div>
  );
};
