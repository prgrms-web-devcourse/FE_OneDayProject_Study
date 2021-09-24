const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (res.ok) {
      return await res.json()
    }

    throw new Error('API 호출 실패')
  } catch (e) {
    alert(e.message)
  }
}

export const requestGet = async (url, options) => await request(url, options)
