import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const babelRegular = {
    plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
};

const babelWithTransform = {
    runtimeHelpers: true,
    plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        '@babel/plugin-transform-runtime',
    ],
};

export default [
    // CommonJS
    {
        input: 'src/index.js',
        output: { file: 'lib/mindsdb-sdk.js', format: 'cjs', indent: false },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [babel(babelWithTransform)],
    },

    // ES
    {
        input: 'src/index.js',
        output: { file: 'es/mindsdb-sdk.js', format: 'es', indent: false },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [babel(babelRegular)],
    },

    // ES for Browsers
    {
        input: 'src/index.js',
        output: { file: 'es/mindsdb-sdk.mjs', format: 'es', indent: false },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            nodeResolve({
                mainFields: ['module', 'main'],
                browser: true,
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false,
                },
            }),
            babel(babelRegular),
        ],
    },

    // UMD Development
    {
        input: 'src/index.js',
        output: {
            file: 'dist/mindsdb-sdk.js',
            format: 'umd',
            name: 'MindsDB-sdk',
            indent: false,
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
            nodeResolve({
                mainFields: ['module', 'main'],
                browser: true,
            }),
            babel(babelWithTransform),
            commonjs(),
        ],
    },

    // UMD Production
    {
        input: 'src/index.js',
        output: {
            file: 'dist/mindsdb-sdk.min.js',
            format: 'umd',
            name: 'MindsDB',
            indent: false,
        },
        plugins: [
            nodeResolve({
                mainFields: ['module', 'main'],
                browser: true,
            }),
            babel(babelWithTransform),
            commonjs(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false,
                },
            }),
        ],
    },
];
