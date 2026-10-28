import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { storage, VipUser } from '../utils/storage';

interface StudentAuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register_after_payment';
  prefilledEmail?: string;
  prefilledName?: string;
  prefilledPhone?: string;
  onClose: () => void;
  onSuccess: (user: VipUser) => void;
  onOpenCheckout?: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  mode: initialMode,
  prefilledEmail = '',
  prefilledName = '',
  prefilledPhone = '',
  onClose,
  onSuccess,
  onOpenCheckout,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(
    initialMode === 'register_after_payment' ? 'register' : 'login'
  );
  const [nome, setNome] = useState(prefilledName || '');
  const [email, setEmail] = useState(prefilledEmail || '');
  const [whatsapp, setWhatsapp] = useState(prefilledPhone || '');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Keep state in sync if props change
  React.useEffect(() => {
    if (initialMode === 'register_after_payment') {
      setMode('register');
      if (prefilledName) setNome(prefilledName);
      if (prefilledEmail) setEmail(prefilledEmail);
      if (prefilledPhone) setWhatsapp(prefilledPhone);
    } else {
      setMode('login');
    }
  }, [initialMode, prefilledName, prefilledEmail, prefilledPhone]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'register') {
      if (!nome.trim() || !email.trim() || !senha.trim()) {
        setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      if (senha.length < 4) {
        setErrorMessage('A senha deve ter pelo menos 4 caracteres.');
        return;
      }
      if (confirmSenha && senha !== confirmSenha) {
        setErrorMessage('As senhas não coincidem. Digite novamente.');
        return;
      }

      const savedUser = storage.saveUser({
        nome: nome.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        senha: senha.trim(),
      });

      storage.setCurrentUser(savedUser);
      setSuccessMessage('🎉 Senha VIP cadastrada com sucesso! Redirecionando...');
      setTimeout(() => {
        onSuccess(savedUser);
      }, 1000);
    } else {
      // Login
      if (!email.trim()) {
        setErrorMessage('Informe o e-mail cadastrado na compra.');
        return;
      }

      const foundUser = storage.authenticateVip(email, senha || undefined);
      if (foundUser) {
        storage.setCurrentUser(foundUser);
        setSuccessMessage(`Bem-vindo de volta, ${foundUser.nome.split(' ')[0]}!`);
        setTimeout(() => {
          onSuccess(foundUser);
        }, 800);
      } else {
        setErrorMessage('E-mail ou senha não encontrados. Verifique se o e-mail é o mesmo da compra.');
      }
    }
  };

  const handleDemoVipLogin = () => {
    const defaultUser = storage.getUsers()[0] || {
      id: 'demo_vip',
      nome: 'Aluno VIP Demonstração',
      email: 'aluno.vip@gdlleiloes.com.br',
      dataCadastro: '2026-10-28',
      status: 'Ativo',
      plano: 'VIP Vitalício',
    };
    storage.setCurrentUser(defaultUser);
    onSuccess(defaultUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden text-white">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-950 border border-amber-500/30 p-1 flex items-center justify-center">
              <img
                src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
                alt="Logo GDL"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">
                  {mode === 'register' ? 'Crie sua Senha VIP' : 'Portal do Aluno VIP'}
                </h3>
                <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {mode === 'register' ? 'Pós-Compra' : 'Área Restrita'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {mode === 'register'
                  ? 'Defina sua senha para acessar sempre que quiser'
                  : 'Digite seus dados de compra para entrar'}
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

        {/* Content */}
        <div className="p-6 relative z-10 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Seu Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Carlos Eduardo Silva"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  WhatsApp (Para alertas de editais)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                {mode === 'register' ? 'Crie sua Senha VIP' : 'Senha de Acesso'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder={mode === 'register' ? 'Mínimo 4 caracteres' : 'Sua senha'}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Confirme a Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    placeholder="Repita a senha criada"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{mode === 'register' ? 'Salvar Senha & Acessar VIP' : 'Entrar na Área VIP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Option for testing */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-center">
            <button
              type="button"
              onClick={handleDemoVipLogin}
              className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 text-xs font-bold transition border border-slate-700/80 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simular Teste: Entrar com Conta VIP Pré-Aprovada</span>
            </button>

            {mode === 'login' ? (
              <p className="text-xs text-slate-400">
                Ainda não adquiriu o guia?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCheckout?.();
                  }}
                  className="text-amber-400 hover:underline font-bold"
                >
                  Adquirir por R$ 37,90
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Já possui cadastro?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-amber-400 hover:underline font-bold"
                >
                  Fazer login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
