import glue from 'schemaglue';
export { schemaDirectives } from './directives';
export const { schema, resolver } = glue('src/delivery', { mode: 'ts' });
