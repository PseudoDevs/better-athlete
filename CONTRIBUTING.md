# Contributing to Better Athlete

Thanks for your interest in contributing! This document covers everything you need to get started.

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.3+), Fortify, Inertia v3
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Radix UI
- **Testing:** Pest 4
- **Tooling:** Pint, Larastan/PHPStan, ESLint, Prettier

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies and set up the app:

```bash
composer run setup
```

3. Start the development server:

```bash
composer run dev
```

## Development Workflow

1. Create a branch from `main`:
    ```bash
    git checkout -b feature/my-feature
    ```
2. Make your changes.
3. Add or update tests covering the changed behavior.
4. Run the full check suite:
    ```bash
    composer run test
    ```
5. Commit with a clear, descriptive message.

## Code Style

All code must pass linting before a PR can be merged:

| Check           | Command                    | Auto-fix            |
| --------------- | -------------------------- | ------------------- |
| PHP (Pint)      | `composer run lint:check`  | `composer run lint` |
| Static analysis | `composer run types:check` | —                   |
| JS/TS (ESLint)  | `npm run lint:check`       | `npm run lint`      |
| Formatting      | `npm run format:check`     | `npm run format`    |

Or run everything at once:

```bash
composer run ci:check
```

## Pull Request Guidelines

- Keep PRs focused on a single change; open separate PRs for unrelated work.
- Reference any related issues (e.g. `Fixes #123`).
- Ensure CI checks pass locally before submitting.
- Update documentation if you change behavior that is documented.
- Do not commit secrets, `.env` files, or generated assets.

## Reporting Bugs

Open a [GitHub issue](../../issues/new/choose) and include:

- A clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, PHP version, etc.)

For security vulnerabilities, see [SECURITY.md](SECURITY.md) instead.

## License

By contributing, you agree that your contributions will be licensed under the [MIT license](LICENSE).
