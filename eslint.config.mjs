import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/*.js",
      "**/*.jsx",
      "src/app/(payload)/**/*",
      "src/payload-types.ts",
      ".next/**",
      "node_modules/**",
    ],
  },

  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "next/core-web-vitals",
      "prettier",
    ),
  ),

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: path.join(__dirname, "tsconfig.json"),
        },
      },
    },

    rules: {
      // Relax noisy TS type-safety rules for build
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",

      // Import plugin relaxations
      "import/order": "off",
      "import/no-mutable-exports": "off",
      "import/no-cycle": "off",
      "import/no-default-export": "off",
      "import/no-duplicates": "off",
      "import/namespace": "off",

      // General relaxations
      "no-empty-pattern": "off",
      "no-restricted-imports": "off",
      "prefer-const": "off",

      // Next.js specific
      "@next/next/no-img-element": "off",
    },
  },

  {
    files: ["src/app/**/**/**/**", "**/tailwind.config.ts", "src/payload.config.ts", "src/middleware.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
];
