class ErrorWithStatus extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class GenericError extends ErrorWithStatus {
    constructor(message="Ha ocurrido un error de servidor"){
        super(message,500);
        this.name = "GenericError"
    }
}

// --------------------------- errores de unicidad
class UniqueConstraintError extends ErrorWithStatus {
    constructor(message = "Ya existe un registro con estos valores"){
        super(message);
        this.status = 409;
        this.name="UniqueConstraintError";
    }
}

class UniqueEmailError extends UniqueConstraintError {
    constructor(email) {
        super(`Ya existe un usuario con el email ${email}`);
        this.name = "UniqueEmailError";
    }
}
class UniqueUsernameError extends UniqueConstraintError {
    constructor(username) {
        super(`Ya existe un usuario con el username ${username}`);
        this.name = "UniqueUsernameError";
    }
}

// --------------- errores de validación
class ValidationError extends ErrorWithStatus {
    constructor(message="Error de validación de datos"){
        super(message,400);
        this.name="ValidationError";
    }
}

// ---------------- errores de no encontrado

class NotFoundError extends ErrorWithStatus {
    constructor(message="Recurso no encontrado"){
        super(message,404);
        this.name="NotFoundError";
    }
}
const errorFamilies = {
    SequelizeUniqueConstraintError: { // valores que no se pueden repetir
        default: UniqueConstraintError,
        username: UniqueUsernameError,
        email: UniqueEmailError
    },
    SequelizeValidationError:{ // validación incorrecta
        default: ValidationError
    },
    SequelizeForeignKeyConstraintError: { // clave foranea que no apunta correctamente
        default: GenericError
    },
    SequelizeDatabaseError:{ // error de base de datos
        default: GenericError
    },


}
const throwError = (error) =>{
    if(error instanceof ErrorWithStatus){
        throw error;
    }
    if(error.name in errorFamilies){
        const family =  errorFamilies[error.name];
        const path = error.errors && error.errors[0].path;
        const value = error.errors && error.errors[0].value;
        if(path in family){
            const ErrorType = family[path];
            throw new ErrorType(value);
        }else{
            const ErrorType = family["default"];
            throw new ErrorType(value)
        }
    }else{
        throw new GenericError();
    }
}
// Mensaje legible para mostrar en un formulario o devolver en la API
const getErrorMessage = (error) => {
    switch (error.name) {
        // un campo "unique" repetido (nombre de héroe, email...)
        case "SequelizeUniqueConstraintError":
            return "Ya existe un registro con ese valor de " + Object.keys(error.fields).join(", ");
        // falla alguna validación del modelo (allowNull, min, max...)
        case "SequelizeValidationError":
            return error.errors.map(e => e.message).join(". ");
        // la clave ajena apunta a algo que no existe (userId inexistente...)
        case "SequelizeForeignKeyConstraintError":
            return "El registro relacionado no existe";
        // PostgreSQL rechaza el dato (por ejemplo un texto donde va un número)
        case "SequelizeDatabaseError":
            return "Datos no válidos";
        default:
            return "Ha ocurrido un error inesperado";
    }
}

// Código de estado HTTP para la API
const getErrorStatus = (error) => {
    switch (error.name) {
        case "SequelizeUniqueConstraintError":
            return 409; // conflicto: ya existe
        case "SequelizeValidationError":
        case "SequelizeForeignKeyConstraintError":
        case "SequelizeDatabaseError":
            return 400; // datos inválidos
        default:
            return 500; // error nuestro
    }
}

export {
    getErrorMessage,
    getErrorStatus,
    UniqueConstraintError,
    UniqueEmailError,
    UniqueUsernameError,
    throwError,
    NotFoundError
}

