module.exports = {
    "env": {
        es6: true
    },
    "parser": "babel-eslint",
    "extends": 'airbnb',
    "plugins": [
        "standard",
        "react"
    ],
    rules: {
        'consistent-return': 0,
        'no-console': 0,
        semi: [2, 'never']
    }
};
