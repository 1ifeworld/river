import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/generated/schema.graphql',
  documents: 'gql/queries/*.graphql',
  generates: {
    'gql/sdk.generated.ts': {
      plugins: [
        {
          add: {
            content:
              'import type { DocumentNode } from "graphql/language/ast";',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
};

export default config;
