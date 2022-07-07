import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import MarvelServices from '../../services/MarvelServices';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
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

    updateChar = () => {
        const maxId = 1011400,
            minId = 1011000

        const id = Math.floor(Math.random() * (maxId - minId) + minId)
        this.onCharLoading();
        this.marvelServices
            .getCharters(id)
            .then(this.onCharLoaded)
            .catch(this.onError)


    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    render() {


        const { char, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? < View char={char} /> : null


        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div >
        )
    }
}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki } = char;

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'contain' }
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;