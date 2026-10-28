import React, { useState } from 'react';
import {
  MAIORES_LEILOEIROS,
  CANAIS_ACOMPANHAMENTO,
  AuctioneerInfo,
} from '../data/ebookContent';
import {
  Compass,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  Building,
  Car,
  Laptop,
  CheckCircle,
  BellRing,
} from 'lucide-react';
import { VipLockOverlay } from './VipLockOverlay';

interface AuctionRadarProps {
  isVip?: boolean;
  onOpenCheckout?: () => void;
  onOpenLogin?: () => void;
}

export const AuctionRadar: React.FC<AuctionRadarProps> = ({
  isVip = false,
  onOpenCheckout = () => {},
  onOpenLogin = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'todos' | 'governo' | 'veiculos' | 'imoveis' | 'eletronicos'>('todos');

  const filteredAuctioneers = MAIORES_LEILOEIROS.filter((a) => {
    const matchesSearch =
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.siteOficial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.especialidades.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
      a.estados.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === 'governo') return a.status === 'Governo Oficial';
    if (categoryFilter === 'veiculos') {
      return a.especialidades.some((e) =>
        e.toLowerCase().includes('veículos') ||
        e.toLowerCase().includes('carros') ||
        e.toLowerCase().includes('motos') ||
        e.toLowerCase().includes('frotas')
      );
    }
    if (categoryFilter === 'imoveis') {
      return a.especialidades.some((e) =>
        e.toLowerCase().includes('imóveis') ||
        e.toLowerCase().includes('casas') ||
        e.toLowerCase().includes('apartamentos')
      );
    }
    if (categoryFilter === 'eletronicos') {
      return a.especialidades.some((e) =>
        e.toLowerCase().includes('eletrônicos') ||
        e.toLowerCase().includes('iphones') ||
        e.toLowerCase().includes('notebooks')
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/30">
          <Compass className="w-3.5 h-3.5" />
          Diretório de Segurança Homologado
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Portais Oficiais &amp; Onde Acompanhar os Próximos Leilões
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-3xl">
          Evite cair em armadilhas de motores de busca. Utilize exclusivamente a lista dos leiloeiros homologados
          nas Juntas Comerciais e os canais governamentais oficiais para monitorar novos editais publicados.
        </p>
      </div>

      {/* Seção 1: Onde Acompanhar Leilões que vão acontecer */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Onde Acompanhar Leilões que Vão Acontecer (Canais Oficiais)
            </h3>
            <p className="text-xs text-slate-500">
              Rotina de monitoramento recomendada para encontrar lotes com até 30 dias de antecedência.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANAIS_ACOMPANHAMENTO.map((canal, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-800">
                  <BellRing className="w-4 h-4 text-emerald-600" />
                  <span>Canal #{idx + 1}</span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2 leading-snug">
                  {canal.canal}
                </h4>
                <div className="text-xs text-slate-600 space-y-2 mb-4 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">Como acessar: </strong>
                    {canal.comoAcessar}
                  </p>
                  <p>
                    <strong className="text-slate-800">Frequência: </strong>
                    {canal.frequencia}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2.5 text-[11px] text-emerald-950">
                <strong>Dica prática: </strong>
                {canal.dicaPratica}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção 2: Tabela e Cartões dos Maiores Leiloeiros Oficiais */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Diretório Homologado: Leiloeiros &amp; Órgãos Públicos</span>
            </h3>
            <p className="text-xs text-slate-500">
              Todos os portais listados abaixo possuem credenciamento oficial e histórico idôneo.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por leiloeiro, bem ou estado..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filtrar:
          </span>
          <button
            onClick={() => setCategoryFilter('todos')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              categoryFilter === 'todos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos ({MAIORES_LEILOEIROS.length})
          </button>
          <button
            onClick={() => setCategoryFilter('governo')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              categoryFilter === 'governo'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Governo Federal &amp; Órgãos
          </button>
          <button
            onClick={() => setCategoryFilter('veiculos')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              categoryFilter === 'veiculos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Veículos &amp; Frotas
          </button>
          <button
            onClick={() => setCategoryFilter('imoveis')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              categoryFilter === 'imoveis'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Imóveis &amp; Bancários
          </button>
          <button
            onClick={() => setCategoryFilter('eletronicos')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              categoryFilter === 'eletronicos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Eletrônicos &amp; Alfândega
          </button>
        </div>

        {/* Auctioneers Grid / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {(isVip ? filteredAuctioneers : filteredAuctioneers.slice(0, 3)).map((a, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition bg-slate-50/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded mb-1.5 ${
                        a.status === 'Governo Oficial'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {a.status}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">{a.nome}</h4>
                  </div>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 transition shadow-xs"
                    title={`Visitar portal oficial ${a.siteOficial}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="text-xs text-slate-600 space-y-1 mb-3">
                  <div className="font-mono text-emerald-800 font-medium">{a.siteOficial}</div>
                  <div>
                    <strong className="text-slate-700">Registro: </strong>
                    <span className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">{a.juntaComercial}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Abrangência: </strong>
                    {a.estados}
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.especialidades.map((esp, eIdx) => (
                    <span
                      key={eIdx}
                      className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {esp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                {a.destaque}
              </div>
            </div>
          ))}
        </div>

        {/* Lock Overlay for visitors */}
        {!isVip && (
          <div className="mt-6">
            <VipLockOverlay
              title="Mais de 10 Grandes Leiloeiros Homologados Bloqueados"
              description="No Modo Visitante, apenas os portais governamentais básicos são exibidos. Desbloqueie o acesso VIP para consultar a lista completa dos leiloeiros privados de bancos (Santander, Bradesco, Itaú, BB) com matrícula verificada na Junta Comercial."
              features={[
                'Acesso direto aos portais da Zukerman, Superbid, Freitas e Milan',
                'Matrículas e telefones de auditoria das Juntas Comerciais',
                'Alertas de leilões com até 70% de desconto na FIPE',
                'Canal de atualização contínua de editais bancários',
              ]}
              onOpenCheckout={onOpenCheckout}
              onOpenLogin={onOpenLogin}
            />
          </div>
        )}

        {filteredAuctioneers.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            Nenhum leiloeiro ou órgão oficial encontrado para o termo pesquisado.
          </div>
        )}
      </div>
    </div>
  );
};
