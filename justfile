set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
tsdown := node_bin + "tsdown"
vitest := node_bin + "vitest"
typedoc := node_bin + "typedoc"

pkg := "package"

vanilla := "examples/vanilla"
express := "examples/express"
hono := "examples/hono"

# Default action
_:
    just lint
    just fmt
    just build

# Install
i:
    pnpm install

# Lint with TypeScript Compiler
tsc:
    cd ./{{pkg}} && ../{{tsc}} --noEmit

# Lint code
lint:
    ls-lint
    typos
    just tsc

# Format code
fmt:
    ./{{biome}} check --write .

# Build package
build:
    cd ./{{pkg}} && ../{{tsdown}} -c tsdown.config.ts

# Generate APIs documentation
api:
    cd ./{{pkg}} && ../{{typedoc}}

# Start Vanilla example
vanilla:
    cd ./{{vanilla}} && pnpm dev

# Build Vanilla example
vanilla-build:
    cd ./{{vanilla}} && pnpm build

# Start Vanilla production example
vanilla-start:
    cd ./{{vanilla}} && pnpm start

# Start Express example
express:
    cd ./{{express}} && pnpm dev

# Build Express example
express-build:
    cd ./{{express}} && pnpm build

# Start Express production example
express-start:
    cd ./{{express}} && pnpm start

# Start Hono example
hono:
    cd ./{{hono}} && pnpm dev

# Build Hono example
hono-build:
    cd ./{{hono}} && pnpm build

# Start Hono production example
hono-start:
    cd ./{{hono}} && pnpm start

# Publish package with dev tag as dry-run
publish-dev-try:
    cd ./{{pkg}} && pnpm publish --no-git-checks --tag dev --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && pnpm publish --no-git-checks --tag dev

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && pnpm publish --dry-run

# Publish package
publish:
    cd ./{{pkg}} && pnpm publish

# Clean builds
clean:
    rm -rf ./{{pkg}}/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./{{pkg}}/node_modules
    
    rm -rf ./node_modules
