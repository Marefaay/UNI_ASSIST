const path = require('path');

const scanQRCode = async (request, response) => {
  if (request.file) {
    const filePath = path.join(__dirname, '..', '..', '..', 'QRCodes', request.file.filename);

    if (fs.existsSync(filePath)) {
      try {
        const buffer = fs.readFileSync(filePath);
        const image = await jimp.read(buffer);
        const qrcode = new QrCode();

        qrcode.callback = async (err, value) => {
          if (err) {
            console.error(err);
            return response.json({ message: 'Invalid QR Code', error: err });
          } else {
            const resultData = await JSON.parse(value.result);
            console.log(resultData);

            // continue with the rest of the logic
          }
        };

        qrcode.decode(image.bitmap);
        fs.unlinkSync(filePath);
      } catch (error) {
        if (error.code === 'EACCES') {
          return response.json({ message: 'Error accessing QR Code file', error });
        } else {
          console.error(error);
          return response.json({ message: 'Error scanning QR Code', error });
        }
      }
    } else {
      return response.json({ message: 'QR Code file not found' });
    }
  } else {
    return response.json({ message: 'No QR Code to Scan' });
  }
};

module.exports = scanQRCode;
