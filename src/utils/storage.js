const storage = () => window.localStorage

export const getItem = (key, defaultValue) => {
  try {
    const value = storage().getItem(key)

    return value ? JSON.parse(value) : defaultValue
  } catch (e) {
    console.log(e)
    return defaultValue
  }
}

export const setItem = (key, value) => {
  try {
    storage().setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

export default {
  getItem,
  setItem,
}
