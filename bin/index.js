#!/usr/bin/env node

const boxen = require('boxen');
const os = require('os');
const { semble } = require('semble');
const execSeries = require('exec-series');
const interfaces = os.networkInterfaces();

const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			const {address, family, internal} = interface;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};


(function charlesHelper() {
  const ip = getNetworkAddress();
  const ssl = 'http://chls.pro/ssl';

  const cmdStr4ip = `echo "${ip}" | curl -F-=\\<- qrenco.de`;
  const cmdStr4ssl = `echo "${ssl}" | curl -F-=\\<- qrenco.de`;

  execSeries([cmdStr4ip, cmdStr4ssl], (err, stdouts) => {
    if (err) {
      const spiritualWords = semble([
        [
          boxen(`${ip}`, { padding: 1, borderColor: 'green', align: 'center' }),
          boxen(`${ssl}`, { padding: 1, borderColor: 'green', align: 'center' }),
        ],
      ]);
      // eslint-disable-next-line no-console
      console.log(spiritualWords);
    }

    const spiritualWords = semble([
      [
        boxen(`${ip}\n\n${stdouts[0]}`, { borderColor: 'green', align: 'center' }),
        boxen(`${ssl}\n\n${stdouts[1]}`, { borderColor: 'green', align: 'center' }),
      ],
    ]);
    // eslint-disable-next-line no-console
    console.log(spiritualWords);
  });
}());
