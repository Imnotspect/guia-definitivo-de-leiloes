import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { SalesPage } from './components/SalesPage';
import { EbookReader } from './components/EbookReader';
import { PrintableDocument } from './components/PrintableDocument';
import { CostCalculator } from './components/CostCalculator';
import { FraudScanner } from './components/FraudScanner';
import { AuctionRadar } from './components/AuctionRadar';
import { InteractiveChecklist } from './components/InteractiveChecklist';
import { CheckoutModal } from './components/CheckoutModal';
import { StudentAuthModal } from './components/StudentAuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SupportModal } from './components/SupportModal';
import { AdminDashboard } from './components/AdminDashboard';
import { storage, VipUser } from './utils/storage';
import { ShieldCheck, CheckCircle2, KeyRound, HelpCircle, User } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('vendas');
  const [currentUser, setCurrentUser] = useState<VipUser | null>(() => storage.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => storage.isAdminLoggedIn());

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStudentAuthOpen, setIsStudentAuthOpen] = useState(false);
  const [studentAuthMode, setStudentAuthMode] = useState<'login' | 'register_after_payment'>('login');
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Pending post-payment data
  const [pendingCustomer, setPendingCustomer] = useState<{
    nome: string;
    email: string;
    whatsapp: string;
    valor: number;
    metodo: 'Mercado Pago Oficial' | 'PIX Instantâneo' | 'Cartão de Crédito';
  } | null>(null);

  const isVip = Boolean(currentUser || isAdmin);

  // Route Guard: Visitantes sem login NUNCA têm acesso às páginas internas
  useEffect(() => {
    if (!isVip && activeTab !== 'vendas') {
      setActiveTab('vendas');
    }
  }, [isVip, activeTab]);

  const handlePrint = () => {
    if (!isVip) {
      setIsCheckoutOpen(true);
      return;
    }
    setActiveTab('pdf');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // 1. Recebe confirmação do checkout (Mercado Pago ou Simulação)
  const handlePaymentConfirmed = (data: {
    nome: string;
    email: string;
    whatsapp: string;
    valor: number;
    metodo: 'Mercado Pago Oficial' | 'PIX Instantâneo' | 'Cartão de Crédito';
  }) => {
    // Registra a ordem no banco de dados local (localStorage)
    storage.createOrder({
      clienteNome: data.nome,
      clienteEmail: data.email,
      whatsapp: data.whatsapp,
      valor: data.valor,
      metodo: data.metodo,
    });

    setPendingCustomer(data);
    setIsCheckoutOpen(false);

    // Abre imediatamente a tela "Crie sua Senha VIP" conforme solicitado
    setStudentAuthMode('register_after_payment');
    setIsStudentAuthOpen(true);
  };

  // 2. Conclui o cadastro da Senha VIP e faz login automático
  const handleStudentAuthSuccess = (user: VipUser) => {
    setCurrentUser(user);
    storage.setCurrentUser(user);
    setIsStudentAuthOpen(false);
    setPendingCustomer(null);
    setActiveTab('ebook');
  };

  const handleLogoutUser = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    setActiveTab('vendas');
  };

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    storage.setAdminLoggedIn(true);
    setIsAdminAuthOpen(false);
    setActiveTab('admin');
  };

  const handleLogoutAdmin = () => {
    storage.setAdminLoggedIn(false);
    setIsAdmin(false);
    setActiveTab('vendas');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (!isVip && tab !== 'vendas') {
            setIsCheckoutOpen(true);
            return;
          }
          setActiveTab(tab);
        }}
        onPrintPdf={handlePrint}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenStudentLogin={() => {
          setStudentAuthMode('login');
          setIsStudentAuthOpen(true);
        }}
        onOpenAdminLogin={() => setIsAdminAuthOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onLogoutUser={handleLogoutUser}
      />

      {/* Main Single Page Tab Content */}
      <main className="flex-1">
        {activeTab === 'vendas' && (
          <SalesPage
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onPreviewEbook={() => {
              const el = document.getElementById('conteudo');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setIsCheckoutOpen(true);
              }
            }}
            onOpenCalculator={() => setIsCheckoutOpen(true)}
            onOpenScanner={() => setIsCheckoutOpen(true)}
          />
        )}

        {activeTab === 'ebook' && (
          <div className="bg-slate-100 text-slate-900 min-h-screen">
            <EbookReader
              onOpenCalculator={() => setActiveTab('calculadora')}
              onOpenScanner={() => setActiveTab('antigolpe')}
              onOpenRadar={() => setActiveTab('radar')}
              onOpenChecklist={() => setActiveTab('checklist')}
              isVip={isVip}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onOpenLogin={() => {
                setStudentAuthMode('login');
                setIsStudentAuthOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'pdf' && (
          <PrintableDocument
            onPrint={handlePrint}
            isVip={isVip}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onOpenLogin={() => {
              setStudentAuthMode('login');
              setIsStudentAuthOpen(true);
            }}
          />
        )}

        {activeTab === 'calculadora' && (
          <div className="bg-slate-950 min-h-screen py-4">
            <CostCalculator
              isVip={isVip}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onOpenLogin={() => {
                setStudentAuthMode('login');
                setIsStudentAuthOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'antigolpe' && (
          <div className="bg-slate-950 min-h-screen py-4">
            <FraudScanner />
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="bg-slate-950 min-h-screen py-4">
            <AuctionRadar
              isVip={isVip}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onOpenLogin={() => {
                setStudentAuthMode('login');
                setIsStudentAuthOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="bg-slate-950 min-h-screen py-4">
            <InteractiveChecklist
              isVip={isVip}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onOpenLogin={() => {
                setStudentAuthMode('login');
                setIsStudentAuthOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div className="bg-slate-950 min-h-screen py-4">
            <AdminDashboard
              onExitAdmin={() => setActiveTab('vendas')}
              onLogoutAdmin={handleLogoutAdmin}
            />
          </div>
        )}
      </main>

      {/* Checkout Modal (Mercado Pago + Simulação) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      {/* Portal do Aluno / Criação de Senha VIP Pós-Compra */}
      <StudentAuthModal
        isOpen={isStudentAuthOpen}
        mode={studentAuthMode}
        prefilledName={pendingCustomer?.nome || ''}
        prefilledEmail={pendingCustomer?.email || ''}
        prefilledPhone={pendingCustomer?.whatsapp || ''}
        onClose={() => setIsStudentAuthOpen(false)}
        onSuccess={handleStudentAuthSuccess}
        onOpenCheckout={() => {
          setIsStudentAuthOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Acesso Administrativo Secreto */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      {/* Central de Suporte & Chamados */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        userName={currentUser?.nome || ''}
        userEmail={currentUser?.email || ''}
      />

      {/* Corporate Intelligence Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img
              src="/assets/aistudio/Logo_Mec_nico_6179db67.png"
              alt="GDL Leilões"
              className="w-10 h-10 object-contain rounded-lg bg-slate-900 p-1 border border-amber-500/30"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-white font-black text-sm">
                <span>GDL LEILÕES</span>
                <span className="text-amber-400 font-extrabold">&bull; EDIÇÃO OFICIAL 2026</span>
              </div>
              <p className="text-slate-500 text-[11px] max-w-xl">
                Manual de inteligência financeira e arrematação em conformidade com o Decreto Federal nº 21.981/32, Código de Processo Civil (Lei nº 13.105/15) e normativas da Receita Federal.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            {isVip ? (
              <>
                <button
                  onClick={() => setActiveTab('ebook')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  E-book Completo
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Documento PDF
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => setActiveTab('calculadora')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Calculadora 65%
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => setActiveTab('antigolpe')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Detector Antigolpe
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => setActiveTab('vendas')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Página de Vendas
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('vendas')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Oferta Oficial
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer"
                >
                  Adquirir Guia (R$ 37,90)
                </button>
                <span>&bull;</span>
                <button
                  onClick={() => {
                    setStudentAuthMode('login');
                    setIsStudentAuthOpen(true);
                  }}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Área do Aluno (Entrar)
                </button>
              </>
            )}
            <span>&bull;</span>
            <button
              onClick={() => setIsSupportOpen(true)}
              className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Suporte</span>
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setIsAdminAuthOpen(true)}
              className="hover:text-red-400 transition cursor-pointer flex items-center gap-1 text-slate-500"
              title="Acesso Administrativo Secreto"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 GDL Leilões Oficial. Todos os direitos reservados. CNPJ e registro legal auditados.</span>
          <span className="text-amber-500/80">Ambiente Seguro &bull; Criptografia de 256 bits</span>
        </div>
      </footer>
    </div>
  );
}
