# Desplegar api-server en Vercel

Este backend Express vive dentro de un monorepo pnpm. Para desplegarlo como
un proyecto de Vercel **separado** de `nsport-web`, seguí estos pasos al
crear el proyecto en el dashboard de Vercel:

1. **Root Directory**: `artifacts/api-server`
2. Activá la opción **"Include files outside of the Root Directory"** (queda
   en Project Settings → General). Es obligatoria: el backend depende de los
   paquetes del workspace `@workspace/api-zod` y `@workspace/db`, que viven
   en `lib/` fuera de esta carpeta, y también necesita `pnpm-workspace.yaml`
   y `pnpm-lock.yaml` de la raíz del repo para instalar con pnpm.
3. **Framework Preset**: "Other" (no es una app estática ni Next.js/Vite).
4. **Install Command**: dejalo en automático (Vercel detecta pnpm por el
   lockfile y corre `pnpm install` en la raíz del monorepo).
5. **Build Command**: ya viene desactivado por `vercel.json`
   (`"buildCommand": null`). Es intencional: no necesitamos generar el
   bundle de `dist/index.mjs` (eso es solo para el deploy en Replit); Vercel
   compila `api/index.ts` de forma aislada mediante su runtime de Node.js
   serverless.

## Cómo funciona el entrypoint

`src/index.ts` (con `app.listen()` y la variable `PORT` obligatoria) es
exclusivo del modelo de servidor persistente usado en Replit — Vercel nunca
lo ejecuta.

Para Vercel se usa `api/index.ts`, que exporta la app de Express
directamente:

```ts
import app from "../src/app";
export default app;
```

Vercel invoca esa función en cada request; no hace falta `app.listen()` ni
`PORT` porque el runtime serverless de Vercel maneja el ciclo de
request/response por su cuenta. `vercel.json` reescribe todas las rutas
(`/(.*)`) hacia esa función, así que `/healthz`, `/api/healthz`, etc.
siguen respondiendo igual que en Replit.

## Verificación local

- `pnpm run typecheck` y `pnpm run build` (dentro de `artifacts/api-server`)
  deben terminar sin errores — no dependen de la función de Vercel.
- Para confirmar que `api/index.ts` compila de forma aislada (como lo hace
  el runtime de Vercel), podés correr:
  ```
  npx tsc --noEmit --strict --esModuleInterop --module esnext \
    --moduleResolution bundler --target es2022 --skipLibCheck api/index.ts
  ```
