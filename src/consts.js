const path = require('path');

const PRESETS = {
    // x, y, w, h
    CROP_HD_LEFT: [0, 0, 1920, 1080],
    CROP_HD_RIGHT: [1920, 0, 1920, 1080],
};

const MODES = {
    safe: 'safe',
    unsafe: 'unsafe',
};

const PROCESS_DIRECTORIES = {
    imageOnly: false,
    withDirectories: true,
};

const RECURSION_MODE = {
    recursive: true,
    notRecursive: false,
};

const TEMP_FOLDER_NAME = 'temp';
const TEMP_FOLDER_PATH = path.join(__dirname, '../', TEMP_FOLDER_NAME);

module.exports = { PRESETS, MODES, TEMP_FOLDER_PATH, PROCESS_DIRECTORIES, RECURSION_MODE };
