const node = require('rollup-plugin-node-resolve');
const pkg = require('./package');

module.exports = {
	useStrict: false,
	entry: 'src/index.js',
	exports: 'default',
	plugins: [
		node({ jsnext:true })
	],
	targets: [
		{ dest:pkg.main, format:'cjs' },
		{ dest:pkg.module, format:'es' }
	]
}
