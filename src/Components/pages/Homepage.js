import React from 'react'
import Content from '../fragments/Content'
import Header from '../fragments/Header'
import Menu from '../fragments/Menu'

export default function Homepage() {
    return (
        <div>
            <Header/>
            <Menu/>
            <Content/>            
        </div>
    )
}
