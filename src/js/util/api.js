const API_ENDPOINT_URI = 'https://api.coingecko.com/api/v3/coins';
const VS_CURRENCY = 'krw';
const ORDER = 'market_cap_desc';
const PER_PAGE = 16;

export const coinApi = {
  async getCoins() {
    const data = await request(
      `${API_ENDPOINT_URI}/markets?vs_currency=${VS_CURRENCY}&order=${ORDER}&per_page=${PER_PAGE}`,
    );
    return data;
  },
};

const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { accept: 'application/json' },
    });

    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    console.log(e);
  }
};
