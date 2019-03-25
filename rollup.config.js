export default {
    input: "js/base.js",
    output: [
        {
            file: "dist/js/main.min.js",
            format: "cjs"
        },
        {
            file: "dist/js/main.esm.js",
            format: "esm"
        }
    ]
};
