const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@validation': resolvePath('./src/validation'),
            '@components': resolvePath('./src/components'),
            '@ui': '@components/ui',
        }
    },
}