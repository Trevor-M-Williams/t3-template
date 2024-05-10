// /** @type {import("eslint").Linter.Config} */
// const config = {
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "project": true
//   },
//   "plugins": [
//     "@typescript-eslint",
//     "drizzle"
//   ],
//   "extends": [
//     "next/core-web-vitals",
//     "plugin:@typescript-eslint/recommended-type-checked",
//     "plugin:@typescript-eslint/stylistic-type-checked"
//   ],
//   "rules": {
//     "@typescript-eslint/array-type": "off",
//     "@typescript-eslint/consistent-type-definitions": "off",
//     "@typescript-eslint/consistent-type-imports": [
//       "warn",
//       {
//         "prefer": "type-imports",
//         "fixStyle": "inline-type-imports"
//       }
//     ],
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
//       {
//         "argsIgnorePattern": "^_"
//       }
//     ],
//     "@typescript-eslint/require-await": "off",
//     "@typescript-eslint/no-misused-promises": [
//       "error",
//       {
//         "checksVoidReturn": {
//           "attributes": false
//         }
//       }
//     ],
//     "drizzle/enforce-delete-with-where": [
//       "error",
//       {
//         "drizzleObjectName": [
//           "db"
//         ]
//       }
//     ],
//     "drizzle/enforce-update-with-where": [
//       "error",
//       {
//         "drizzleObjectName": [
//           "db"
//         ]
//       }
//     ]
//   }
// }
// module.exports = config;

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Allow use of any in specific cases
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",

    // Allow 'require' statements in non-import contexts
    "@typescript-eslint/no-var-requires": "off",

    // Disable the unused vars warning for now
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // Prefer using nullish coalescing
    "@typescript-eslint/prefer-nullish-coalescing": "warn",

    // Optionally, you can suppress any other rule temporarily
  },
};
