export default function useArticles() {
  function fetchLatestArticles() {
    const url =
      'https://newsapi.org/v2/top-headlines?' +
      'sources=bbc-news&' +
      `apiKey=${process.env.VUE_APP_NEWS_API}`

    return new Promise(resolve => {
      fetch(url).then(res => resolve(res.json()))
    })
  }

  function fetchLatestArticle() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fetchLatestArticles().then((response: any) => response.items[0])
  }

  return { fetchLatestArticle, fetchLatestArticles }
}
