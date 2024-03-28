import { useEffect, useState } from "react";
import Quote from "./Quote";

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);

    const populateQuotes = async () => {
        try {
            const req = await fetch('http://localhost:8080/api/allquotes');
            const data = await req.json();
            setQuotes(...data);
            console.log({ myquotes: quotes });
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        populateQuotes();
    }, []);


    return (
        <ul className="grid grid-cols-3 gap-4 w-3/4 mx-auto">
            {quotes.length > 0 ? quotes.map((e, i) => <Quote />) : "None is there"}
        </ul>
    );
};

export default Quotes