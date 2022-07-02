import { Component } from 'react/cjs/react.production.min';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton"

import MarvelServices from '../../services/MarvelServices';
import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    componentDidMount() {
        this.updateChar()
    }

    updateChar() {
        const { charId } = this.props
        if (!charId) {
            return;
        }


        this.onCharLoading()

        this.marvelServices
            .getCharters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }



    render() {


        const { char, error, loading } = this.state

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
}

const View = ({ char }) => {

    const { name, thumbnail, description, homepage, wiki, comics } = char

    let characterList = 'This character hasn`t solo comics'

    if (comics.length > 0) {
        characterList = comics.map((item, i) => {
            if (i > 9) {
                return;
            }
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

export default CharInfo;