import React from 'react';
import {
  BookOpen,
  Printer,
  Calculator,
  ShieldCheck,
  Compass,
  CheckSquare,
  FileText,
  ShoppingBag,
  Sparkles,
  User,
  LogOut,
  ShieldAlert,
  HelpCircle,
  KeyRound,
  Lock,
} from 'lucide-react';
import { VipUser } from '../utils/storage';

export type ActiveTab =
  | 'vendas'
  | 'ebook'
  | 'pdf'
  | 'calculadora'
  | 'antigolpe'
  | 'radar'
  | 'checklist'
  | 'admin';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onPrintPdf: () => void;
  onOpenCheckout: () => void;
  onOpenStudentLogin: () => void;
  onOpenAdminLogin: () => void;
  onOpenSupport: () => void;
  currentUser: VipUser | null;
  isAdmin: boolean;
  onLogoutUser: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onPrintPdf,
  onOpenCheckout,
  onOpenStudentLogin,
  onOpenAdminLogin,
  onOpenSupport,
  currentUser,
  isAdmin,
  onLogoutUser,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 text-white shadow-xl no-print">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 text-xs py-1 px-4 font-extrabold tracking-wide flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono">
            GDL OFICIAL
          </span>
          <span className="truncate">
            Dossiê de Inteligência Financeira e Compra Segura em Leilões Oficiais
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-950 text-[11px] font-bold">
          {currentUser ? (
            <span className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded-full font-mono text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              VIP: {currentUser.nome.split(' ')[0]} (Acesso Vitalício)
            </span>
          ) : isAdmin ? (
            <span className="bg-red-950 text-red-200 px-2 py-0.5 rounded-full font-mono text-[10px] flex items-center gap-1 border border-red-800">
              <ShieldAlert className="w-3 h-3 text-red-400" />
              Painel Admin Ativo
            </span>
          ) : (
            <span className="hidden sm:inline">Modo Vitrine &bull; Edição 2026</span>
          )}

          <button
            onClick={onOpenSupport}
            className="hover:underline flex items-center gap-1 cursor-pointer font-extrabold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Suporte</span>
          </button>
        </div>
      </div>

      {/* Main Bar with Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div
          onClick={() => onTabChange('vendas')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo uploaded by user */}
          <div className="h-11 w-11 rounded-xl bg-slate-900 border border-amber-500/30 p-1 flex items-center justify-center shadow-md group-hover:border-amber-400 transition">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="Logo GDL Leilões"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>GDL</span>
                <span className="text-amber-400 font-extrabold">LEILÕES</span>
              </span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Até -70% FIPE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              O Guia Definitivo dos Leilões: Carros, Imóveis e Eletrônicos (Sem Cair em Golpes)
            </p>
          </div>
        </div>

        {/* User Status & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
          {(currentUser || isAdmin) && (
            <button
              onClick={onPrintPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Exportar ou Imprimir em Formato PDF A4"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>
          )}

          {currentUser ? (
            /* Logged in VIP Member */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[11px]">
                  {currentUser.nome.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] leading-tight text-white">{currentUser.nome.split(' ')[0]}</div>
                  <div className="text-[9px] text-emerald-400 font-mono">Membro VIP Ativo</div>
                </div>
              </div>

              <button
                onClick={onLogoutUser}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                title="Sair da Conta VIP"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            /* Visitor Mode: Login or Buy button */
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenStudentLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white border border-slate-700 transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Área do Aluno</span>
              </button>

              <button
                onClick={onOpenCheckout}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-black rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Adquirir Guia (R$ 37,90)</span>
              </button>
            </div>
          )}

          {/* Discreet Admin Button */}
          {isAdmin ? (
            <button
              onClick={() => onTabChange('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl border transition ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-red-950/60 text-red-300 border-red-800 hover:bg-red-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition"
              title="Acesso Administrativo Secreto"
            >
              <KeyRound className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation - ONLY visible after purchase or student login */}
      {currentUser || isAdmin ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-900/60">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Navegação GDL VIP">
            <button
              onClick={() => onTabChange('ebook')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'ebook'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>E-Book Completo</span>
            </button>

            <button
              onClick={() => onTabChange('pdf')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documento PDF (A4 Oficial)</span>
            </button>

            <button
              onClick={() => onTabChange('calculadora')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'calculadora'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculadora Custo Real (65%)</span>
            </button>

            <button
              onClick={() => onTabChange('antigolpe')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'antigolpe'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Detector Anti-Golpe</span>
            </button>

            <button
              onClick={() => onTabChange('radar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'radar'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Portais Oficiais &amp; Radar</span>
            </button>

            <button
              onClick={() => onTabChange('checklist')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Checklist 8 Etapas</span>
            </button>

            <button
              onClick={() => onTabChange('vendas')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                activeTab === 'vendas'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Página de Vendas</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => onTabChange('admin')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-red-400 hover:text-white hover:bg-red-950/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Central Admin</span>
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
