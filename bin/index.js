#!/usr/bin/env node

const os = require('os');
const boxen = require('boxen');

const { exec } = require('child_process');
const { semble } = require('semble');
const sslStr = require('../src/sslStr')

const interfaces = os.networkInterfaces();

const QR = "https://qc-az3lrvhte.now.sh/?"

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

  const cmdStr4ip = `echo "${QR}${ip}" | curl -F-=\\<- qrenco.de`;

  exec(cmdStr4ip, (err, stdout) => {
    if (err) {
      const spiritualWords = semble([
        [
          boxen(`${ip}\n\nget QR code error`, { padding: 1, borderColor: 'green', align: 'center' }),
          boxen(`${ssl}\n\n${sslStr}`, { borderColor: 'green', align: 'center' }),
        ],
      ]);
      // eslint-disable-next-line no-console
      console.log(spiritualWords);
      return;
    }

    const spiritualWords = semble([
      [
        boxen(`quickly copy ${ip}\n\n${stdout}`, { borderColor: 'green', align: 'center' }),
        boxen(`${ssl}\n\n${sslStr}`, { borderColor: 'green', align: 'center' }),
      ],
    ]);
    // eslint-disable-next-line no-console
    console.log(spiritualWords);
  });
}());
