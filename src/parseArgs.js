const { PRESETS, MODES } = require('./consts');

const regExp = /.+\.(png|jpg|jpeg)/;

const parseArgs = () => {
    const [presetName, replaceMode, ...rawFiles] = process.argv.slice(2);

    if (!presetName || !Object.keys(PRESETS).includes(presetName)) {
        const HELP_MESSAGE = `This is an utility for cropping left/right part of the wide images.
You can drop your images on the bat file in the directory root.
For more info please check 'readme.md'.
    `;
        console.log(HELP_MESSAGE);
        process.exit();
    }

    if (!replaceMode || !Object.keys(MODES).includes(replaceMode)) {
        const MODE_MESSAGE = `No replace mode detected.
Replace mode should be the second argument in the bat file.
Allowed values: ${Object.values(MODES)}
    `;

        console.log(MODE_MESSAGE);
        process.exit();
    }

    const fileList = rawFiles.filter((file) => regExp.test(file));

    if (!fileList.length) {
        const FILE_MESSAGE = `No processable files detected.
You can drag and drop png or jpg images on the bat file for cropping them.
`;

        console.log(FILE_MESSAGE);
        process.exit();
    }

    return [PRESETS[presetName], MODES[replaceMode], fileList];
};

module.exports = { parseArgs };
