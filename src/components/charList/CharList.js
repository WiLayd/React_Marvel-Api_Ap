import { useState, useEffect } from 'react/cjs/react.development';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharList = (props) => {

    const [charters, setCharters] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)



    const marvelServices = new MarvelServices();

    useEffect(() => {
        updateChartres();
    }, [])


    const onReguest = (offset) => {
        onCharListLoading();
        marvelServices.getAllCharters(offset)
            .then(onCharLoaded)
            .catch(onError)

    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharLoaded = (newCharters) => {
        let ended = false;
        if (newCharters < 9) { ended = true }

        setCharters(charters => [...charters, ...newCharters])
        setLoading(false)
        setError(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)

    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const updateChartres = () => {
        marvelServices.getAllCharters()
            .then(onCharLoaded)
            .catch(onError)
    }

    const CharItem = () => {
        return charters.map(item => {

            let imgStyle = { 'objectFit': 'cover' }
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'fill' }
            }

            return (
                <li key={item.id}
                    className="char__item"
                    onClick={() => props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    const changeStyle = () => {
        let gridStyle = { 'gridTemplateColumns': 'repeat(3, auto' }
        if (loading || error) {
            gridStyle = { 'gridTemplateColumns': 'repeat(1, auto)' }
        }
        return gridStyle
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? CharItem() : null

    return (
        <div className="char__list">
            <ul className="char__grid" style={changeStyle()}>
                {spinner}
                {errorMessage}
                {content}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onReguest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;