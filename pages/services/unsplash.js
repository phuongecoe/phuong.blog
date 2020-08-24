const API_ENDPOINT = `https://api.unsplash.com`;
const CLIENT_ID = `vshsVCInYdkb1IHdD5gBMM7fIbUYlBdbt-kIMkBA1Ts`;

class Unsplash {
    getRandoms() {
        return fetch(`${API_ENDPOINT}/photos/random?client_id=${CLIENT_ID}&count=30`)
    }
}

export default new Unsplash();
