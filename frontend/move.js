const shell = require("child_process").execSync;

const src = `./build`;
const dist = `../backend/public`;

shell(`mkdir -p ${dist}`);
shell(`cp -r ${src}/* ${dist}`);
