const { PRESETS, MODES, PROCESS_DIRECTORIES, RECURSION_MODE } = require('./consts');

const parseArgs = () => {
    const [presetName, replaceMode, directoriesMode, recursiveMode, ...rawFiles] = process.argv.slice(2);

    if (!presetName || !Object.keys(PRESETS).includes(presetName)) {
        const HELP_MESSAGE = `This is an utility for cropping left/right part of the wide images.
You can drop your images on the bat file in the directory root.
For more info please check 'readme.md'

You can create a bat file in the project root with the following contents:

@echo off

@REM 1. node app_folder/index.js - starts the app
@REM 2. [preset] - ${Object.keys(PRESETS).join(' or ')}
@REM 3. [image replace mode] - ${Object.keys(MODES).join(' or ')}
@REM 4. [directory parse mode] - ${Object.keys(PROCESS_DIRECTORIES).join(' or ')}
@REM 5. [recursive] - ${Object.keys(RECURSION_MODE).join(' or ')}
@REM 6. [dropped files] - any files you dropped on the bat. They will appear when you drop them. Should be folders, png or jpg images

node "%~dp0index.js" CROP_HD_LEFT safe imageOnly notRecursive %*

pause
.
    `;
        console.log(HELP_MESSAGE);
        process.exit();
    }

    if (!replaceMode || !Object.keys(MODES).includes(replaceMode)) {
        const MODE_MESSAGE = `No image replace mode mode detected.
Replace mode should be the [3] argument in the bat file.
node "%~dp0index.js" [preset] [IMAGE REPLACE MODE] [directory parse mode] [recursive] %*

Allowed values: ${Object.keys(MODES)}

Example.bat:
node "%~dp0index.js" CROP_HD_LEFT safe imageOnly notRecursive %*
    `;

        console.log(MODE_MESSAGE);
        process.exit();
    }

    if (!directoriesMode || !Object.keys(PROCESS_DIRECTORIES).includes(directoriesMode)) {
        const MODE_MESSAGE = `No directory parse mode mode detected.
Replace mode should be the [4] argument in the bat file.
node "%~dp0index.js" [preset] [image replace mode] [DIRECTORY PARSE MODE] [recursive] %*

Allowed values: ${Object.keys(PROCESS_DIRECTORIES)}

Example.bat:
node "%~dp0index.js" CROP_HD_LEFT safe imageOnly notRecursive %*
    `;

        console.log(MODE_MESSAGE);
        process.exit();
    }

    if (!recursiveMode || !Object.keys(RECURSION_MODE).includes(recursiveMode)) {
        const MODE_MESSAGE = `No recursive mode detected.
Replace mode should be the [5] argument in the bat file.
node "%~dp0index.js" [preset] [image replace mode] [directory parse mode] [RECURSIVE] %*

Allowed values: ${Object.keys(RECURSION_MODE)}

Example.bat:
node "%~dp0index.js" CROP_HD_LEFT safe imageOnly notRecursive %*
    `;

        console.log(MODE_MESSAGE);
        process.exit();
    }

    if (!rawFiles.length) {
        const FILE_MESSAGE = `No processable files detected.
You can drag and drop png or jpg images or directories on the bat file for cropping them.
`;

        console.log(FILE_MESSAGE);
        process.exit();
    }

    return [
        PRESETS[presetName],
        MODES[replaceMode],
        PROCESS_DIRECTORIES[directoriesMode],
        RECURSION_MODE[recursiveMode],
        rawFiles,
    ];
};

module.exports = { parseArgs };
