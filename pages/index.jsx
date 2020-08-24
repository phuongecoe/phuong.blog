import Head from 'next/head'
import React, {useEffect, useState} from "react";

import { Image } from 'semantic-ui-react';
import * as _ from 'lodash';

export default function Home({photos}) {
    const [list, setList] = useState(photos);

    useEffect(() => {
        if(_.isEmpty(photos)) {
            getList();
        }

    }, []);

    const getList = () => {
        fetch('/api/photos/randoms')
            .then(data => data.json())
            .then((result => setList(result)));
    };

    return (
        <Image.Group>
            {
                _.map(list, (item) => (
                    <Image src={item.urls.thumb} key={item.id} />
                ))
            }
        </Image.Group>
    )
}

export async function getStaticProps() {
    let baseUrl = process.env.API_ENDPOINT || process.env.VERCEL_URL;
    let result = await fetch(`${baseUrl}/api/photos/randoms`)
        .then(data => data.json());

    return {
        props: {
            photos: result,
        }
    }

}
