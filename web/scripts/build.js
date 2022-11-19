console.log(__dirname)
require('esbuild').build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outfile: '../dist/web/out.js',
}).catch(() => process.exit(1))
