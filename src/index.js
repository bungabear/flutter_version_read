const core = require("@actions/core");
const fs = require('fs');

const file = core.getInput("file", {required: false, });

fs.readFile(
    file,
    'utf8',
    (err, data) => {
        if (err) {
            throw err;
        }

        const version = [...data.matchAll(/version:[\s](.*)/g)]?.[0]?.[1];
        core.info(`Detected string ${version}`);
        const s = version.split('+');
        const buildNumber = s.slice(1).join('+');
        const versionNumber = s[0];
        core.info(`VerisonNumber: ${versionNumber}, BuildNumber : ${buildNumber}`);
        const s2 = versionNumber.split('.');
        const major = s2[0];
        const minor = s2[1];
        const patch = s2[2];
        core.info(`Major: ${major}, Minor: ${minor}, Patch: ${patch}`);
        core.setOutput('version_number', versionNumber);
        core.setOutput('version_number_major', major);
        core.setOutput('version_number_minor', minor);
        core.setOutput('version_number_patch', patch);
        core.setOutput('build_number', buildNumber);
    }
);
