class CustomError extends Error {
    isCustom: boolean;

    /**
     * Initialize custom error entity
     */
    constructor() {
        super();
        this.isCustom = true;
    }
}

export class EntityNotFoundError extends CustomError {
    message: string;

    /**
     * Initialize EntityNotFoundError entity
     * 
     * @param message - Error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    };
}

export class EntityExistsError extends CustomError {
    message: string;

    /**
     * Initialize EntityExistsError entity
     * 
     * @param message - Error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    };
}

export class ForbiddenError extends CustomError {
    message: string;

    /**
     * Initialize ForbiddenError entity
     * 
     * @param message - Error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    };
}

export class UnauthorizedError extends CustomError {
    message: string;

    /**
     * Initialize UnauthorizedError entity
     * 
     * @param message - Error message
     */
    constructor(message: string) {
        super();
        this.message = message;
    };
}