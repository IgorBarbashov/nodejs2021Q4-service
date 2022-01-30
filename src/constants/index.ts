export const REPOSITORY_ERROR_MESSAGES = {
    USERS: {
        NOT_FOUND: 'User not found, id: ',
        EXISTS: 'User already exists, id: ',
        NOT_FOUND_BY_LOGIN: 'User not found, login: ',
    },
    COLUMNS: {
        NOT_FOUND: 'Column not found, id: ',
        EXISTS: 'Column already exists, id: '
    },
    BOARDS: {
        NOT_FOUND: 'Board not found, id: ',
        EXISTS: 'Board already exists, id: '
    },
    TASKS: {
        NOT_FOUND: 'Task not found, id: ',
        EXISTS: 'Task already exists, id: '
    },
    LOGIN: {
        PASSWORD_INVALID: 'Invalid password'
    },
    AUTH: {
        UNAUTHORIZED: 'Unauthorized',
        INVALID_HEADER: 'Invalid authorization header',
        INVALID_SCHEME: 'Invalid authorization scheme',
        INVALID_TOKEN: 'Invalid token'
    }
};

export const EVENTS = {
    ERROR: 'error'
}

export const LOGGING_LEVELS = {
    NAME: {
        error: 'error',
        warn: 'warn',
        info: 'info',
        debug: 'debug'
    },
    ORDER: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    COLOR: {
        error: 'blue',
        warn: 'green',
        info: 'yellow',
        debug: 'red'
    }
};

export const DEFAULT_USER_LOGIN = 'admin';
export const DEFAULT_USER_PASSWORD = 'admin';
