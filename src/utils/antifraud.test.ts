import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeAuctionSecurity, inspectAuctionUrl, extractDomain } from './antifraud';

test('extractDomain correctly normalizes full URLs and protocols', () => {
  assert.equal(extractDomain('https://www.zukerman.com.br/lotes/123?page=1'), 'zukerman.com.br');
  assert.equal(extractDomain('http://superbid.net/'), 'superbid.net');
  assert.equal(extractDomain('detran.sp.gov.br'), 'detran.sp.gov.br');
  assert.equal(extractDomain('https://leilao-detran.xyz/contato#topo'), 'leilao-detran.xyz');
});

test('inspectAuctionUrl validates safe official auctioneer', () => {
  const result = inspectAuctionUrl('https://www.superbid.net');
  assert.equal(result.riskLevel, 'SEGURO');
  assert.equal(result.score, 100);
  assert.equal(result.isVerifiedOfficial, true);
  assert.equal(result.officialData?.name, 'Superbid Exchange');
  assert.equal(result.criticalFlags.length, 0);
});

test('inspectAuctionUrl validates authentic government auction portal', () => {
  const result = inspectAuctionUrl('https://cav.receita.fazenda.gov.br/autenticacao');
  assert.equal(result.riskLevel, 'SEGURO');
  assert.equal(result.score, 100);
  assert.equal(result.isVerifiedOfficial, true);
});

test('inspectAuctionUrl flags government spoofing fraud (.xyz mimicking detran)', () => {
  const result = inspectAuctionUrl('https://leilao-detran-recuperados.xyz');
  assert.equal(result.riskLevel, 'GOLPE_CONFIRMADO');
  assert.equal(result.score <= 10, true);
  assert.equal(result.isVerifiedOfficial, false);
  assert.equal(result.criticalFlags.length >= 1, true);
});

test('inspectAuctionUrl flags suspicious scam patterns in domain with hyphens', () => {
  const result = inspectAuctionUrl('patio-recuperados-leiloes.com');
  assert.equal(result.riskLevel, 'GOLPE_CONFIRMADO');
  assert.equal(result.criticalFlags.length >= 1, true);
});

test('inspectAuctionUrl warns on uncataloged .com.br domain', () => {
  const result = inspectAuctionUrl('novoleiloeiro2026.com.br');
  assert.equal(result.riskLevel, 'ALTO_RISCO');
  assert.equal(result.isVerifiedOfficial, false);
});

// Legacy tests compatibility
test('flags PIX to CPF or fake extension as confirmed scam (legacy inputs)', () => {
  const result = analyzeAuctionSecurity({
    urlOrDomain: 'https://leilao-detran-sp.xyz',
    paymentType: 'pix_cpf',
    allowsPhysicalInspection: 'nao',
    juntaComercialVerified: 'nao_verificado',
    whatsappOnlyBidding: true,
  });

  assert.equal(result.riskLevel, 'GOLPE_CONFIRMADO');
  assert.equal(result.criticalAlerts.length >= 3, true);
  assert.equal(result.score < 30, true);
});

test('validates safe official auction setup (legacy inputs)', () => {
  const result = analyzeAuctionSecurity({
    urlOrDomain: 'https://www.zukerman.com.br',
    paymentType: 'conta_oficial_leiloeiro',
    allowsPhysicalInspection: 'sim',
    juntaComercialVerified: 'sim_com_matricula',
    whatsappOnlyBidding: false,
  });

  assert.equal(result.riskLevel, 'SEGURO');
  assert.equal(result.criticalAlerts.length, 0);
  assert.equal(result.score >= 80, true);
});

test('catches DARF payment on official gov.br portal as safe (legacy inputs)', () => {
  const result = analyzeAuctionSecurity({
    urlOrDomain: 'https://cav.receita.fazenda.gov.br',
    paymentType: 'darf_oficial',
    allowsPhysicalInspection: 'sim',
    juntaComercialVerified: 'sim_com_matricula',
    whatsappOnlyBidding: false,
  });

  assert.equal(result.riskLevel, 'SEGURO');
});
