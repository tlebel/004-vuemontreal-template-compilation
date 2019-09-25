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

module.exports = {
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(options => {
      // Delete cache options for Demo / Debuggin purpose only
      // otherwise template is cached and not recompiled until we modify it again
      delete options.cacheIdentifier;
      delete options.cacheDirectory;

      if (process.env.NODE_ENV === 'production') {
        // See details here
        // https://vue-loader.vuejs.org/options.html#compileroptions
        if (!Array.isArray(options.compilerOptions.modules)) {
          options.compilerOptions.modules = [];
        }
        // See object format:
        // https://github.com/vuejs/vue/blob/dev/flow/compiler.js#L47-L59
        options.compilerOptions.modules.push({ postTransformNode: removeDataTest });
      }

      console.log('Edited options', {options});

      return options;
    })
  }
}

// Extract from vue-cli generated webpack template
// $ vue inspect
//
// /* config.module.rule('vue') */
// {
//     test: /\.vue$/,
//     use: [
//       /* config.module.rule('vue').use('cache-loader') */
//       {
//         loader: 'cache-loader',
//         options: {
//           cacheDirectory: '/Users/tommy/dev/playground/meetup/vue-template-compilation-tests/node_modules/.cache/vue-loader',
//           cacheIdentifier: '0c49edf2'
//         }
//       },
//       /* config.module.rule('vue').use('vue-loader') */
//       {
// --->    loader: 'vue-loader',
// --->    options: {
// --->      compilerOptions: {
// --->        preserveWhitespace: false
// --->      },
// --->      cacheDirectory: '/Users/tommy/dev/playground/meetup/vue-template-compilation-tests/node_modules/.cache/vue-loader',
// --->      cacheIdentifier: '0c49edf2'
// --->    }
//       }
//     ]
//   },
