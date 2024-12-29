import React from 'react'

import { Header } from 'components'

const HeaderComponent = props => <h3 {...props}/>

const TitleH3 = (props) => <Header HeaderComponent={HeaderComponent} className='text-gray-100 unselectable' display="flex" justifyContent="center" {...props} />

export default TitleH3