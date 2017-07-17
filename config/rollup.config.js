const node = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const pkg = require('../package');

export default {
	sourceMap: true,
	useStrict: false,
	entry: 'src/index.js',
	exports: 'default',
	plugins: [
		node({ jsnext:true }),
		buble({ objectAssign:'assign' })
	],
	targets: [
		{ dest:pkg.main, format:'umd', moduleName:pkg.amdName },
		{ dest:pkg.module, format:'es' }
	]
};
