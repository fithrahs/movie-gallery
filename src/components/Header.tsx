import CustomDropdown from '@/components/CustomDropdown';
import Link from 'next/link';

interface IHeader {
  setSearch:(payload: string) => void,
  yearList: number[],
  setSelectedYear:(paylaod:string) => void,
}

export default function Header({setSearch, yearList, setSelectedYear}: IHeader) {
  let filterTimeout: any;
  const debounce = (value: string) => {
    clearTimeout(filterTimeout);
    
    filterTimeout = setTimeout(() => {
      setSearch(value)
    }, 500)
  }

  const handleChangeValue = (payload: string) => {
    debounce(payload)
  }
  return (
      <header>
        <nav className="bg-gray-900 border-gray-200 px-10 py-2.5 z-20 fixed top-0 w-full">
          <div className="flex flex-wrap flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Movie
              </span>
            </Link>
            <div className="flex items-center my-5 md:my-0 w-56">
              <form>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-4 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-700" placeholder="Search" onChange={(e) => handleChangeValue(e.target.value)} />
                  </div>
              </form>
            </div>
            <CustomDropdown yearList={yearList} setSelectedYear={setSelectedYear}/>
          </div>
        </nav>
      </header>
  );
}
