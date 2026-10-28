import React, { useState } from 'react';
import {
  inspectAuctionUrl,
  WebsiteSecurityReport,
  extractDomain,
} from '../utils/antifraud';
import {
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Globe,
  Sparkles,
  Lock,
  RotateCcw,
  Info,
} from 'lucide-react';

const JUNTAS_COMERCIAIS = [
  { uf: 'SP', nome: 'JUCESP (São Paulo)', url: 'https://www.institucional.jucespspgov.br/leiloeiros.html' },
  { uf: 'RJ', nome: 'JUCERJA (Rio de Janeiro)', url: 'https://www.jucerja.rj.gov.br/Servicos/Leiloeiros' },
  { uf: 'MG', nome: 'JUCEMG (Minas Gerais)', url: 'https://www.jucemg.mg.gov.br' },
  { uf: 'RS', nome: 'JUCISRS (Rio Grande do Sul)', url: 'https://jucisrs.rs.gov.br/leiloeiros' },
  { uf: 'PR', nome: 'JUCEPAR (Paraná)', url: 'https://www.jucepar.pr.gov.br' },
  { uf: 'GO', nome: 'JUCEG (Goiás)', url: 'https://www.juceg.go.gov.br' },
  { uf: 'Registro.br', nome: 'Whois Oficial (Consulta de Domínio)', url: 'https://registro.br/tecnologia/ferramentas/whois/' },
];

const EXEMPLOS_PRONTOS = [
  { rotulo: 'Superbid (Homologado)', url: 'superbid.net', tipo: 'seguro' },
  { rotulo: 'Receita Federal (Oficial)', url: 'cav.receita.fazenda.gov.br', tipo: 'seguro' },
  { rotulo: 'Zukerman Leilões', url: 'zukerman.com.br', tipo: 'seguro' },
  { rotulo: 'Golpe Detran (.xyz)', url: 'leilao-detran-recuperados.xyz', tipo: 'golpe' },
  { rotulo: 'Golpe Caixa (.top)', url: 'caixa-imoveis-leiloes.top', tipo: 'golpe' },
];

export const FraudScanner: React.FC = () => {
  const [siteInput, setSiteInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [report, setReport] = useState<WebsiteSecurityReport | null>(() => {
    // Inicia com um exemplo demonstrativo de leiloeiro seguro
    return inspectAuctionUrl('zukerman.com.br');
  });

  const handleSearch = (overrideUrl?: string) => {
    const urlToTest = (overrideUrl ?? siteInput).trim();
    if (!urlToTest) return;

    if (overrideUrl) {
      setSiteInput(overrideUrl);
    }

    setIsScanning(true);
    // Simula análise em tempo real com resposta ágil
    setTimeout(() => {
      const result = inspectAuctionUrl(urlToTest);
      setReport(result);
      setIsScanning(false);
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSiteInput('');
    setReport(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Módulo 4: Scanner Antigolpe Instantâneo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Detector de Sites de Leilão: Seguro ou Golpe?
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            Mais de 5.000 sites falsos de leilão são criados todos os meses no Brasil. 
            Cole o link ou nome do site abaixo e clique em <strong>Buscar</strong> para descobrir 
            se o portal é homologado ou uma página pirata.
          </p>
        </div>
      </div>

      {/* Caixa Única de Busca / Input do Site */}
      <div className="bg-white border-2 border-slate-200 hover:border-amber-400/60 focus-within:border-amber-500 rounded-2xl p-4 sm:p-6 shadow-md transition mb-8">
        <label className="block text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-600" />
          <span>Cole ou digite o site do leilão que deseja consultar:</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={siteInput}
              onChange={(e) => setSiteInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: superbid.net, leilao-detran.xyz, zukerman.com.br..."
              className="w-full pl-11 pr-10 py-3.5 text-sm sm:text-base font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 placeholder:text-slate-400 transition"
            />
            <Globe className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {siteInput && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs"
                title="Limpar campo"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={!siteInput.trim() || isScanning}
            className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {isScanning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-slate-950" />
                <span>Buscar &amp; Verificar</span>
              </>
            )}
          </button>
        </div>

        {/* Sugestões rápidas de teste para um clique */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Exemplos para testar:
          </span>
          {EXEMPLOS_PRONTOS.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSearch(ex.url)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer flex items-center gap-1 ${
                ex.tipo === 'seguro'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${ex.tipo === 'seguro' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {ex.rotulo}
            </button>
          ))}
        </div>
      </div>

      {/* Resultado da Análise */}
      {isScanning && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-white shadow-lg animate-pulse mb-8">
          <RotateCcw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
          <h3 className="text-lg font-bold">Examinando o domínio no radar antigolpe...</h3>
          <p className="text-xs text-slate-400 mt-1">
            Consultando banco de dados de leiloeiros homologados, TLDs internacionais e detecção de spoofing.
          </p>
        </div>
      )}

      {!isScanning && report && (
        <div className="space-y-6 mb-8 animate-fadeIn">
          {/* Card de Veredito Principal */}
          <div
            className={`rounded-2xl p-6 sm:p-7 border-2 shadow-lg ${
              report.riskLevel === 'SEGURO'
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : report.riskLevel === 'GOLPE_CONFIRMADO'
                ? 'bg-red-950/40 border-red-500/80 text-white'
                : 'bg-amber-950/40 border-amber-500/80 text-white'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    report.riskLevel === 'SEGURO'
                      ? 'bg-emerald-500 text-slate-950'
                      : report.riskLevel === 'GOLPE_CONFIRMADO'
                      ? 'bg-red-500 text-white'
                      : 'bg-amber-500 text-slate-950'
                  }`}
                >
                  {report.riskLevel === 'SEGURO' ? (
                    <ShieldCheck className="w-7 h-7" />
                  ) : report.riskLevel === 'GOLPE_CONFIRMADO' ? (
                    <AlertOctagon className="w-7 h-7" />
                  ) : (
                    <AlertTriangle className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1 ${
                      report.riskLevel === 'SEGURO'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : report.riskLevel === 'GOLPE_CONFIRMADO'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {report.badgeText}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{report.title}</h3>
                </div>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end justify-between">
                <span className="text-xs text-slate-400 font-mono">Domínio Analisado:</span>
                <span className="text-sm sm:text-base font-bold font-mono text-amber-400">
                  {report.cleanDomain}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  Pontuação de Confiabilidade:{' '}
                  <strong className={report.score >= 80 ? 'text-emerald-400' : 'text-red-400'}>
                    {report.score}/100
                  </strong>
                </span>
              </div>
            </div>

            {/* Sumário do Diagnóstico */}
            <p className="text-sm text-slate-200 mt-4 leading-relaxed font-medium">
              {report.summary}
            </p>

            {/* Dados do Leiloeiro se for verificado */}
            {report.officialData && (
              <div className="mt-4 p-3.5 bg-white/10 rounded-xl border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Matrícula Oficial:</span>
                  <strong className="text-white text-sm">{report.officialData.registry}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Abrangência:</span>
                  <strong className="text-white text-sm">{report.officialData.location}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Classificação:</span>
                  <strong className="text-emerald-400 text-sm capitalize">
                    {report.officialData.type.replace('_', ' ')}
                  </strong>
                </div>
              </div>
            )}

            {/* Alertas Críticos se for golpe */}
            {report.criticalFlags.length > 0 && (
              <div className="mt-4 space-y-2">
                {report.criticalFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-xs sm:text-sm text-red-200 flex items-start gap-2.5 font-medium"
                  >
                    <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Os 4 Pilares de Segurança Analisados */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Diagnóstico Detalhado das 4 Regras de Ouro:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    chk.status === 'pass'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : chk.status === 'fail'
                      ? 'bg-red-50/70 border-red-200 text-red-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {chk.status === 'pass' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : chk.status === 'fail' ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs">{chk.label}</h5>
                    <p className="text-[11px] mt-0.5 opacity-90 leading-relaxed">{chk.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recomendações e Próximos Passos */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h5 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-600" />
                <span>O que fazer agora:</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Links Oficiais para Consulta nas Juntas Comerciais */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Consultar Matrícula Direto na Junta Comercial Oficial</span>
          </h4>
          <span className="text-[11px] text-slate-400">Gratuito e Público</span>
        </div>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Para ter 100% de certeza sobre qualquer leilão privado no Brasil, consulte o nome e a matrícula 
          do leiloeiro na Junta Comercial do estado onde o lote está sendo leiloado:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {JUNTAS_COMERCIAIS.map((jc, idx) => (
            <a
              key={idx}
              href={jc.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 hover:border-amber-500/50 border border-slate-700 text-slate-200 hover:text-white transition group"
            >
              <span className="font-semibold">{jc.nome}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 shrink-0 ml-1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
