import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default [
    {
        input: "js/base.js",
        output: {
            name: "ripeId",
            file: pkg.browser,
            format: "umd",
            exports: "named",
            sourcemap: true
        },
        plugins: [
            resolve({
                browser: true
            }),
            commonjs(),
            babel({
                exclude: "node_modules/**",
                runtimeHelpers: true
            })
        ],
        moduleContext: {
            [require.resolve("node-fetch")]: "window"
        }
    },
    {
        input: "js/base.js",
        external: ["fs", "zlib", "http", "https", "url", "stream"],
        output: [
            {
                file: pkg.main,
                format: "cjs",
                exports: "named",
                sourcemap: true
            },
            {
                file: pkg.module,
                format: "es",
                sourcemap: true
            }
        ],
        plugins: [resolve()]
    }
];
