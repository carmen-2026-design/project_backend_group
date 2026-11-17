// Traduce los errores de Sequelize a un mensaje y un código HTTP
// para no repetir lo mismo en todos los controladores.

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
    getErrorStatus
}
