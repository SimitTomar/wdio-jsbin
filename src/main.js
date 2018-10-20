const report = require('./report');

let logContainer = [];

const captureLogs = async ({ browser }) => {
  const logs = await browser.log('browser');
  logContainer.push(logs);
  return logs
};

const filterLogs = (unfilteredLogs, ignoreLogs) => {
  return report.getfilteredLogs(unfilteredLogs, ignoreLogs);
};


const writeLogs = async ({reportPath, ignoreLogs}) => {
  report.writeLogsInJson({ logContainer, reportPath, ignoreLogs });
};



module.exports = {
  captureLogs,
  filterLogs,
  writeLogs
};
