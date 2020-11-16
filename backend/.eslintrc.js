module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'prettier/prettier': 'error',
        error: {
            argsIgnorePattern: '_',
        },
    },
    plugins: ['prettier'],
};
