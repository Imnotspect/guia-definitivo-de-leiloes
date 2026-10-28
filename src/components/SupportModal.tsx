import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Mail, User, HelpCircle } from 'lucide-react';
import { storage } from '../utils/storage';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  userEmail = '',
  userName = '',
}) => {
  const [nome, setNome] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [assunto, setAssunto] = useState('Dúvida sobre Leilões');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  React.useEffect(() => {
    if (userName) setNome(userName);
    if (userEmail) setEmail(userEmail);
  }, [userName, userEmail]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return;

    storage.createMessage({
      nome: nome.trim(),
      email: email.trim(),
      assunto: assunto.trim(),
      mensagem: mensagem.trim(),
    });

    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setMensagem('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden text-white">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Suporte &amp; Ajuda GDL</h3>
              <p className="text-[11px] text-slate-400">Canal direto com a equipe técnica e jurídica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {enviado ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-white">Mensagem Enviada!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Sua dúvida foi registrada na Central Administrativa. Nossa equipe retornará por e-mail em até 2 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Seu Nome
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Seu E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Assunto
                </label>
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white"
                >
                  <option value="Dúvida sobre Leilões">Dúvida sobre Leilões</option>
                  <option value="Dificuldade com Edital">Dificuldade com Leitura de Edital</option>
                  <option value="Suspeita de Golpe">Suspeita de Golpe em Site</option>
                  <option value="Acesso VIP ou Download">Dúvida sobre Acesso VIP / PDF</option>
                  <option value="Outro Assunto">Outro Assunto</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Sua Mensagem
                </label>
                <textarea
                  required
                  rows={3}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Descreva sua dúvida detalhadamente..."
                  className="w-full p-3 text-xs bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar para a Central de Atendimento</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
