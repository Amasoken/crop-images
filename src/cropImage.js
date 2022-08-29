const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const { MODES, TEMP_FOLDER_PATH } = require('./consts');

const createTempFolder = (path = TEMP_FOLDER_PATH) => {
    try {
        fs.accessSync(path, fs.constants.F_OK);
    } catch (error) {
        console.log('Creating temp directory:', path);
        fs.mkdirSync(path);
    }
};

const cropImage = async (file, preset, mode = safe) => {
    const [x, y, width, height] = preset;

    console.log('Cropping file', file);

    return Jimp.read(file)
        .then((image) => {
            const imageWidth = image.getWidth();
            const imageHeight = image.getHeight();

            const xValid = x >= 0 && x <= imageWidth && x + width <= imageWidth;
            const yValid = y >= 0 && y <= imageHeight && y + height <= imageHeight;

            if (!xValid || !yValid) {
                console.log(
                    "Can't crop the image of a size ",
                    [imageWidth, imageHeight],
                    'to the specified coordinates from ',
                    [x, y],
                    'until',
                    [width, height]
                );

                throw new Error('Out of bounds');
            }

            if (mode === MODES.safe) {
                const fileNameSplit = file.split(/\\|\//);
                const fileName = fileNameSplit[fileNameSplit.length - 1];
                const backupName = path.join(TEMP_FOLDER_PATH, Date.now() + '_backup_' + fileName);

                console.log('Moving image to', backupName);
                fs.copyFileSync(file, backupName);
            }

            image.crop(...preset).write(file);
            console.log('\nSuccess.');

            return true;
        })
        .catch((error) => {
            console.log('\nError:', error.message);

            return false;
        })
        .finally(() => {
            console.log('=====');
        });
};

module.exports = { cropImage, createTempFolder };
