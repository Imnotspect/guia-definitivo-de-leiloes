import React from 'react';
import { Lock, Sparkles, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface VipLockOverlayProps {
  title?: string;
  description?: string;
  features?: string[];
  onOpenCheckout: () => void;
  onOpenLogin: () => void;
}

export const VipLockOverlay: React.FC<VipLockOverlayProps> = ({
  title = 'Conteúdo Exclusivo para Membros VIP',
  description = 'Você está no Modo Visitante (Vitrine). Para desbloquear este recurso na íntegra, com todos os links, pátios homologados, fórmulas matemáticas completas e o e-book oficial sem travas, torne-se um Membro VIP.',
  features = [
    'Acesso a 100% dos links oficiais de leiloeiros homologados e editais',
    'Download e impressão do Dossiê Completo em formato PDF A4',
    'Calculadora irrestrita com simulações ilimitadas e exportação',
    'Checklist de 8 etapas salvo automaticamente no seu perfil',
  ],
  onOpenCheckout,
  onOpenLogin,
}) => {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-6 sm:p-8 text-center text-white shadow-2xl backdrop-blur-md">
      {/* Decorative background glow */}
      <div className="absolute -top-12 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300 border border-amber-500/40">
          <Lock className="h-3.5 w-3.5 text-amber-400" />
          <span>Área Restrita Pós-Compra</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {description}
        </p>

        {/* Feature bullets */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2 pb-1">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-xl bg-slate-900/80 p-2.5 border border-slate-800 text-xs text-slate-200"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Desbloquear Acesso VIP (R$ 37,90)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="h-4 w-4" />
            <span>Já sou Aluno VIP (Entrar)</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Acesso vitalício imediato &bull; Garantia blindada de 7 dias</span>
        </div>
      </div>
    </div>
  );
};
