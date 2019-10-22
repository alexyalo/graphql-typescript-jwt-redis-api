export const resolver = {
    Query: {
        testMessage: (): string => {
            return 'Hello World!';
        }
    }
};