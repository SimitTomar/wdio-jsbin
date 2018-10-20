const fs = require('fs');
const path = require('path');
const base = require('base-64');
const enums = require('./enum');
 
let write = true;
 
const encode = (something) => {
  const encodedArray = [];
  try {
    something.forEach(element => {
      delete element.timestamp;
      const stringifyValue = JSON.stringify(element);
      encodedArray.push(base.encode(stringifyValue));
    });
  } catch (error) {
    write = false;
    console.log('[ JSbin ]   No logs found !!!');
  }
  return encodedArray;
};
 
const removeDuplicate = (arr) => {
  let uniqueArray = arr.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });
  return uniqueArray;
};
 
const decode = (encoded) => {
  const decodedArray = [];
  encoded.forEach(element => {
    decodedArray.push(base.decode(element));
  });
  return decodedArray;
};
 
const getfilteredLogs = (unfilteredLogs, ignoreLogs) => {
 
  let logs = unfilteredLogs;
  let levelIgnoredLogs;
  let containIgnoredLogs;
  let equalIgnoredLogs;
 
  //Filter out the Levels
  if(ignoreLogs.hasOwnProperty('withLevel')){
    if (ignoreLogs.withLevel !== ''){
      ignoreLogs.withLevel.forEach(element => {
        levelIgnoredLogs = logs.filter(item => item.level !== element);
        logs = levelIgnoredLogs;
      });
    }
  }
 

  //Filter out the Logs which CONTAIN certain string
  if(ignoreLogs.hasOwnProperty('whichContainMessage')){
    if (ignoreLogs.whichContainMessage !== ''){
      ignoreLogs.whichContainMessage.forEach(element => {
        containIgnoredLogs = logs.filter(item => !item.message.includes(element));
        logs = containIgnoredLogs;
      });
    }
  }
 

  //Filter out the Logs which are EQUAL to a certain string
  if(ignoreLogs.hasOwnProperty('whichEqualMessage')){
    if (ignoreLogs.whichEqualMessage !== ''){
      ignoreLogs.whichEqualMessage.forEach(element => {
        equalIgnoredLogs = logs.filter(item => item.message !== element);
        logs = equalIgnoredLogs;
      });
    }
  }
 
  return logs;
};

const writeLogsInJson = ({ logContainer, reportPath, ignoreLogs }) => {
 
  if(ignoreLogs.hasOwnProperty('withLevel')){
    ignoreLogs.withLevel.forEach((elem) => {
      if (!(elem.toUpperCase() in enums)) {
        console.log('[ JSbin ]   Log level not allowed, possible values are - ERROR, WARNING, DEBUG, INFO');
      }
    });
  }
 

  let filteredLogs = [];
 
  logContainer.forEach((element) => {
 
    filteredLogs = filteredLogs.concat(getfilteredLogs(element.value, ignoreLogs));
 
  })
 
  const encodedLogs = encode(filteredLogs);
  const removedDuplicateLogs = removeDuplicate(encodedLogs);
  const decodedLogs = decode(removedDuplicateLogs);
  const filePath = path.resolve(process.cwd(), reportPath);
 
  try {
    if (write) {
      const time = new Date().toJSON().replace(/:/g, '-');
      fs.writeFileSync(`${filePath}/jsbin-${time}.json`, decodedLogs);
      console.log(`[ JSbin ]   JSbin log file created at ${filePath}/jsbin-${time}.json`);
    }
  } catch (error) {
    console.log('[ JSbin ]   Error creating JSbin log file ...');
    throw error;
  }
};

module.exports = {
  getfilteredLogs,
  writeLogsInJson
};