// Función para guardar un valor en el localStorage
export const setLocalStorage = (key:string, value:unknown) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
};

// Función para obtener un valor del localStorage
export const getLocalStorage = (key: string) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : [];
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return null;
    }
};

export const getLocalStorageOneItem = (key: string) => {
    try {
        const value = localStorage.getItem(key);
        value
        // console.log(value)
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return null;
    }
};

// Función para eliminar un valor del localStorage
export const removeLocalStorage = (key:string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};
