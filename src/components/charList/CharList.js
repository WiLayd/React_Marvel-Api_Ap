import { Component } from 'react/cjs/react.development';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class CharList extends Component {

    state = {
        charters: [],
        error: false,
        loading: true
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChartres();
    }

    onCharLoaded = (charters) => {
        this.setState({
            charters: charters,
            loading: false,
            error: false
        })
    }

    updateChartres = () => {
        this.marvelServices.getAllCharters()
            .then(this.onCharLoaded)
    }

    CharItem = () => {
        return this.state.charters.map(item => {
            let imgStyle = { 'objectFit': 'cover' }
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'fill' }
            }
            return (
                <li className="char__item" >
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    changeStyle = () => {
        let gridStyle = { 'gridTemplateColumns': 'repeat(3, auto' }
        if (this.state.loading) {
            gridStyle = { 'gridTemplateColumns': 'repeat(1, auto)' }
        }
        return gridStyle
    }


    render() {

        const { loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.CharItem() : null

        return (
            <div className="char__list">
                <ul className="char__grid" style={this.changeStyle()}>
                    {spinner}
                    {errorMessage}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;