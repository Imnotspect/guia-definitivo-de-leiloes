export interface VipUser {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  whatsapp?: string;
  dataCadastro: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  plano: 'VIP Vitalício';
}

export interface Order {
  id: string;
  clienteNome: string;
  clienteEmail: string;
  whatsapp?: string;
  valor: number;
  metodo: 'Mercado Pago Oficial' | 'PIX Instantâneo' | 'Cartão de Crédito';
  data: string;
  status: 'Aprovado' | 'Pendente' | 'Reembolsado';
}

export interface SupportMessage {
  id: string;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  data: string;
  status: 'Novo' | 'Respondido';
}

const STORAGE_KEYS = {
  USERS: 'gdl_vip_users_v2',
  ORDERS: 'gdl_orders_v2',
  MESSAGES: 'gdl_support_messages_v2',
  MP_URL: 'gdl_mercadopago_url_v2',
  CURRENT_USER: 'gdl_current_user_v2',
  IS_ADMIN: 'gdl_is_admin_v2',
};

const DEFAULT_MP_URL = 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=gdl-leiloes-oficial-2026';

const DEFAULT_USERS: VipUser[] = [
  {
    id: 'usr_01',
    nome: 'Marcos Vinicius Ribeiro',
    email: 'marcos.ribeiro@email.com',
    whatsapp: '(19) 99872-1201',
    dataCadastro: '2026-10-24 14:32',
    status: 'Ativo',
    plano: 'VIP Vitalício',
  },
  {
    id: 'usr_02',
    nome: 'Camila Nogueira',
    email: 'dra.camila@email.com',
    whatsapp: '(31) 98711-4450',
    dataCadastro: '2026-10-25 18:05',
    status: 'Ativo',
    plano: 'VIP Vitalício',
  },
  {
    id: 'usr_03',
    nome: 'Lucas Ferreira Mendes',
    email: 'lucas.mendes@email.com',
    whatsapp: '(41) 99120-7788',
    dataCadastro: '2026-10-26 09:15',
    status: 'Ativo',
    plano: 'VIP Vitalício',
  },
  {
    id: 'usr_04',
    nome: 'Juliana Castro',
    email: 'juliana.castro@email.com',
    whatsapp: '(11) 97654-3210',
    dataCadastro: '2026-10-27 21:40',
    status: 'Ativo',
    plano: 'VIP Vitalício',
  },
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ORD-8921',
    clienteNome: 'Marcos Vinicius Ribeiro',
    clienteEmail: 'marcos.ribeiro@email.com',
    whatsapp: '(19) 99872-1201',
    valor: 37.9,
    metodo: 'PIX Instantâneo',
    data: '2026-10-24 14:32',
    status: 'Aprovado',
  },
  {
    id: 'ORD-8922',
    clienteNome: 'Camila Nogueira',
    clienteEmail: 'dra.camila@email.com',
    whatsapp: '(31) 98711-4450',
    valor: 37.9,
    metodo: 'Cartão de Crédito',
    data: '2026-10-25 18:05',
    status: 'Aprovado',
  },
  {
    id: 'ORD-8923',
    clienteNome: 'Lucas Ferreira Mendes',
    clienteEmail: 'lucas.mendes@email.com',
    whatsapp: '(41) 99120-7788',
    valor: 34.11,
    metodo: 'Mercado Pago Oficial',
    data: '2026-10-26 09:15',
    status: 'Aprovado',
  },
  {
    id: 'ORD-8924',
    clienteNome: 'Juliana Castro',
    clienteEmail: 'juliana.castro@email.com',
    whatsapp: '(11) 97654-3210',
    valor: 37.9,
    metodo: 'PIX Instantâneo',
    data: '2026-10-27 21:40',
    status: 'Aprovado',
  },
];

const DEFAULT_MESSAGES: SupportMessage[] = [
  {
    id: 'MSG-101',
    nome: 'Rafael Andrade',
    email: 'rafael.andrade@gmail.com',
    assunto: 'Dúvida sobre Leilão da Caixa',
    mensagem: 'Olá, no módulo 1 vocês explicam que a Caixa quita o IPTU e condomínio anterior. Isso vale também para imóveis na modalidade Venda Online?',
    data: '2026-10-27 10:20',
    status: 'Respondido',
  },
  {
    id: 'MSG-102',
    nome: 'Beatriz Martins',
    email: 'beatriz.m@empresa.com.br',
    assunto: 'Acesso VIP Liberado',
    mensagem: 'Fiz a compra pelo PIX e já baixei o PDF. O e-book está excelente! Como faço para participar do grupo de avisos de editais da Receita Federal?',
    data: '2026-10-28 08:12',
    status: 'Novo',
  },
];

export const storage = {
  // Usuários VIP
  getUsers(): VipUser[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_USERS;
    }
  },

  saveUser(user: Omit<VipUser, 'id' | 'dataCadastro' | 'status' | 'plano'>): VipUser {
    const users = this.getUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (existingIndex >= 0) {
      users[existingIndex] = {
        ...users[existingIndex],
        nome: user.nome,
        whatsapp: user.whatsapp || users[existingIndex].whatsapp,
        senha: user.senha || users[existingIndex].senha,
        status: 'Ativo',
      };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return users[existingIndex];
    }

    const newUser: VipUser = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      nome: user.nome,
      email: user.email.toLowerCase(),
      senha: user.senha || 'vip123',
      whatsapp: user.whatsapp || '',
      dataCadastro: formattedDate,
      status: 'Ativo',
      plano: 'VIP Vitalício',
    };

    users.unshift(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  authenticateVip(email: string, senha?: string): VipUser | null {
    const users = this.getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) return null;
    if (senha && found.senha && found.senha !== senha.trim()) {
      return null;
    }
    return found;
  },

  // Pedidos
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
        return DEFAULT_ORDERS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_ORDERS;
    }
  },

  createOrder(order: Omit<Order, 'id' | 'data' | 'status'>): Order {
    const orders = this.getOrders();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      clienteNome: order.clienteNome,
      clienteEmail: order.clienteEmail.toLowerCase(),
      whatsapp: order.whatsapp,
      valor: order.valor,
      metodo: order.metodo,
      data: formattedDate,
      status: 'Aprovado',
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  // Mensagens de Suporte
  getMessages(): SupportMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
        return DEFAULT_MESSAGES;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_MESSAGES;
    }
  },

  createMessage(msg: Omit<SupportMessage, 'id' | 'data' | 'status'>): SupportMessage {
    const messages = this.getMessages();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: SupportMessage = {
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      nome: msg.nome,
      email: msg.email,
      assunto: msg.assunto,
      mensagem: msg.mensagem,
      data: formattedDate,
      status: 'Novo',
    };

    messages.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    return newMsg;
  },

  toggleMessageStatus(id: string): SupportMessage[] {
    const messages = this.getMessages();
    const index = messages.findIndex((m) => m.id === id);
    if (index >= 0) {
      messages[index].status = messages[index].status === 'Novo' ? 'Respondido' : 'Novo';
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
    return messages;
  },

  // Configuração do Mercado Pago
  getMercadoPagoUrl(): string {
    return localStorage.getItem(STORAGE_KEYS.MP_URL) || DEFAULT_MP_URL;
  },

  setMercadoPagoUrl(url: string) {
    localStorage.setItem(STORAGE_KEYS.MP_URL, url.trim() || DEFAULT_MP_URL);
  },

  // Sessão Atual
  getCurrentUser(): VipUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: VipUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
  },

  setAdminLoggedIn(status: boolean) {
    if (status) {
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
    }
  },

  resetAll() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    localStorage.setItem(STORAGE_KEYS.MP_URL, DEFAULT_MP_URL);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
  },
};
