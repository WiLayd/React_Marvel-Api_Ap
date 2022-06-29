class MarvelServices {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=a81a3f37bc9a95bd097084dc0d7898b6'

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`We can't take info from this url, status: ${res.status}`)
        }

        return res.json()
    }

    getAllCharters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }
    getCharters = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}



export default MarvelServices;