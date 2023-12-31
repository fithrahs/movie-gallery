"use client";
import { useEffect, useRef, useState } from "react";

interface IDropdown {
  yearList: any[],
  setSelectedYear:(paylaod:string) => void,
}

// component ini digunakan untuk membuat dropdown filter by year
// component ini memerlukan parameter list tahun yang akan di jadikan menu filter
export default function CustomDropdown({yearList, setSelectedYear}: IDropdown): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option.toString().toLowerCase().includes('show')) {
      setSelectedYear('')
    } else {
      setSelectedYear(option)
    }
    setIsOpen(false);
  };

  const selecOptionDDRef = useRef<HTMLDivElement>(null);

  function outsideHanlerClick(event: MouseEvent): void {
    if (
      selecOptionDDRef.current &&
      !selecOptionDDRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", outsideHanlerClick);
    return () => {
      document.removeEventListener("click", outsideHanlerClick);
    };
  }, []);

  if(yearList[0]?.toString() !== 'Show All') {
    yearList.unshift('Show All')
  }
  
  return (
    <div className="relative inline-block text-left">
      <div ref={selecOptionDDRef}>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className='inline-flex justify-between items-center text-left w-56 px-4 py-2 text-sm font-normal text-white rounded-lg bg-gray-700 hover:bg-gray-500'
            id="dropdown-toggle"
            onClick={toggleDropdown}
          >
            {selectedOption ? selectedOption : 'Filter by year'}
            <svg
              className="-mr-1 ml-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </button>
        </span>
        {isOpen && (
          <div
            className='origin-top-right absolute right-0 py-3 px-3 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y z-50'
          >
            <div className="overflow-y-auto overflow-x-hidden max-h-52 custom-scrollbar">
              {yearList
                .map((option) => (
                  <div
                    key={option}
                    className="py-2 px-2 hover:bg-gray-500 cursor-pointer text-sm text-white"
                    onClick={() => handleOptionClick(option.toString())}
                  >
                    {option}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
