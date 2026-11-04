import React, { Usable } from "react";

type Params = {
    ticker: string;
}

export default function List({ params }: { params: Usable<Params> }) {
    const algo = React.use(params);
    console.log(algo);
    return (
        <div>{algo.ticker}</div>
    );
}