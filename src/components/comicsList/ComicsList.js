import './comicsList.scss';

import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';

const ComicsList = () => {

    const { loading, error, getAllComics } = useMarvelServices();

    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newComicsItem, setComicsItem] = useState(false)
    const [comicsEnded, setCharEnded] = useState(false);


    useEffect(() => {
        onRequest();
    }, [offset])

    const onRequest = () => {
        getAllComics(offset)
            .then(onUpdateComicsList)
    }

    const onUpdateComicsList = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setComicsItem(false)

        newComicsList.length < 8 ? setCharEnded(true) : setCharEnded(false)
    }

    const onComicsLoaded = () => {
        setOffset(offset => offset + 8)
        setComicsItem(true)
    }

    const renderComicsList = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </Link>
                </li >
            )
        })

        return (
            <ul className='comics__grid'>
                {items}
            </ul>
        )

    }

    const items = renderComicsList(comicsList)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = ((loading || newComicsItem) && !error) ? <Spinner /> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {items}
            {spinner}
            <button
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                disabled={error}
                onClick={onComicsLoaded}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;