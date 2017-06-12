module.exports = {
  "env": {
    es6: true,
    browser: true
  },
  "parser": "babel-eslint",
  "extends": 'airbnb',
  "plugins": [
    "react"
  ],
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
     // Look into this - forbidding object & array could be useful, but
     // it leads to repetitions of object shapes for props passed through
     // several components
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [2, { "extensions": [".js"] }],
    'react/jsx-no-bind': [
      2,
      {
        allowArrowFunctions : false,
        allowBind: false,
        ignoreRefs: false,
      }
    ],
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        'render'
      ]
    }],
    'jsx-a11y/accessible-emoji': 0,
    semi: [2, 'never']
  }
};
