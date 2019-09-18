// Simply run this file with node:
// $ node compiler-test.js

function removeDataTest(node) {
  console.log('postTransformNode: removeDataTest()', node.tag || node.text);

  if (node.attrs) {
    node.attrs = node.attrs.filter(
      ({ name }) => name !== 'data-test'
    )
  }
  if (Array.isArray(node.children)) {
    node.children.map(removeDataTest)
  }
}


// See instructions:
// https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler
const compiler = require('vue-template-compiler')


// See options:
// https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options
const compilerOptions = {
  outputSourceRange: true,
  // whitespace: 'condense',
  modules: [
    // See object format:
    // https://github.com/vuejs/vue/blob/dev/flow/compiler.js#L47-L59
    { postTransformNode: removeDataTest },
  ],
};

logCompilationResult(`
  <div data-test="parentHook">
    Testing <b data-test="boldFontHook">1, 2</b>
    <input type="email" data-test="userEmailHook" />
  </div>
`, compilerOptions);

logCompilationResult(`
  <div data-test="parentHook">
    Testing <b data-test="boldFontHook">1, 2</b>
    <input type="email" data-test="userEmailHook" />
    {{ myMessage }}
    </div>
`, compilerOptions);

function logCompilationResult(template, compilerOptions) {
  const result = compiler.compile(template, compilerOptions);
  console.log(result);
}
