//@ts-check
import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');
const minify = true;

const success = watch ? 'Watch build succeeded' : 'Build succeeded';

const getTime = function () {
    const date = new Date();
    return `[${`${padZeroes(date.getHours())}:${padZeroes(date.getMinutes())}:${padZeroes(date.getSeconds())}`}] `;
};

const padZeroes = function (i) {
    return i.toString().padStart(2, '0');
};

const plugins = [
    {
        name: 'watch-plugin',
        setup(build) {
            build.onEnd((result) => {
                if (result.errors.length === 0) {
                    console.log(getTime() + success);
                }
            });
        },
    },
];

const ctx = await esbuild.context({
    entryPoints: ['src/main.ts'],
    outdir: 'dist',
    bundle: true,
    target: 'ES2020',
    // VSCode's extension host is still using cjs, so we need to transform the code
    format: 'cjs',
    outExtension: {
        '.js': '.cjs',
    },
    loader: { '.ts': 'ts' },
    platform: 'node',
    sourcemap: !minify,
    minify,
    plugins,
});

if (watch) {
    await ctx.watch();
} else {
    await ctx.rebuild();
    ctx.dispose();
}