set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"
vitest := "pnpm exec vitest"
typedoc := "pnpm exec typedoc"

publish_dev := "pnpm publish --no-git-checks --tag dev --access public"
publish := "pnpm publish --access public"

pkg := "package"

tst := "test"

vanilla := "examples/vanilla"
express := "examples/express"
hono := "examples/hono"
vercel := "examples/vercel"

dev := "pnpm dev"
build := "pnpm build"
start := "pnpm start"
preview := "pnpm preview"

# Default action
_:
    just --list -u

# Install
i:
    pnpm install

# Format code
fmt:
    {{biome}} check --write .

# Lint code with ls-lint
ls-lint:
    ls-lint -config ./.ls-lint.yaml

# Lint code with ls-lint
lslint:
    just ls-lint

# Lint code with typos-cli
typos:
    typos

# Lint code with TypeScript Compiler
tsc:
    cd ./{{pkg}} && {{tsc}} --noEmit

# Lint code
lint:
    just lslint
    just typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Build package
build:
    cd ./{{pkg}} && {{tsdown}} -c tsdown.config.ts

# Test package
test:
    cd ./{{tst}} && {{vitest}} run

# Check code
check:
    just fmt
    just lint
    just build
    just test

# Generate APIs documentation
api:
    cd ./{{pkg}} && {{typedoc}}

# Start Vanilla example
vanilla:
    cd ./{{vanilla}} && {{dev}}

# Build Vanilla example
vanilla-build:
    cd ./{{vanilla}} && {{build}}

# Start Vanilla production example
vanilla-start:
    cd ./{{vanilla}} && {{start}}

# Start Express example
express:
    cd ./{{express}} && {{dev}}

# Build Express example
express-build:
    cd ./{{express}} && {{build}}

# Start Express production example
express-start:
    cd ./{{express}} && {{start}}

# Start Hono example
hono:
    cd ./{{hono}} && {{dev}}

# Build Hono example
hono-build:
    cd ./{{hono}} && {{build}}

# Start Hono production example
hono-start:
    cd ./{{hono}} && {{start}}

# Start Vercel example
vercel:
    cd ./{{vercel}} && {{dev}}

# Build Vercel example
vercel-build:
    cd ./{{vercel}} && {{build}}

# Start Vercel production example
vercel-start:
    cd ./{{vercel}} && {{start}}

# Publish package with dev tag as dry-run
publish-dev-try:
    cd ./{{pkg}} && {{publish_dev}} --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && {{publish_dev}}

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && {{publish}} --dry-run

# Publish package
publish:
    cd ./{{pkg}} && {{publish}}

# Clean builds (Linux)
clean-linux:
    rm -rf ./{{pkg}}/dist

# Clean builds (macOS)
clean-macos:
    just clean-linux

# Clean builds (Windows)
clean-windows:
    Remove-Item -Recurse -Force ./{{pkg}}/dist

# Clean builds
clean:
    just clean-{{os()}}

# Clean everything (Linux)
clean-all-linux:
    just clean

    rm -rf ./{{pkg}}/node_modules

    rm -rf ./node_modules

# Clean everything (macOS)
clean-all-macos:
    just clean-all-linux

# Clean everything (Windows)
clean-all-windows:
    just clean

    Remove-Item -Recurse -Force ./{{pkg}}/node_modules

    Remove-Item -Recurse -Force ./node_modules

# Clean everything
clean-all:
    just clean-all-{{os()}}
