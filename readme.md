# wdio-jsbin

A WebdriverIO utility for **Capturing**, **Filtering** and **Writing** Browser Console Logs

Many a times while interacting with a Web Application, we have seen in the Browser's Console Log, that there are Errors
because of a Broken Javascript or Bad Request or simply a Console Log that was left in the Source Code erroneously.

These types of Errors/Logs are tested manually and often get skipped in the Functional Testing and make their way to Production, hampering the quality of site and posing Security threats thereby.

**wdio-jsbin** provides a solution to test these Logs in an Automated way.

# Installation

```sh
npm install wdio-jsbin
```

# Features


The Module contains the following features:




### CaptureLogs

This feature allows Capturing of Browser Logs


| Parameter | Type   | Details                             |
|-----------|--------|-------------------------------------|
| browser   | Object | WebdriverIO's Global Browser Object |




### FilterLogs


The Module supports 2 ways of Filtering Logs:

1) **Level**: ['SEVERE', 'WARNING', 'INFO', 'DEBUG']
2) **Message**: Through **Contain** and **Equal** Logic


| Parameter  | Type   | Details                                 |
|------------|--------|-----------------------------------------|
| logs       | Object | The Browser's Log Object                |
| ignoreLogs | Object | The Log Object that needs to be ignored |




### WriteLogs


This feature allows writing the Logs into a JSON File


| Parameter  | Type   | Details                                          |
|------------|--------|--------------------------------------------------|
| reportPath | String | Path where the Logs JSON File needs to be stored |
| ignoreLogs | Object | The Log Object that needs to be ignored          |




# Usage:


The Module can be used in the following way:

**Import the Module and initialize the ignoreLogs Object**

```sh
const {captureLogs, writeLogs} = require('wdio-jsbin');
const ignoreLogs = {

      withLevel: ['DEBUG'],
      whichContainMessage: ['String that needs to be ignored, works on Include Logic'],
      whichEqualMessage: ['Exact String that needs to be ignored']
}
```


**Example 1 - Use captureLogs and writeLogs Functions by calling them within WebdriverIO Hooks**


```sh
afterCommand: function () {
      captureLogs({ browser});
},

after: function () {
      writeLogs({ reportPath: 'Path of the Directory', ignoreLogs:ignoreLogs});//In case no filtering is //required, pass the ignoreLogs as an empty object i.e ignoreLogs:{}
}
```


**Example 2: Use captureLogs and filterLogs Functions by calling them from anywhere within the Code**

```sh
const {filterLogs} = require('wdio-jsbin');

async doSomethingFunction() {
      let logs = await captureLogs({browser});
      console.log('filteredLogs', filterLogs(logs.value, ignoreLogs));
}

```

License
----

ISC


**Free Software, Hell Yeah!**

 