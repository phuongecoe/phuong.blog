import Unsplash from '../../../services/unsplash';

export default (req, res) => {

    Unsplash.getRandoms()
        .then(data => data.json())
        .then(results => {
            res.json(results);
        });
};
