b# TODO - GymMingleII (Pro Hybrid Turborepo Migration)

- [x] Create turborepo root scaffold (turbo.json + tsconfig.base.json)

- [x] Create workspaces directories: apps/web, apps/mobile, packages/core

- [ ] Add base tsconfig setup for monorepo + project references
- [ ] Scaffold apps/web with Next.js + Tailwind (PostCSS) + theme colors
- [ ] Scaffold apps/mobile with Expo + React Native + NativeWind + theme colors
- [ ] Implement packages/core: types + theme contract + API/validators + storage abstraction
- [ ] Port existing landing/waitlist UI + validators into apps/web and/or packages/core
- [ ] Replace localStorage waitlist logic with storage abstraction + web adapter
- [ ] Configure turbo pipeline for build/dev ordering across core and apps
- [ ] Configure root `npm run dev` to run both apps concurrently
- [ ] Resolve all cross-workspace imports and TypeScript pathing
- [ ] Ensure repo builds; remove/keep legacy root files as needed
- [ ] Run `npm run dev` and `npm run build` to verify
