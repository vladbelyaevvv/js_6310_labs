import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }
  },{
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
      "indent": [
        "error",
        2,
        {
          "FunctionDeclaration": {
            "parameters": "first"
          },
          "MemberExpression": 2
        }
      ]
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // добавляем jest-глобалы: test, expect, describe и т.д.
      },
    },
  },
]);
