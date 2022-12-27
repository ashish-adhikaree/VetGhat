import {MdPersonSearch} from "react-icons/md"
const SearchBar = () => {
    return <div>
        <MdPersonSearch className="text-2xl text-gray-400 cursor-pointer sm:hidden"/>
        <form className="min-w-[300px] rounded-md bg-gray-100 hidden sm:flex items-center hover:shadow-md focus-within:shadow-md px-4 py-2">
            <input className="bg-transparent outline-none text-sm flex-grow" type="text" name="usersearch" placeholder="Search User"/>
            <MdPersonSearch className="text-2xl text-gray-400 cursor-pointer"/>
        </form>
    </div>
}

export default SearchBar