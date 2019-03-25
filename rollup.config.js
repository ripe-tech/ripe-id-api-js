import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default [
    {
        input: "js/base.js",
        output: {
            name: "ripeId",
            file: pkg.browser,
            format: "umd"
        },
        plugins: [resolve(), commonjs()]
    },
    {
        input: "js/base.js",
        external: ["ripe-id"],
        output: [{ file: pkg.main, format: "cjs" }, { file: pkg.module, format: "es" }]
    }
];
