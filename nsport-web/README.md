# NSPORT — Nova Sports Agencia

Sitio web de la agencia de representación de futbolistas NSPORT (Nova Sports Agencia). React + Vite + TypeScript + Tailwind CSS. Es una app 100% estática (sin backend) y no depende de Replit ni de ningún servicio propietario.

## Desarrollo local

```bash
pnpm install
pnpm run dev
```

Por defecto el servidor de desarrollo usa el puerto `3000`. Podés cambiarlo con la variable de entorno `PORT` (solo se usa en local, nunca en producción):

```bash
PORT=4000 pnpm run dev
```

## Build de producción

```bash
pnpm run build
```

Genera el sitio estático en `dist/`.

## Despliegue en Vercel

Este proyecto es un sitio estático generado con Vite, así que Vercel lo detecta automáticamente (`framework: "vite"` en `vercel.json`). No requiere configurar la variable `PORT` ni ninguna otra variable de entorno: Vercel solo instala dependencias, corre `pnpm run build` y sirve el contenido de `dist/`.

Pasos:
1. Subí esta carpeta a un repositorio de Git (GitHub, GitLab o Bitbucket).
2. Importá el repositorio en [vercel.com/new](https://vercel.com/new).
3. Si este proyecto vive dentro de un monorepo, configurá "Root Directory" apuntando a esta carpeta (`nsport-web`).
4. Desplegá. No hace falta tocar ninguna otra configuración.
