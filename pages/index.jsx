import Head from 'next/head'
import React, {useEffect, useState} from "react";

import { Image } from 'semantic-ui-react';
import * as _ from 'lodash';

export default function Home({photos, VERCEL_URL}) {
    const [list, setList] = useState(photos);

    useEffect(() => {
        if(_.isEmpty(photos)) {
            getList();
        }

        console.info('VERCEL_URL', VERCEL_URL);

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
    let baseUrl = `http://localhost:3000`;
    let result = await fetch(`${baseUrl}/api/photos/randoms`)
        .then(data => data.json());

    return {
        props: {
            photos: result,
            VERCEL_URL: process.env.VERCEL_URL
        }
    }

}
