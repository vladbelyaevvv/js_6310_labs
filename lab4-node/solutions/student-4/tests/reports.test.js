import { saveReport, getLastReports, resolveReportById } from '../src/bot/repo/reports.js';

describe('reports repo', () => {
  test('saveReport & getLastReports work', () => {
    const chat = 1111;
    saveReport(chat, { id: 'a1', type: 'водоснабжение', address: 'ул. Тест 1', status: 'sent' });
    saveReport(chat, { id: 'a2', type: 'отопление', address: 'ул. Тест 2', status: 'sent' });

    const last1 = getLastReports(chat, 1);
    expect(last1).toHaveLength(1);
    expect(last1[0].id).toBe('a2');

    const last2 = getLastReports(chat, 5);
    expect(last2.map(r => r.id)).toEqual(['a1', 'a2']);
  });

  test('resolveReportById updates status and measures', () => {
    const chat = 2222;
    saveReport(chat, { id: 'z9', type: 'электроснабжение', address: 'ул. Тест 3', status: 'sent' });

    const res = resolveReportById('z9', 'Бригада выехала');
    expect(res.ok).toBe(true);
    expect(res.report.status).toBe('resolved');
    expect(res.report.measures).toBe('Бригада выехала');

    const notFound = resolveReportById('nope', '—');
    expect(notFound.ok).toBe(false);
  });
});
