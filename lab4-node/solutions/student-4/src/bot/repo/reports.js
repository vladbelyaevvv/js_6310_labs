const reports = new Map();

export function saveReport(chatId, report) {
    if(!reports.has(chatId)) reports.set(chatId, []);
    reports.get(chatId).push(report);
}

export function getLastReports(chatId, limit = 3) {
    const arr = reports.get(chatId) || [];
    return arr.slice(-limit);
}
