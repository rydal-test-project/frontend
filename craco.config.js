const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@validation': resolvePath('./src/validation'),
            '@components': resolvePath('./src/components'),
            '@stores': resolvePath('./src/stores'),
            '@models': resolvePath('./src/models'),
            '@adapters': resolvePath('./src/adapters'),
            '@services': resolvePath('./src/services'),
            '@requests': resolvePath('./src/requests'),
            '@constants': resolvePath('./src/constants'),
            '@debug': resolvePath('./src/debug'),
            '@ui': '@components/ui',
            '@widgets': '@components/widgets'
        }
    },
}