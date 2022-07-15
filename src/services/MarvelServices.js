
import { useHttp } from '../hooks/http.hooks'

const useMarvelServices = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=a81a3f37bc9a95bd097084dc0d7898b6'
    const _baseOffset = 210;

    const _comicsOffset = 210;

    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }


    const getAllCharters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }
    const getCharters = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        if (char.description === "") {
            char.description = 'Unfortunately there is no information about this character'
        }
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            id: comics.id,
            url: comics.urls[0].url
        }
    }

    return { error, loading, getAllCharters, getCharters, clearError, getAllComics }
}



export default useMarvelServices;