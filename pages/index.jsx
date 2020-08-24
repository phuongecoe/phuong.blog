import Head from 'next/head'
import React, {useEffect, useState, Fragment} from "react";

import { Image } from 'semantic-ui-react';
import * as _ from 'lodash';

export default function Home({photos, baseUrl}) {
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

        <Fragment>
            <Head>
                <title>Home page</title>
                <meta property="og:title" content="Home page" key="title" />
                <meta property="og:image" content={_.get(_.first(list), 'urls.thumb', '')} key="image" />
            </Head>
            <Image.Group>
                {
                    _.map(list, (item) => (
                        <Image src={item.urls.thumb} key={item.id} />
                    ))
                }
            </Image.Group>
        </Fragment>
    )
}

export async function getServerSideProps() {
    let baseUrl = process.env.API_ENDPOINT;

    let result = await fetch(`${baseUrl}/api/photos/randoms`)
        .then(data => data.json())
        .catch(e => {
            return [];
        });

    return {
        props: {
            photos: result,
            baseUrl
        }
    }

}
