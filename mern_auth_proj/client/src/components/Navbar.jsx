const Navbar = () => {
    return (
        <div className="border-b-2 border-blue-700 mb-6">
            <nav className="flex justify-between w-3/4 mx-auto py-6 items-center text-blue-800">
                <h1 className="text-3xl font-light italic">
                    Quotes Manager
                </h1>
                <ul className="flex gap-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar