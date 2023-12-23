import LazyLoad from 'react-lazy-load';
import formatDate from '../utils/formatDate';
import { useState } from 'react';

export type PropsContent = {
  title: string;
  small_image: ImageType[];
  medium_image: ImageType[];
  updated_at: string;
};

type ImageType = {
  id: number;
  mime: string;
  file_name: string;
  url: string;
};

export default function CardContent({
  title,
  small_image,
  medium_image,
  updated_at,
}: PropsContent) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col w-full sm:w-[240px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl [&>div>img]:hover:scale-110 duration-500">
      <div className="sm:h-[150px] overflow-hidden">
        <LazyLoad className="w-full h-full">
          {isLoaded ? (
            <img
              src={medium_image[0].url}
              alt={title}
              title={title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
          ) : (
            <img
              src={small_image[0].url}
              alt={title}
              title={title}
              className="w-full h-full object-cover object-center transition-all duration-500"
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </LazyLoad>
      </div>
      <div className="p-4">
        <p className="text-secondary/60 font-medium text-[14px]">
          {formatDate(new Date(updated_at))}
        </p>
        <h1 className="text-secondary font-medium overflow-hidden line-clamp-3">
          {title}
        </h1>
      </div>
    </div>
  );
}
