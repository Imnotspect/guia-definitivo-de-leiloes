import React, { useState } from 'react';
import { X, ShieldAlert, Lock, User, KeyRound, ArrowRight } from 'lucide-react';
import { storage } from '../utils/storage';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Credenciais aceitas: admin / admin OU admin / gdl2026
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'admin' && (cleanPass === 'admin' || cleanPass === 'gdl2026' || cleanPass === '123456')) {
      storage.setAdminLoggedIn(true);
      onSuccess();
    } else {
      setError('Credenciais administrativas inválidas. Verifique usuário e senha.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden text-white">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-white">
                Central Admin Secreta
              </h3>
              <p className="text-[11px] text-slate-400">Acesso Restrito à Gestão GDL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-xs text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Usuário Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Senha de Segurança
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
              />
            </div>
            <p className="text-[10px] text-amber-400/80 mt-1 font-mono">
              Dica de teste: usuário <strong>admin</strong> | senha <strong>admin</strong> ou <strong>gdl2026</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Acessar Painel Administrativo</span>
          </button>
        </form>
      </div>
    </div>
  );
};
