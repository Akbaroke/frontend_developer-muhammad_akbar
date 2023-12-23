import { useEffect, useState } from 'react';
import Container from './Container';
import axios from 'axios';
import getCurrentDateTimeFormatted from '../utils/getCurrentDateTimeFormatted';
import CardContent, { PropsContent } from './CardContent';
import SelectComp from './SelectComp';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import cn from '../utils/cn';
import { useSearchParams } from 'react-router-dom';

export default function ListPost() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const [dataListPost, setDataListPost] = useState<PropsContent[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPerPage, setshowPerPage] = useState(
    searchParams.get('page') ? parseInt(searchParams.get('page') || '10') : 10
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get('sort') ? searchParams.get('sort') || 'newest' : 'newest'
  );
  const visiblePages = 5;

  useEffect(() => {
    setSearchParams({ page: showPerPage.toString(), sort: sortBy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPerPage, sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPage = async (pageNumber: number) => {
          const response = await axios.get(
            `${apiUrl}?filter[published_until]=${getCurrentDateTimeFormatted()}&append[]=small_image`,
            {
              params: {
                'page[number]': pageNumber,
                'page[size]': 20,
                'append[]': 'medium_image',
              },
            }
          );
          return response.data.data;
        };

        const page1Data = await fetchPage(1);
        const page2Data = await fetchPage(2);

        const combinedData = [...page1Data, ...page2Data];
        setDataListPost(combinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const sortData = dataListPost.sort((a, b) =>
    sortBy === 'newest'
      ? new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      : new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
  );

  const indexOfLastItem = currentPage * showPerPage;
  const indexOfFirstItem = indexOfLastItem - showPerPage;
  const currentItems = sortData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortData.length / showPerPage);
  const countPag = Math.ceil(totalPages / visiblePages);
  const currentPaginate = Math.ceil(currentPage / visiblePages);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handlePrevPag = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleNextPag = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    let startPage = 1;
    let endPage = totalPages > visiblePages ? visiblePages : totalPages;
    if (currentPage >= visiblePages + 1) {
      startPage += visiblePages;
      endPage = totalPages;
    }

    buttons.push(
      <div className="flex">
        <button
          key="prevPag"
          className={cn('p-2 rounded-lg cursor-pointer', {
            'text-secondary/50 cursor-not-allowed': currentPaginate === 1,
          })}
          onClick={currentPaginate === 1 ? () => null : handlePrevClick}>
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>
        <button
          key="prev"
          className={cn('p-2 rounded-lg cursor-pointer', {
            'text-secondary/50 cursor-not-allowed': !(currentPage > 1),
          })}
          onClick={currentPage > 1 ? handlePrevPag : () => null}>
          <MdKeyboardArrowLeft size={20} />
        </button>
      </div>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li
          key={i}
          className={cn(
            'p-2 px-3 rounded-lg cursor-pointer',
            i === currentPage && 'bg-primary text-white'
          )}
          onClick={() => paginate(i)}>
          {i}
        </li>
      );
    }

    buttons.push(
      <div className="flex">
        <button
          key="next"
          className={cn('p-2 rounded-lg cursor-pointer', {
            'text-secondary/50 cursor-not-allowed': !(currentPage < totalPages),
          })}
          onClick={currentPage < totalPages ? handleNextClick : () => null}>
          <MdKeyboardArrowRight size={20} />
        </button>
        <button
          key="nextPag"
          className={cn('p-2 rounded-lg cursor-pointer', {
            'text-secondary/50 cursor-not-allowed': currentPaginate >= countPag,
          })}
          onClick={currentPaginate >= countPag ? () => null : handleNextPag}>
          <MdKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
    );

    return buttons;
  };

  return (
    <Container className="w-max flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1>
          Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{' '}
          {dataListPost.length}
        </h1>
        <div className="flex gap-5">
          <div className="flex items-center gap-4">
            <p>Show per page:</p>
            <SelectComp
              data={['10', '20', '50']}
              onChange={(e) => {
                setCurrentPage(1);
                setshowPerPage(Number(e));
              }}
              value={showPerPage.toString()}
            />
          </div>
          <div className="flex items-center gap-4">
            <p>Sort by:</p>
            <SelectComp
              data={[
                {
                  label: 'Newest',
                  value: 'newest',
                },
                {
                  label: 'Oldest',
                  value: 'oldest',
                },
              ]}
              onChange={(e) => setSortBy(e)}
              value={sortBy}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-4 md:gap-5 xl:gap-7">
        {currentItems?.map((item, index) => (
          <CardContent key={index} {...item} />
        ))}
      </div>
      <ul className="flex gap-2 w-max m-auto mt-16">
        {renderPaginationButtons()}
      </ul>
    </Container>
  );
}
