import React, { useState, useEffect } from 'react';
import { CHECKLIST_STEPS, ChecklistStep } from '../data/ebookContent';
import {
  CheckSquare,
  Square,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { VipLockOverlay } from './VipLockOverlay';

const STORAGE_KEY = 'guia_leiloes_checklist_state_v1';

interface InteractiveChecklistProps {
  isVip?: boolean;
  onOpenCheckout?: () => void;
  onOpenLogin?: () => void;
}

export const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  isVip = false,
  onOpenCheckout = () => {},
  onOpenLogin = () => {},
}) => {
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [expandedId, setExpandedId] = useState<number | null>(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Could not save checklist state', e);
    }
  }, [completedIds]);

  const toggleStep = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetAll = () => {
    setCompletedIds([]);
  };

  const visibleSteps = isVip ? CHECKLIST_STEPS : CHECKLIST_STEPS.slice(0, 2);
  const progressPercent = Math.round((completedIds.length / CHECKLIST_STEPS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
          <CheckSquare className="w-3.5 h-3.5" />
          Roteiro Prático: 8 Etapas Críticas
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Checklist Definitivo de Arrematação
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Do primeiro filtro no edital até a emissão da Carta de Arrematação e entrega física das chaves.
          Marque as etapas concluídas e acompanhe seu progresso com salvamento automático.
        </p>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium text-slate-300">Progresso Geral do Processo:</span>
            <span className="font-bold text-amber-400 font-mono">
              {completedIds.length} de {CHECKLIST_STEPS.length} etapas ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Etapas Cronológicas Obrigatórias
        </span>
        <button
          onClick={resetAll}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Desmarcar Todas
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {visibleSteps.map((step) => {
          const isDone = completedIds.includes(step.id);
          const isExpanded = expandedId === step.id;

          return (
            <div
              key={step.id}
              className={`border rounded-xl transition shadow-xs ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-4 sm:p-5 flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className="mt-0.5 shrink-0 focus:outline-none cursor-pointer"
                  aria-label={isDone ? `Desmarcar etapa ${step.id}` : `Marcar etapa ${step.id} como concluída`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-400 hover:text-slate-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Etapa #{step.id} &bull; {step.fase}
                    </span>
                  </div>

                  <h3
                    onClick={() => toggleStep(step.id)}
                    className={`text-sm sm:text-base font-bold cursor-pointer select-none ${
                      isDone ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'
                    }`}
                  >
                    {step.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {step.descricao}
                  </p>

                  {/* Toggle details button */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : step.id)}
                    className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    <span>{isExpanded ? 'Ocultar detalhes e documentos' : 'Ver documento chave e cuidados'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          Documento Chave:
                        </span>
                        <span className="text-slate-700">{step.documentoChave}</span>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                        <span className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Ponto de Atenção Crítico:
                        </span>
                        <span className="text-amber-800">{step.cuidados}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lock Overlay for visitors */}
      {!isVip && (
        <div className="mt-6">
          <VipLockOverlay
            title="Etapas 3 a 8 Bloqueadas no Modo Visitante"
            description="Você está visualizando apenas as etapas iniciais de triagem. Para desbloquear as etapas de lance em auditório virtual, liquidação judicial, baixa de penhoras/bloqueios e emissão da Carta de Arrematação, ative seu acesso VIP."
            features={[
              'Etapa #3: Vistoria física no pátio e teste de motor',
              'Etapa #4: Fixação do teto pela Regra dos 65%',
              'Etapa #5: Habilitação e auditoria do lance ao vivo',
              'Etapas #6 a #8: Despacho judicial, quitação e retirada do bem',
            ]}
            onOpenCheckout={onOpenCheckout}
            onOpenLogin={onOpenLogin}
          />
        </div>
      )}
    </div>
  );
};
