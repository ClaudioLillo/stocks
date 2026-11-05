import React from "react";

type Params = {
    ticker: string;
}

export default function List({ params }: { params: Promise<Params> }) {
    const {ticker} = React.use(params);
    return (
        <div>{ticker}</div>
    );
};