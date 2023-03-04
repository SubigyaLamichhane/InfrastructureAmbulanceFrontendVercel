import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React from 'react';
import StandardButton from '../components/buttons/StandardButton';
import MapOG from '../components/Map';
import Navbar from '../components/Navbar';
import BalenChasma from '../assests/Asset 2.png';

import { Image, CloudinaryContext } from 'cloudinary-react';
import NextImage from 'next/image';
import { connect } from 'react-redux';
import {
  useComplainsQuery,
  useMeQuery,
  useComplainsByWardQuery,
} from '../generated/graphql';
import { StoreStateI } from '../store/reducers';
import { setYellowDotMarker } from '../utils/getMap';
import { isServer } from '../utils/isServer';
import SelectWard from './SelectWardMainPage';
import SelectCategory from './SelectCategoryMainPage';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface IndexHelperProps {}

const IndexHelper: React.FC<IndexHelperProps> = ({}) => {
  const router = useRouter();
  const { data, loading, fetchMore, variables } = useComplainsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
  });
  const { data: meData, loading: MeLoading } = useMeQuery({
    skip: isServer(),
  });

  // const { wardsData, wardsLoading, wardsFetchMore, wardsVariables } =
  //   useComplainsByWardQuery({
  //     variables: {
  //       limit: 15,
  //       cursor: null,
  //       wardNo: 1,
  //     },
  //   });

  const convertToActualDate = (date: string) => {
    console.log(date);
    const newDate = new Date(parseInt(date));
    console.log(newDate);
    return newDate.toLocaleDateString();
  };

  const [wardNo, setWardNo] = React.useState('Ward No.');

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <NextImage src={BalenChasma} alt="Logo" />
      </div>
    );
  }

  if (!MeLoading && meData) {
    //if (meData.me) {
    return (
      <div className="bg-gray-300">
        <Navbar />

        <div className="flex justify-between px-4">
          {data && (
            //@ts-ignore
            <Map complains={data.complains.complains}></Map>
          )}
          <div
            className="
                ml-11 
                
                w-full
                lg:overflow-auto 
                scrollbar
                max-h-[550px] 
                supports-scrollbars:pr-2 
              "
          >
            <div className="flex justify-between">
              <div className="mr-2 w-full">
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
            {data &&
              data.complains.complains.map((complain) => {
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
                flex
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
                            width="300"
                            alt="complain-picture"
                          />
                        )}
                      </div>
                    </CloudinaryContext>
                    <div className="p-2 flex flex-col justify-between">
                      <div>
                        <h2
                          className="
                  text-xl
                  font-semibold
                "
                        >
                          {complain.title}
                        </h2>
                        <p>{complain.descriptionSnippet}</p>
                      </div>
                      <div className="mt-2 justify-between">
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
                        <div>
                          <h3 className="text-lg font-semibold">
                            Date:{' '}
                            <span className="text-gray-600">
                              {convertToActualDate(complain.createdAt)}
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {data && data.complains.hasMore ? (
              <div className="flex my-4">
                <div className="m-auto my-4">
                  <StandardButton
                    onClick={() =>
                      fetchMore({
                        variables: {
                          limit: variables!.limit,
                          cursor:
                            data.complains.complains[
                              data.complains.complains.length - 1
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
