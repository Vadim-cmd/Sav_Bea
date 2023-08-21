module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    ecmaFeatures: {
        modules: true,
        spread: true,
        restParams: true,
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {},
}
