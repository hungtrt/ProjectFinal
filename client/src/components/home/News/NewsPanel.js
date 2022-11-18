import React, { useState } from 'react'
import { homeData } from './Data'
import Home from './Home'

const News_Panel = () => {
  const [items, setItems] = useState(homeData)
  return (
    <>
      <section className='home'>
        <Home items={items}/>
      </section>
      <div className="margin"></div>
    </>
  )
}

export default News_Panel