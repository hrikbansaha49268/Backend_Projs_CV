"use client";
import { useEffect, useState } from "react";
import Quote from "./Quote";

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);

    const populateQuotes = async () => {
        try {
            const req = await fetch(`http://localhost:${process.env.PORT}/api/allquotes`);
            const data = await req.json();
            setQuotes([...data]);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        populateQuotes();
    }, []);


    return (
        <ul className="grid grid-cols-3 gap-4 w-3/4 mx-auto">
            {quotes.map((e, i) => <li key={i}><Quote quotedata={e} /></li>)}
        </ul>
    );
};

export default Quotes;