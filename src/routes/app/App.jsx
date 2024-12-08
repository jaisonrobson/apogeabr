import './App.css'

import React, { useContext, useEffect, forwardRef } from 'react'

import { withReducerContext, ReducerContext } from 'contexts/withReducerContext'
import { withModalContext } from 'contexts/withModalContext'

import Top from '../top/Top'
import Content from '../content/Content'
import { login, fetchMovies } from 'store/actions'

import AcordandoBem from 'images/AcordandoBem.jpg'
import AVidaEAMorte from 'images/AVidaEAMorte.jpg'
import AProvaDeBafometro from 'images/AProvaDeBafometro.jpg'
import DoceJuventude from 'images/DoceJuventude.jpg'
import EsplendorDaNatureza from 'images/EsplendorDaNatureza.jpg'
import ViagemInacreditavel from 'images/ViagemInacreditavel.jpg'
import TemplosSecretos from 'images/TemplosSecretos.jpg'
import EsportesNaMontanha from 'images/EsportesNaMontanha.jpg'
import Flamingo from 'images/Flamingo.jpg'
import LuaNova from 'images/LuaNova.jpg'
import MagoFantasia from 'images/MagoFantasia.jpg'
import Nave from 'images/Nave.jpg'
import Robo from 'images/Robo.jpg'
import castelo from 'images/castelo.jpg'
import gatopordosol from 'images/gatopordosol.jpg'
import surfando from 'images/surfando.jpg'

const movies = [
    {
        title: 'Waking up Well',
        synopsis: 'Sed vehicula fringilla ex ut commodo. Etiam nec gravida quam.',
        genre: 'Casual',
        year: 2006,
        duration: 45,
        imageSrc: AcordandoBem,
    },
    {
        title: 'Life and Death',
        synopsis: 'Morbi bibendum quis nisl quis fringilla. Nunc blandit ligula in.',
        genre: 'Documentary',
        year: 2010,
        duration: 50,
        imageSrc: AVidaEAMorte,
    },
    {
        title: 'High Speed',
        synopsis: 'Curabitur ultrices ullamcorper neque, dictum sagittis massa ultricies sed. Maecenas.',
        genre: 'Action',
        year: 2012,
        duration: 75,
        imageSrc: AProvaDeBafometro,
    },
    {
        title: 'Sweet Youth',
        synopsis: 'Aliquam eget risus mi. Pellentesque lobortis mi leo, quis accumsan.',
        genre: 'Casual',
        year: 2008,
        duration: 63,
        imageSrc: DoceJuventude,
    },
    {
        title: 'Colors of Nature',
        synopsis: 'Sed sollicitudin gravida nulla, nec finibus lorem. Sed ac libero.',
        genre: 'Documentary',
        year: 2009,
        duration: 45,
        imageSrc: EsplendorDaNatureza,
    },
    {
        title: 'Unbelievable Journey',
        synopsis: 'Pellentesque massa leo, venenatis tristique lorem non, aliquet porttitor libero.',
        genre: 'Adventure',
        year: 2016,
        duration: 127,
        imageSrc: ViagemInacreditavel,
    },
    {
        title: 'Hidden Temples',
        synopsis: 'Sed ac est tincidunt odio suscipit rutrum. Curabitur fermentum finibus.',
        genre: 'Documentary',
        year: 2010,
        duration: 49,
        imageSrc: TemplosSecretos,
    },
    {
        title: 'Mountain King',
        synopsis: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
        genre: 'Action',
        year: 2018,
        duration: 135,
        imageSrc: EsportesNaMontanha,
    },
    {
        title: 'Beautiful in Everything',
        synopsis: 'Nullam tellus ante, luctus ac mollis sed, vulputate vitae nulla.',
        genre: 'Documentary',
        year: 2013,
        duration: 70,
        imageSrc: Flamingo,
    },
    {
        title: 'After Midnight',
        synopsis: 'Donec mattis sem eu tristique egestas. Ut eleifend est dolor.',
        genre: 'Horror',
        year: 2020,
        duration: 140,
        imageSrc: LuaNova,
    },
    {
        title: 'Tales of Nasdaria',
        synopsis: 'In tempus ut neque nec convallis. Aenean mollis mi tristique.',
        genre: 'Fantasy',
        year: 2020,
        duration: 120,
        imageSrc: MagoFantasia,
    },
    {
        title: 'Beyond the Sky',
        synopsis: 'Curabitur sit amet laoreet velit. Nulla tincidunt velit augue, consequat.',
        genre: 'Sci-fy',
        year: 2021,
        duration: 138,
        imageSrc: Nave,
    },
    {
        title: 'Fight to Death',
        synopsis: 'Quisque a blandit massa. Morbi id dapibus est, id interdum.',
        genre: 'Sci-fy',
        year: 2019,
        duration: 118,
        imageSrc: Robo,
    },
    {
        title: 'Castle of Dracula',
        synopsis: 'Aenean quam massa, consectetur vitae nulla ut, malesuada accumsan arcu.',
        genre: 'Horror',
        year: 2020,
        duration: 102,
        imageSrc: castelo,
    },
    {
        title: 'Signs of Lazyness',
        synopsis: 'Praesent et sapien aliquet metus suscipit commodo eu in urna.',
        genre: 'Documentary',
        year: 2012,
        duration: 33,
        imageSrc: gatopordosol,
    },
    {
        title: 'Exercise and Health',
        synopsis: 'Sed lobortis vulputate tortor a feugiat. Quisque augue urna, accumsan.',
        genre: 'Documentary',
        year: 2017,
        duration: 40,
        imageSrc: surfando,
    },
]

const user = {
    name: 'David'
}

const App = forwardRef((props, ref) => {
    const { dispatch, ...state } = useContext(ReducerContext)

    useEffect(() => {
        login(dispatch, user)
        fetchMovies(dispatch, movies)
    }, [dispatch, state.movies, state.user])

    return (
        <div ref={ref} {...props} className="app bg-primary">
            <Top />

            <Content />
        </div>
    )
})

export default withReducerContext(withModalContext(App))