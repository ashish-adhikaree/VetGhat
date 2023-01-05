import { useEffect, useRef, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import Axios from "../../axios";
import cookieCutter from "cookie-cutter";
import axios, { CancelTokenSource } from "axios";
import Link from "next/link";
import { searchUser } from "../../typedeclaration";
import Image from "next/image";
import { CleanStrapiUserSearchResponse } from "../../helper_functions/cleanStrapiResponse";
const SearchBar = () => {
  const [jwt, setJWT] = useState("");
  const [searchValue, setSearchValue] = useState<string>();
  const [search_suggestion_loading, setSearchSuggestionLoading] =
    useState<boolean>();
  const [search_suggestion, setSearchSuggestion] = useState<searchUser[] | null>();
  const cancelToken = useRef<CancelTokenSource>();

  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 3 && search_suggestion_loading)
      cancelToken.current?.cancel();
    if (value.length < 3) search_suggestion && setSearchSuggestion(null);

    if (value.length > 2) {
      const token = axios.CancelToken.source();
      cancelToken.current = token;
      setSearchSuggestionLoading(true);
      setTimeout(() => {
        Axios(jwt)
          .get(`${process.env.STRAPI_URL}/api/users-permissions/search`, {
            params: {
              populate: ["profilepic"],
              name: value,
            },
            cancelToken: token.token,
          })
          .then(({ data }) => {
            setSearchSuggestionLoading(false);
            setSearchSuggestion(CleanStrapiUserSearchResponse(data));
            console.log(data);
          })
          .catch(() => {});
      }, 200);
    }
    setSearchValue(value);
  };

  useEffect(() => {
    setJWT(cookieCutter.get("jwt"));
  }, []);

  return (
    <div className="relative">
      <form className="w-[250px] sm:min-w-[300px] rounded-md bg-gray-100 flex items-center hover:shadow-md focus-within:shadow-md px-4 py-2">
        <input
          className="bg-transparent outline-none text-sm flex-grow"
          type="text"
          name="usersearch"
          placeholder="Search User"
          defaultValue=""
          value={searchValue}
          onChange={changeSearchValue}
          autoComplete="off"
        />
        <MdPersonSearch className="text-2xl text-gray-400 cursor-pointer" />
      </form>
      {search_suggestion_loading || search_suggestion && (
          <div className="absolute w-full bg-gray-100 p-5 mt-3 rounded-md">
            {search_suggestion_loading ? (
              <div>Loading</div>
            ) : search_suggestion && search_suggestion.length !== 0 ? (
              search_suggestion.map((user: searchUser, index) => {
                return (
                  <div key={index} className="flex items-center p-3 space-x-3 hover:bg-white">
                    <Image className="rounded-full" height={40} width={40} alt={`${user.username}'s profilepic`} src={user.profilepic.url} priority={true}/>
                    <Link className="hover:underline" as={`/profile/${user.id}`} href={`/profile/${user.id}`}>{user.username}</Link>
                  </div>
                );
              })
            ) : (
              <div>No results</div>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;
