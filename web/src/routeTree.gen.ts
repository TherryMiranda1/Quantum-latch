/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProductImport } from './routes/product'
import { Route as AppIndexImport } from './routes/app/index'

// Create Virtual Routes

const MeLazyImport = createFileRoute('/me')()
const LoginLazyImport = createFileRoute('/login')()
const FeedbackLazyImport = createFileRoute('/feedback')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const MeLazyRoute = MeLazyImport.update({
  id: '/me',
  path: '/me',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/me.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const FeedbackLazyRoute = FeedbackLazyImport.update({
  id: '/feedback',
  path: '/feedback',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/feedback.lazy').then((d) => d.Route))

const ProductRoute = ProductImport.update({
  id: '/product',
  path: '/product',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AppIndexRoute = AppIndexImport.update({
  id: '/app/',
  path: '/app/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/product': {
      id: '/product'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof ProductImport
      parentRoute: typeof rootRoute
    }
    '/feedback': {
      id: '/feedback'
      path: '/feedback'
      fullPath: '/feedback'
      preLoaderRoute: typeof FeedbackLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/me': {
      id: '/me'
      path: '/me'
      fullPath: '/me'
      preLoaderRoute: typeof MeLazyImport
      parentRoute: typeof rootRoute
    }
    '/app/': {
      id: '/app/'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/product': typeof ProductRoute
  '/feedback': typeof FeedbackLazyRoute
  '/login': typeof LoginLazyRoute
  '/me': typeof MeLazyRoute
  '/app': typeof AppIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/product': typeof ProductRoute
  '/feedback': typeof FeedbackLazyRoute
  '/login': typeof LoginLazyRoute
  '/me': typeof MeLazyRoute
  '/app': typeof AppIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/product': typeof ProductRoute
  '/feedback': typeof FeedbackLazyRoute
  '/login': typeof LoginLazyRoute
  '/me': typeof MeLazyRoute
  '/app/': typeof AppIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/product' | '/feedback' | '/login' | '/me' | '/app'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/product' | '/feedback' | '/login' | '/me' | '/app'
  id: '__root__' | '/' | '/product' | '/feedback' | '/login' | '/me' | '/app/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ProductRoute: typeof ProductRoute
  FeedbackLazyRoute: typeof FeedbackLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  MeLazyRoute: typeof MeLazyRoute
  AppIndexRoute: typeof AppIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ProductRoute: ProductRoute,
  FeedbackLazyRoute: FeedbackLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  MeLazyRoute: MeLazyRoute,
  AppIndexRoute: AppIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/product",
        "/feedback",
        "/login",
        "/me",
        "/app/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/product": {
      "filePath": "product.tsx"
    },
    "/feedback": {
      "filePath": "feedback.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/me": {
      "filePath": "me.lazy.tsx"
    },
    "/app/": {
      "filePath": "app/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
