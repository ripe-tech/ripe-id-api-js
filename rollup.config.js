import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

const banner =
    "/**\n" +
    ` * RIPE ID API (for Javascript) ${pkg.version}.\n` +
    " *\n" +
    ` * Copyright (c) 2014-${new Date().getFullYear()} Platforme International.\n` +
    " *\n" +
    " * This source code is licensed under the Apache 2.0 license found in the\n" +
    " * LICENSE file in the root directory of this source tree.\n" +
    " */";

export default [
    {
        input: "js/base.js",
        external: ["node-fetch"],
        output: {
            name: "ripeId",
            file: pkg.browser,
            banner: banner,
            format: "umd",
            exports: "named",
            compact: true,
            sourcemap: true,
            globals: {
                "node-fetch": "window"
            }
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: "js/base.js",
        external: ["node-fetch"],
        output: [
            {
                file: pkg.main,
                banner: banner,
                format: "cjs",
                exports: "named",
                sourcemap: true
            },
            {
                file: pkg.module,
                banner: banner,
                format: "es",
                sourcemap: true
            }
        ],
        plugins: [resolve()]
    }
];
