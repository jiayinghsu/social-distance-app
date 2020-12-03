export function fromLocalStorage(key, defaultValue = null) {
    let value = window.localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
}

export function toLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}