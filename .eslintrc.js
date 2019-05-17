module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions:{
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": ["warn", "array"],
    "@typescript-eslint/await-thenable": "warn",
    "@typescript-eslint/camelcase": "warn",
    "@typescript-eslint/class-name-casing": "warn",
    "@typescript-eslint/func-call-spacing": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/indent": ["warn", 2, {
      "VariableDeclarator": {
        "let": 2,
        "var": 2,
        "const": 3,
      },
      "SwitchCase": 1,
      "MemberExpression": 1,
      "FunctionDeclaration": {
        "parameters": "first"
      },
      "FunctionExpression": {
        "parameters": "first"
      },
      "CallExpression": {
        "arguments": "first"
      },
      "ArrayExpression": "first",
      "ObjectExpression": "first",
      "ImportDeclaration": "first",
      "flatTernaryExpressions": true
    }],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        "multiline":{
          "delimiter": "comma",
          "requireLast": true
        },
        "singleline":{
          "delimiter": "comma",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/member-naming": ["error", {
      "private": "^_",
      "protected": "^(?!_)",
      "public": "^(?!_)",
    }],
    "@typescript-eslint/no-angle-bracket-type-assertion": "error",
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-extra-parens": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-object-literal-type-assertion": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/prefer-interface": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/type-annotation-spacing": ["warn", {
      "before": false,
      "after": true
    }]
  }
};
