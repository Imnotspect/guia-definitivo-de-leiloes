import React, { useState, useEffect } from 'react';
import {
  storage,
  Order,
  VipUser,
  SupportMessage,
} from '../utils/storage';
import { formatBRL } from '../utils/calculator';
import {
  ShieldAlert,
  DollarSign,
  ShoppingBag,
  Users,
  MessageSquare,
  Search,
  Settings,
  ExternalLink,
  CheckCircle2,
  Clock,
  RotateCcw,
  LogOut,
  Save,
  ArrowLeft,
  Filter,
} from 'lucide-react';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onLogoutAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  onLogoutAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'alunos' | 'mensagens' | 'configuracoes'>('pedidos');
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<VipUser[]>([]);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [mpUrl, setMpUrl] = useState('');
  const [mpSavedFeedback, setMpSavedFeedback] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = () => {
    setOrders(storage.getOrders());
    setUsers(storage.getUsers());
    setMessages(storage.getMessages());
    setMpUrl(storage.getMercadoPagoUrl());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalFaturamento = orders
    .filter((o) => o.status === 'Aprovado')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalPedidosAprovados = orders.filter((o) => o.status === 'Aprovado').length;
  const ticketMedio = totalPedidosAprovados > 0 ? totalFaturamento / totalPedidosAprovados : 37.9;
  const totalAlunos = users.length;
  const mensagensNovas = messages.filter((m) => m.status === 'Novo').length;

  const handleSaveMpUrl = (e: React.FormEvent) => {
    e.preventDefault();
    storage.setMercadoPagoUrl(mpUrl);
    setMpSavedFeedback(true);
    setTimeout(() => setMpSavedFeedback(false), 2500);
  };

  const handleToggleMessageStatus = (id: string) => {
    const updated = storage.toggleMessageStatus(id);
    setMessages([...updated]);
  };

  const handleResetData = () => {
    if (confirm('Deseja restaurar os dados de demonstração da central administrativa?')) {
      storage.resetAll();
      loadData();
    }
  };

  // Filtros de busca
  const filteredOrders = orders.filter(
    (o) =>
      o.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.clienteEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.mensagem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-200">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mb-2 border border-red-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            Central Administrativa Secreta &bull; Acesso Master
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Gestão Operacional</span>
            <span className="text-amber-400 font-mono">GDL Leilões</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Métricas de faturamento em tempo real, pedidos homologados, alunos cadastrados e suporte.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Site</span>
          </button>

          <button
            onClick={onLogoutAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair do Admin</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-400">Faturamento Bruto</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{formatBRL(totalFaturamento)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
            {totalPedidosAprovados} vendas aprovadas
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-400">Pedidos Confirmados</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalPedidosAprovados}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Ticket Médio: <strong className="text-white">{formatBRL(ticketMedio)}</strong>
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-400">Alunos VIP Ativos</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalAlunos}</div>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 block">
            Acesso vitalício liberado
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-400">Mensagens Suporte</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{messages.length}</div>
          <span className="text-[11px] text-purple-400 font-semibold mt-1 block">
            {mensagensNovas} chamados novos
          </span>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'pedidos'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos &amp; Vendas ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('alunos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'alunos'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Alunos VIP ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('mensagens')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'mensagens'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Suporte ({messages.length})</span>
              {mensagensNovas > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {mensagensNovas}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'configuracoes'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Mercado Pago &amp; Config</span>
            </button>
          </div>

          {activeTab !== 'configuracoes' && (
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por nome ou e-mail..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-amber-500"
              />
            </div>
          )}
        </div>

        {/* TAB 1: PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div className="pt-6 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">ID Pedido</th>
                  <th className="py-3 px-4">Cliente / E-mail</th>
                  <th className="py-3 px-4">WhatsApp</th>
                  <th className="py-3 px-4">Valor</th>
                  <th className="py-3 px-4">Método</th>
                  <th className="py-3 px-4">Data / Hora</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">
                      Nenhum pedido encontrado para o termo pesquisado.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">{ord.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{ord.clienteNome}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{ord.clienteEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">
                        {ord.whatsapp || 'Não informado'}
                      </td>
                      <td className="py-3 px-4 font-black text-white">{formatBRL(ord.valor)}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {ord.metodo}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{ord.data}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" />
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ALUNOS VIP */}
        {activeTab === 'alunos' && (
          <div className="pt-6 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Aluno</th>
                  <th className="py-3 px-4">E-mail Cadastrado</th>
                  <th className="py-3 px-4">WhatsApp</th>
                  <th className="py-3 px-4">Plano</th>
                  <th className="py-3 px-4">Data Inscrição</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">
                      Nenhum aluno encontrado para o filtro.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-mono text-slate-500">{usr.id}</td>
                      <td className="py-3 px-4 font-bold text-white">{usr.nome}</td>
                      <td className="py-3 px-4 font-mono text-amber-300">{usr.email}</td>
                      <td className="py-3 px-4 text-slate-400">{usr.whatsapp || '-'}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          {usr.plano}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{usr.dataCadastro}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" />
                          {usr.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: MENSAGENS DE SUPORTE */}
        {activeTab === 'mensagens' && (
          <div className="pt-6 space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Nenhuma mensagem de suporte recebida.
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-amber-400 text-xs font-bold">{msg.id}</span>
                      <span className="font-bold text-white text-sm">{msg.assunto}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          msg.status === 'Novo'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-mono">{msg.data}</span>
                      <button
                        onClick={() => handleToggleMessageStatus(msg.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700"
                      >
                        Marcar como {msg.status === 'Novo' ? 'Respondido' : 'Novo'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-850 leading-relaxed">
                    "{msg.mensagem}"
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span>
                      Remetente: <strong className="text-white">{msg.nome}</strong>
                    </span>
                    <span>&bull;</span>
                    <span className="font-mono text-amber-400/90">{msg.email}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: MERCADO PAGO & CONFIGURAÇÕES */}
        {activeTab === 'configuracoes' && (
          <div className="pt-6 max-w-2xl space-y-6">
            <form onSubmit={handleSaveMpUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  URL Oficial de Checkout do Mercado Pago
                </label>
                <input
                  type="url"
                  required
                  value={mpUrl}
                  onChange={(e) => setMpUrl(e.target.value)}
                  placeholder="https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Quando o cliente clicar em "Pagar via Mercado Pago Oficial", ele será direcionado para este link seguro.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Link do Mercado Pago</span>
                </button>

                <a
                  href={mpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Testar Link Atual</span>
                </a>
              </div>

              {mpSavedFeedback && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Link oficial do Mercado Pago salvo com sucesso no banco de dados local!</span>
                </div>
              )}
            </form>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Manutenção do Banco de Dados Local
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restaure os pedidos e alunos padrão caso queira reiniciar os dados da demonstração.
              </p>
              <button
                type="button"
                onClick={handleResetData}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar Dados Padrão (Seed)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
