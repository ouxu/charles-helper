#!/usr/bin/env node

const os = require('os');
const boxen = require('boxen');
const qrcode = require('qrcode-generator');
const { semble } = require('semble');

const interfaces = os.networkInterfaces();

const QR = 'https://qc.now.sh/?';
const QRTypeNumber = 3;

const getNetworkAddress = () => {
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      const { address, family, internal } = interface;
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
};

const createQrcode = (text) => {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
  var qr = qrcode(QRTypeNumber, 'M');
  qr.addData(text, 'Byte');
  qr.make();
  return qr.createASCII();
};

(function charlesHelper() {
  const ip = getNetworkAddress();
  const ssl = 'http://chls.pro/ssl';

  const ipQr = createQrcode(`${QR}${ip}`);
  const sslQr = createQrcode(ssl);

  const spiritualWords = semble([
    [
      boxen(`quickly copy ${ip}\n\n${ipQr}`, { borderColor: 'green', align: 'center' }),
      boxen(`${ssl}\n\n${sslQr}`, { borderColor: 'green', align: 'center' })
    ]
  ]);
  // eslint-disable-next-line no-console
  console.log(spiritualWords);
})();
