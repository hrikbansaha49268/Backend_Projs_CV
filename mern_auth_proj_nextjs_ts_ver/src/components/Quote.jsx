const Quote = ({ quotedata }) => {
    return (
        <div className="text-blue-900 border-2 border-blue-700 rounded-lg p-6 hover:bg-blue-100 transition-all duration-300">
            <p className="italic text-lg">
                {quotedata.theQuote}
            </p>
            <p className="italic text-sm text-end">
                ~ {quotedata.author}
            </p>
        </div>
    )
}

export default Quote;