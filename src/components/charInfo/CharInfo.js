import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton"

import PropTypes from 'prop-types'

import useMarvelServices from '../../services/MarvelServices';
import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    const { loading, error, getCharters, clearError } = useMarvelServices();


    useEffect(() => {
        updateChar()
    }, [props.charId])



    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return;
        }

        clearError();

        getCharters(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = (loading || error || char) ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? < View char={char} /> : null

    return (
        <div className="char__info" >
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {

    const { name, thumbnail, description, homepage, wiki, comics } = char

    let characterList = 'This character hasn`t solo comics'

    if (comics.length > 0) {
        characterList = comics.map((item, i) => {
            if (i > 9) { return }
            return (
                <li key={i} className="char__comics-item">
                    {item.name}
                </li>
            )
        })
    }

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'contain' }
    }


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {characterList}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;