const url = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'


const widget = document.querySelector('.widget');


async function getData() {
  const response = await fetch(url)
  const jsonRes = await response.json()
  displayData(jsonRes.list)
}
getData()

function truncateDescription(name) {
  if (name.length < 49) return name
  if (name.length > 49) {
    let trimmed = name.slice(0, 46) + '...'
    return (
      trimmed
    )
  }
}

function displayData(data) {
  let mapped = data.map((ad) => {

    ad.name = truncateDescription(ad.name)

    return (
      `<div class='advert'>
      <a href='${ad.url}'>     
       <img src='${ad.thumbnail[0].url}' alt=''/>
      </a>
      <p class='category'>${ad.categories}</p>
      <a href='${ad.url}'> 
       <p class='description'>${ad.name}</p>
      </a>
      <a href='${ad.url}' target='_blank' class='branding'>
        <p>${ad.branding}</p>
      </a>
      </div>`
    )
  })
  widget.innerHTML = mapped.join(' ')
}



