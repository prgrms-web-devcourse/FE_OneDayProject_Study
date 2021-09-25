export default function Feed({ $target, initialState }) {
  const $feed = document.createElement('section')
  $feed.className = 'feed'

  $target.appendChild($feed)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const renderFeedItem = ({ title, thumbnail, content, pubDate, link, author }) => `
    <div class="feed__item">
      <a class="feed__link" href="${link}">
        <div class="item__content-container">
          ${
            thumbnail
              ? `
            <div class="item__thumbnail-container"> 
              <img class="item__thumbnail" src="${thumbnail}" alt="${title}" />
            </div>`
              : `<div class="item__thumbnail-container item__thumbnail--dummy"></div>`
          }
          <h3 class="item__title">${title}</h3>
          <p class="item__preview">${content}...</p>
        </div>
        <div class="item__info-container">
          <div class="item__author-container">
            <div class="item__avatar"></div>
            <span class="item__author">${author}</span>
          </div>
          <span class="item__pub-date">${pubDate.substr(0, 10)}</span>
        </div>
      </a>
    </div>
  `

  this.render = () => {
    $feed.innerHTML = `
      ${this.state.map((post) => renderFeedItem(post)).join('')}
    `
  }

  $feed.addEventListener('click', (e) => {
    e.preventDefault()
    const { className } = e.target
    if (className === 'feed__link') {
      window.open(e.target.href)
    }
  })

  this.render()
}
