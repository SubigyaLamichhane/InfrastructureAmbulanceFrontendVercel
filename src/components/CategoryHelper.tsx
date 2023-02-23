import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React from 'react';
import StandardButton from './buttons/StandardButton';
import MapOG from './Map';
import Navbar from './Navbar';

import { Image, CloudinaryContext } from 'cloudinary-react';
import { connect } from 'react-redux';
import { useComplainsQuery, useMeQuery } from '../generated/graphql';
import { StoreStateI } from '../store/reducers';
import { setYellowDotMarker } from '../utils/getMap';
import { isServer } from '../utils/isServer';
import { useComplainsByCategoryQuery } from '../generated/graphql';
import SelectWard from './SelectWardMainPage';
import SelectCategory from './SelectCategoryMainPage';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface IndexHelperProps {}

const IndexHelper: React.FC<IndexHelperProps> = ({}) => {
  const router = useRouter();
  const { category } = router.query;
  const { data, loading, fetchMore, variables } = useComplainsByCategoryQuery({
    variables: {
      limit: 15,
      cursor: null,
      category: category as string,
    },
  });
  console.log('data', data, 'loading', loading, 'variables', variables);
  const { data: meData, loading: MeLoading } = useMeQuery({
    skip: isServer(),
  });

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }

  if (loading) {
    return <div className="flex justify-center mt-10">Loading...</div>;
  }

  if (data) {
    if (data.complainsByCategory.complains.length === 0) {
      return (
        <div className="">
          <Navbar />
          <div className="flex mt-4">
            <div className="ml-11">
              There are no complains in this category.
            </div>
            <div className="flex">
              <div className="mr-2 w-full">
                <SelectWard
                  onChange={(e) => {
                    router.push('/complains/ward/' + e.target.value);
                  }}
                />
              </div>

              <SelectCategory
                value={category as string}
                onChange={(e) => {
                  router.push('/complains/category/' + e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  if (!MeLoading && meData) {
    //if (meData.me) {
    return (
      <div className="">
        <Navbar />

        <div className="flex mt-4">
          {data && (
            //@ts-ignore
            <Map complains={data.complainsByCategory.complains}></Map>
          )}
          <div
            className="
                ml-11 
                overflow-hidden 
                lg:overflow-auto 
                scrollbar:!w-1.5 
                scrollbar:!h-1.5 
                scrollbar:bg-transparent 
                scrollbar-track:!bg-slate-100 
                scrollbar-thumb:!rounded 
                scrollbar-thumb:!bg-slate-300 
                scrollbar-track:!rounded 
                dark:scrollbar-track:!bg-slate-500/[0.16] 
                dark:scrollbar-thumb:!bg-slate-500/50 
                max-h-[550px] 
                supports-scrollbars:pr-2 
              "
          >
            <div className="flex">
              <div className="mr-2 w-full">
                <SelectWard
                  onChange={(e) => {
                    router.push('/complains/ward/' + e.target.value);
                  }}
                />
              </div>

              <SelectCategory
                value={category as string}
                onChange={(e) => {
                  router.push('/complains/category/' + e.target.value);
                }}
              />
            </div>
            {data &&
              data.complainsByCategory.complains.map((complain) => {
                setYellowDotMarker(complain.latitude, complain.longitude);
                return (
                  <div
                    onClick={() => router.push('/complain/' + complain.id)}
                    key={complain.id}
                    id={complain.id}
                    className="
                w-full
                mt-4
                border-2
                rounded-standard 
              border-black 
                p-8
              "
                  >
                    <CloudinaryContext cloudName="infrastructure-ambulance">
                      <div>
                        {complain.imagePublicId && (
                          <Image
                            publicId={complain.imagePublicId}
                            width="500"
                            alt="complain-picture"
                          />
                        )}
                      </div>
                    </CloudinaryContext>
                    <h2
                      className="
                  text-xl
                  font-semibold
                "
                    >
                      {complain.title}
                    </h2>
                    <p>{complain.descriptionSnippet}</p>
                    <div className="mt-2 flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Ward Number:{' '}
                          <span className="text-gray-600">
                            {complain.wardNo}
                          </span>
                        </h3>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Posted By:{' '}
                          <span
                            onClick={() =>
                              router.push('/profile/' + complain.user.user.id)
                            }
                            className="text-gray-600"
                          >
                            {complain.user.user.username}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}

            {data && data.complainsByCategory.hasMore ? (
              <div className="flex my-4">
                <div className="m-auto my-4">
                  <StandardButton
                    onClick={() =>
                      fetchMore({
                        variables: {
                          limit: variables!.limit,
                          cursor:
                            data.complainsByCategory.complains[
                              data.complainsByWard.complains.length - 1
                            ].createdAt,
                        },
                      })
                    }
                  >
                    Load More
                  </StandardButton>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  //  else {
  //   return (
  //     <div>
  //       <Navbar />
  //       Marketing Page
  //     </div>
  //   );
  // }

  return <div>Loading ...</div>;
};

const mapStateToProps = ({ mapLoadedForm }: StoreStateI) => {
  return { mapLoadedForm };
};

export default connect(mapStateToProps, {})(IndexHelper) as any;
