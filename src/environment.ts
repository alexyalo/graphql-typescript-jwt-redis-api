const defaultPort = 4000;

export interface Environment {
  apollo: {
    introspection: boolean,
    playground: boolean
  },
  port: number | string,
  database: {
    host: string,
    port: number | string,
    name: string,
    user: string,
    password: string,
    dialect: any
  },
  jwtEncryption: string,
  jwtExpiration: string,
  omdbApiKey: string,
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || defaultPort,
  database: {
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    name: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    dialect: process.env.DB_DIALECT || '',
  },
  jwtEncryption: process.env.JWT_ENCRYPTION || 'secureKey',
  jwtExpiration: process.env.JWT_EXPIRATION || '1y',
  omdbApiKey: process.env.OMDB_API_KEY || '',
};