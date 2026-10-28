import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAuctionCosts } from './calculator';

test('calculates correct total costs with 5% commission and auxiliary fees', () => {
  // Simula exemplo do edital: Carro FIPE R$ 50.000, lance R$ 28.000
  const result = calculateAuctionCosts({
    lance: 28000,
    fipeOrMarketValue: 50000,
    taxaPatio: 800,
    debitos: 1200,
    transporteGuincho: 500,
    despachanteCustas: 900,
  });

  // comissao = 5% de 28000 = 1400
  // Custo = 28000 + 1400 + 800 + 1200 + 500 + 900 = 32800
  assert.equal(result.comissaoLeiloeiro, 1400);
  assert.equal(result.custoTotal, 32800);
  assert.equal(result.percentualSobreFipe, 65.6);
  assert.equal(result.economiaBruta, 17200);
});

test('validates Rule of 65%', () => {
  const safeScenario = calculateAuctionCosts({
    lance: 25000,
    fipeOrMarketValue: 50000,
    taxaPatio: 500,
    debitos: 1000,
    transporteGuincho: 400,
    despachanteCustas: 600,
  });
  // comissao = 1250, total = 25000 + 1250 + 500 + 1000 + 400 + 600 = 28750 (57.5% da FIPE)
  assert.equal(safeScenario.dentroRegra65, true);
  assert.equal(safeScenario.status, 'excelente');

  const riskyScenario = calculateAuctionCosts({
    lance: 40000,
    fipeOrMarketValue: 50000,
    taxaPatio: 1000,
  });
  // comissao = 2000, total = 43000 (86% da FIPE)
  assert.equal(riskyScenario.dentroRegra65, false);
  assert.equal(riskyScenario.status, 'arriscado');
});

test('handles zero fipe gracefully', () => {
  const result = calculateAuctionCosts({
    lance: 10000,
    fipeOrMarketValue: 0,
  });
  assert.equal(result.custoTotal, 10500);
  assert.equal(result.percentualSobreFipe, 0);
  assert.equal(result.status, 'atencao');
});
