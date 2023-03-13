import React from 'react';
import Spinner from './Base/Spinner';
import StandardButton from './buttons/StandardButton';
import { data } from 'azure-maps-control';
import router from 'next/router';
import { setYellowDotMarker } from '../utils/getMap';
import SelectCategory from './SelectCategoryMainPage';
import SelectWard from './SelectWardMainPage';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { convertToActualDate } from '../utils/convertToActualDate';

interface ComplainsDisplayerProps {
  loadingLoadMore: boolean;
  complains: {
    __typename?: string;
    id: number;
    descriptionSnippet: string;
    title: string;
    createdAt: string;
    latitude: number;
    longitude: number;
    wardNo: number;
    category: string;
    imagePublicId: string;
    user: any;
  }[];
  onLoadMore: () => {};
  hasMore: boolean;
  // setLoadingMore: (arg: boolean) => {};
}

const ComplainsDisplayer: React.FC<ComplainsDisplayerProps> = ({
  loadingLoadMore,
  complains,
  hasMore,
  onLoadMore,
}) => {
  return (
    <div>
      <div
        className="
                lg:ml-2 
                w-[96vw]
                lg:w-[600px]
                overflow-auto 
                scrollbar
                max-h-[80vh] 
                supports-scrollbars:pr-2 
              "
      >
        <div className="flex justify-between">
          <div className="mr-4 w-full">
            <SelectWard
              onChange={(e) => {
                router.push('/complains/ward/' + e.target.value);
              }}
            />
          </div>

          <SelectCategory
            onChange={(e) => {
              router.push('/complains/category/' + e.target.value);
            }}
          />
        </div>
        {/* <h4>All Complains</h4> */}
        {complains.map((complain) => {
          setYellowDotMarker(complain.latitude, complain.longitude);
          return (
            <div
              onClick={() => router.push('/complain/' + complain.id)}
              key={complain.id}
              id={complain.id.toString()}
              className="
                w-full
                mt-4
                border-2
                rounded-lg
                bg-white
                rounded-standard 
              border-black 
                p-8
                md:flex
                cursor-pointer
              "
            >
              <CloudinaryContext
                theme="thumb"
                cloudName="infrastructure-ambulance"
              >
                <div>
                  {complain.imagePublicId && (
                    <Image
                      publicId={complain.imagePublicId}
                      height="300"
                      width="400"
                      alt="complain-picture"
                    />
                  )}
                </div>
              </CloudinaryContext>
              <div className="p-1 md:p-2 w-full lg:max-w-[300px] pb-0 flex flex-col justify-between">
                <div>
                  <h1
                    className="
                    text-lg
                    
                  md:text-2xl
                  font-semibold
                "
                    style={{
                      wordWrap: 'break-word' /* IE 5.5-7 */,
                    }}
                  >
                    {complain.title}
                  </h1>
                  <p className="leading-5 mt-2">
                    {complain.descriptionSnippet}
                  </p>
                </div>

                <div className="mt-2 flex justify-between">
                  <div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[14px] leading-4">
                        Category:{' '}
                        <span className="text-gray-600 font-semibold">
                          {complain.category}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[14px] leading-4">
                        Date:{' '}
                        <span className="text-gray-600 font-semibold">
                          {convertToActualDate(complain.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <p className="text-[14px] leading-4">
                        Ward Number:{' '}
                        <span className="text-gray-600 font-semibold">
                          {complain.wardNo}
                        </span>
                      </p>
                    </div>

                    <div
                      onClick={() =>
                        router.push('/profile/' + complain.user.user.id)
                      }
                    >
                      <p className="text-[14px] leading-4">
                        Posted By:{' '}
                        <span className="text-gray-600 font-semibold">
                          {complain.user.user.username}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {hasMore ? (
          <div className="flex my-4">
            <div className="m-auto my-4">
              {loadingLoadMore ? (
                <Spinner />
              ) : (
                <StandardButton onClick={onLoadMore}>Load More</StandardButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ComplainsDisplayer;
