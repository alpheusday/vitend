set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"
vitest := "pnpm exec vitest"
typedoc := "pnpm exec typedoc"

pkg := "package"

vanilla := "examples/vanilla"
express := "examples/express"
hono := "examples/hono"
vercel := "examples/vercel"

dev := "pnpm dev"
build := "pnpm build"
start := "pnpm start"
preview := "pnpm preview"
publish := "pnpm publish"

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
    cd ./{{pkg}} && {{tsc}} --noEmit

# Lint code
lint:
    ls-lint -config ./.ls-lint.yaml
    typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Format code
fmt:
    {{biome}} check --write .

# Build package
build:
    cd ./{{pkg}} && {{tsdown}} -c tsdown.config.ts

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
    cd ./{{pkg}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && {{publish}} --no-git-checks --tag dev

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && {{publish}} --dry-run

# Publish package
publish:
    cd ./{{pkg}} && {{publish}}

# Clean builds
clean:
    rm -rf ./{{pkg}}/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./{{pkg}}/node_modules
    
    rm -rf ./node_modules
