import CustomDropdown from "@/components/CustomDropdown";
import { ISearchKeyword } from "@/interfaces/index";
import Link from "next/link";
import { useState } from "react";

interface IHeader {
  setSearch: (payload: string) => void;
  yearList: number[];
  setSelectedYear: (paylaod: string) => void;
  searchList?: ISearchKeyword[];
}

export default function Header({
  setSearch,
  yearList,
  setSelectedYear,
  searchList,
}: IHeader) {

  const [searchValue, setSearchValue] = useState<string>('')
  const [isShowAutoComplete, setIsShowAutoComplete] = useState<boolean>(false)

  // setup debounce
  let filterTimeout: any;
  const debounce = (value: string) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setSearch(value);
    }, 500);
  };
  
  // this function for change search the value and set show auto complete (for showing the auto complete)
  const handleChangeValue = (payload: string) => {
    setIsShowAutoComplete(true)
    setSearchValue(payload)
    debounce(payload);
  };
  
  return (
    <header>
      <nav className="bg-gray-900 border-gray-200 px-10 py-2.5 z-20 fixed top-0 w-full">
        <div className="flex flex-wrap flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Movie
            </span>
          </Link>
          <div className="flex items-center my-5 md:my-0 w-56 relative">
            <form autoComplete='off'>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 pl-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-700"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => handleChangeValue(e.target.value)}
                />
              </div>
            </form>
            {searchList && searchList.length > 0 && isShowAutoComplete && (
              <div className="absolute top-10 py-3 px-3 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                <div className="overflow-y-auto overflow-x-hidden max-h-52 custom-scrollbar">
                  {searchList.map((item) => (
                    <div
                      key={item.id}
                      className="py-2 px-2 hover:bg-gray-500 cursor-pointer text-sm text-white"
                      onClick={() => {handleChangeValue(item.name); setIsShowAutoComplete(false)}}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <CustomDropdown
            yearList={yearList}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </nav>
    </header>
  );
}
