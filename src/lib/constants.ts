export const APP_NAME = "App Name";

export const ERRORS = {
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You do not have permission to access this resource.",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "unauthorized",
  },
} as const;

export const ENTITIES = {
  ENTITY: "entity",
} as const;

export type Entity = (typeof ENTITIES)[keyof typeof ENTITIES];

export const STATIC_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  ENTITIES: `/${ENTITIES.ENTITY}`,
  SIGNUP: "/signup",
} as const;

export const PATH_BUILDERS = {
  ENTITY: {
    detailsView: (id: string) => `${STATIC_PATHS.ENTITIES}/${id}`,
    create: `${STATIC_PATHS.ENTITIES}/create`,
    edit: (id: string) => `${STATIC_PATHS.ENTITIES}/${id}/edit`,
    bulk: `${STATIC_PATHS.ENTITIES}/bulk`,
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const;
