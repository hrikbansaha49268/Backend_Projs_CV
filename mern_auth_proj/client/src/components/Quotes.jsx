import { useEffect } from "react";
import Quote from "./Quote"

const Quotes = () => {
    useEffect(() => { });
    return (
        <ul className="grid grid-cols-3 gap-4 w-3/4 mx-auto">
            <li><Quote /></li>
            <li><Quote /></li>
            <li><Quote /></li>
            <li><Quote /></li>
        </ul>
    );
};

export default Quotes