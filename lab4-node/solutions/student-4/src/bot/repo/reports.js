const reports = new Map();

export function saveReport(chatId, report) {
    if(!reports.has(chatId)) reports.set(chatId, []);
    reports.get(chatId).push(report);
}

export function getLastReports(chatId, limit = 3) {
    const arr = reports.get(chatId) || [];
    return arr.slice(-limit);
}

// Найти заявку по id и обновить её
export function resolveReportById(id, measures) {
  for (const [chatId, list] of reports.entries()) {
    const r = list.find((it) => it.id === id);
    if (r) {
      r.status = 'resolved';
      r.measures = measures;
      return { ok: true, chatId, report: r };
    }
  }
  return { ok: false };
}
