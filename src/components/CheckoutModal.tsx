import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  CreditCard,
  Copy,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { formatBRL } from '../utils/calculator';
import { storage } from '../utils/storage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: (customerData: {
    nome: string;
    email: string;
    whatsapp: string;
    valor: number;
    metodo: 'Mercado Pago Oficial' | 'PIX Instantâneo' | 'Cartão de Crédito';
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onPaymentConfirmed,
}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59
  const [viewState, setViewState] = useState<'options' | 'pix_screen' | 'mp_redirected'>('options');

  const precoOriginal = 97.0;
  const precoFinal = cupomAplicado ? 34.11 : 37.9;
  const mpCheckoutUrl = storage.getMercadoPagoUrl();

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (cupom.trim().toUpperCase() === 'GDL10' || cupom.trim().toUpperCase() === 'LEILAO10') {
      setCupomAplicado(true);
    } else {
      alert('Cupom inválido. Experimente o cupom GDL10.');
    }
  };

  const validateCustomer = () => {
    if (!nome.trim()) {
      alert('Por favor, informe seu nome completo.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Por favor, informe um e-mail válido para receber o acesso.');
      return false;
    }
    return true;
  };

  // Opção A: Pagar via Mercado Pago Oficial
  const handlePayViaMercadoPago = () => {
    if (!validateCustomer()) return;
    window.open(mpCheckoutUrl, '_blank');
    setViewState('mp_redirected');
  };

  // Opção B: Simulação Imediata
  const handleSimulatePayment = (metodo: 'Mercado Pago Oficial' | 'PIX Instantâneo' | 'Cartão de Crédito') => {
    if (!validateCustomer()) return;

    onPaymentConfirmed({
      nome: nome.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      valor: precoFinal,
      metodo,
    });
  };

  const handleCopyPix = () => {
    const fakePixCode =
      '00020126580014BR.GOV.BCB.PIX0136gdl-leiloes-licenciamento@pagamento.oficial520400005303986540537.905802BR5925GDL LEILOES OFICIAL LTDA6009SAO PAULO62070503***6304E8A2';
    navigator.clipboard?.writeText(fakePixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative text-slate-900">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="GDL Leilões"
              className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1 border border-amber-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                  GDL LEILÕES &bull; CHECKOUT OFICIAL
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  Mercado Pago &amp; SSL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acesso Vitalício Imediato ao Guia Completo + Todos os 4 Bônus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offer Timer Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Condição Exclusiva de Lançamento (60% OFF):</span>
          </div>
          <span className="font-mono bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-xs">
            {formatTimer(timeLeft)}
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Product Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                O Guia Definitivo dos Leilões (Edição VIP 2026)
              </h4>
              <p className="text-xs text-slate-500">
                E-book em PDF + Calculadora 65% + Detector Antigolpe + Radar + Checklist
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">
                {formatBRL(precoOriginal)}
              </span>
              <span className="text-xl font-black text-amber-600">
                {formatBRL(precoFinal)}
              </span>
            </div>
          </div>

          {/* Customer identification inputs */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Seu Nome Completo
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Carlos Eduardo Silva"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Seu E-mail (Para Liberação do Acesso)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp (Para Avisos de Editais)
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>
            </div>

            {/* Cupom */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
                placeholder="Cupom de desconto? (Dica: GDL10)"
                className="flex-1 px-3 py-2 text-xs uppercase font-mono border border-slate-300 rounded-lg text-slate-800"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition"
              >
                Aplicar
              </button>
            </div>
            {cupomAplicado && (
              <span className="text-xs text-emerald-600 font-semibold block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cupom GDL10 ativado com sucesso (-10% extra)!
              </span>
            )}
          </div>

          {/* TWO PRIMARY PAYMENT OPTIONS AS REQUESTED */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-black text-slate-800 uppercase tracking-wider">
              Escolha a Forma de Pagamento Desejada:
            </span>

            {/* OPÇÃO A: MERCADO PAGO OFICIAL */}
            <div className="border-2 border-sky-500/80 rounded-2xl p-4 bg-sky-50/50 hover:bg-sky-50 transition shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-xs">
                    MP
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      Opção A: Pagar via Mercado Pago Oficial
                    </h5>
                    <p className="text-[11px] text-slate-600">
                      Checkout com garantia e proteção total ao comprador
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
                  Oficial
                </span>
              </div>

              <p className="text-xs text-slate-600">
                Pague com segurança via PIX com aprovação instantânea, Cartão de Crédito em até 4x ou Boleto no ambiente seguro do Mercado Pago.
              </p>

              <button
                type="button"
                onClick={handlePayViaMercadoPago}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ir para o Checkout Oficial Mercado Pago</span>
              </button>

              {viewState === 'mp_redirected' && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-2 animate-in fade-in">
                  <p className="text-xs text-amber-900 font-medium">
                    A janela do Mercado Pago foi aberta. Assim que finalizar a compra, clique no botão abaixo para definir sua senha VIP:
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('Mercado Pago Oficial')}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Já Concluí no Mercado Pago &bull; Criar Senha VIP</span>
                  </button>
                </div>
              )}
            </div>

            {/* OPÇÃO B: SIMULAÇÃO IMEDIATA (PIX / CARTÃO) PARA HOMOLOGAÇÃO */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/80 hover:bg-slate-50 transition space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      Opção B: Simulação Imediata (PIX / Cartão)
                    </h5>
                    <p className="text-[11px] text-slate-600">
                      Teste ágil de homologação e liberação instantânea
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  1 Clique
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('PIX Instantâneo')}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-800"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simular PIX Aprovado</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('Cartão de Crédito')}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-800"
                >
                  <CreditCard className="w-3.5 h-3.5 text-slate-300" />
                  <span>Simular Cartão Aprovado</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guarantee footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Garantia Incondicional de 7 Dias &bull; Acesso Vitalício Imediato</span>
          </div>
        </div>
      </div>
    </div>
  );
};
