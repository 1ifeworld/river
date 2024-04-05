import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../delta/generated/schema.graphql',
  documents: ['gql/queries/*.graphql', 'gql/fragments/*.graphql'],
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
}

export default config
