## Contributing to River

Thank you for showing interest in improving River. If you have any questions about this guide, have suggestions, or have any trouble getting started, please open an issue.  

### Installing Dependencies

Ensure the following packages are globally installed and up-to-date on your machine:

- [Node.js](https://nodejs.org/en/download/releases)
- [pnpm](https://pnpm.io/)

Then, run the following command from the root folder:

`pnpm install`

### Navigating the Monorepo

There are three main components of this repository, the [Next.js](https://nextjs.org/) app that powers the River frontend, located at `apps/frontend`, the [Ponder](https://github.com/0xOlias/ponder) instance powering the backend, located at `apps/backend`, and the River design system, [Estuary](https://estuary-live.vercel.app/estuary/tokens/typography), located at `packages/design-system`.

If you're looking for our protocol repository, click [here](https://github.com/1ifeworld/river-contracts).

### Configuring Environment Variables

Visit the 'env.example' file in each directory for guidance on how to configure your environment variables. Below, you'll find links to retrieve the necessary API keys we use.

- [Alchemy](https://www.alchemy.com/)
- [web3.storage](https://web3.storage/)
- [Basement](https://basement.dev/)

If you have suggestions on a better approach to configuring environment variables for this project, please open an issue.
