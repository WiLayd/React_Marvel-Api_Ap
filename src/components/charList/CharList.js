import { Component } from 'react/cjs/react.development';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { createRef } from 'react';


class CharList extends Component {


    state = {
        charters: [],
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChartres();
    }



    onReguest = (offset) => {
        this.onCharListLoading();
        this.marvelServices.getAllCharters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)

    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharLoaded = (newCharters) => {
        let ended = false;
        if (newCharters < 9) { ended = true }


        this.setState(({ offset, charters }) => ({
            charters: [...charters, ...newCharters],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChartres = () => {
        this.marvelServices.getAllCharters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    CharItem = () => {
        return this.state.charters.map(item => {


            let imgStyle = { 'objectFit': 'cover' }
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'fill' }
            }

            return (
                <li key={item.id}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    changeStyle = () => {
        let gridStyle = { 'gridTemplateColumns': 'repeat(3, auto' }
        if (this.state.loading || this.state.error) {
            gridStyle = { 'gridTemplateColumns': 'repeat(1, auto)' }
        }
        return gridStyle
    }


    render() {


        const { loading, error, offset, newItemLoading, charEnded } = this.state
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
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onReguest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;