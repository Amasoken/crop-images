const { createTempFolder, handleCrop } = require('./src/cropImage');
const { parseArgs } = require('./src/parseArgs');
const { MODES, TEMP_FOLDER_PATH } = require('./src/consts');

const [preset, mode, parseDirectories, isRecursive, fileList] = parseArgs();

console.log('Cropping dropped images from coordinates', preset.slice(0, 2), 'until coordinates', preset.slice(2));
if (mode === MODES.safe) console.log('Backups of the cropped images will be stored in', TEMP_FOLDER_PATH);
else console.log('No backup images will be stored');

console.log('\n=====');

const cropImages = async () => {
    createTempFolder();
    let success = 0,
        errors = 0;

    for (const path of fileList) {
        const [successCount, errorCount] = await handleCrop(path, preset, parseDirectories, isRecursive, mode);

        errors += errorCount;
        success += successCount;
    }

    console.log('Cropped', success, 'images');
    if (errors) console.log('Skipped', errors, 'images');
};

cropImages();
