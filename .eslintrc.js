module.exports = {
    "env": {
        es6: true
    },
    "parser": "babel-eslint",
    "extends": 'airbnb',
    "plugins": [
        "react"
    ],
    rules: {
        'consistent-return': 0,
        'no-console': 0,
        'react/jsx-no-bind': [
          2,
          {
            allowArrowFunctions : false,
            allowBind: false,
            ignoreRefs: false,
          }
        ],
        semi: [2, 'never']
    }
};
