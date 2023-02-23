import { useRouter } from 'next/router';
import React from 'react';
import HeaderText from '../../components/Base/HeaderText';
import StandardButton from '../../components/buttons/StandardButton';
import Navbar from '../../components/Navbar';

import {
  useComplainsByUserQuery,
  useUserQuery,
  useCompletedComplainsByUserQuery,
} from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { withApollo } from '../../utils/withApollo';
import { Image, CloudinaryContext } from 'cloudinary-react';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      id: parseInt(id as string),
    },
  });
  const { data, loading, fetchMore, variables } = useComplainsByUserQuery({
    variables: {
      limit: 15,
      userId: parseInt(id as string),
      cursor: null,
    },
  });
  const {
    data: completedData,
    loading: completedLoading,
    fetchMore: completedFetchMore,
    variables: completedVariables,
  } = useCompletedComplainsByUserQuery({
    variables: {
      limit: 15,
      cursor: null,
      userId: parseInt(id as string),
    },
  });

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }
  if (loading && userLoading) {
    return <div>Loading ...</div>;
  }
  if (!userLoading && !userData.user.user) {
    return <div>The user with id: {id} does not exist.</div>;
  }

  const convertToActualDate = (date: string) => {
    console.log(date);
    const newDate = new Date(parseInt(date));
    console.log(newDate);
    return newDate.toLocaleDateString();
  };

  const renderCompletedComplains = () => {
    if (completedData) {
      if (completedData?.completedComplainsByUser.complains.length != 0) {
        console.log('ran');
        return (
          <div
            className="
                ml-11 
                
              "
          >
            <h4>Completed Complains:</h4>
            {/* <p> Total: {completedComplainCountData?.completedComplainsCount}</p> */}
            <div
              className="overflow-hidden 
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
                supports-scrollbars:pr-2 "
            >
              {completedData &&
                completedData.completedComplainsByUser.complains.map(
                  (complain) => {
                    // setYellowDotMarker(complain.latitude, complain.longitude);
                    return (
                      <div
                        onClick={() =>
                          router.push('/completed-complain/' + complain.id)
                        }
                        key={complain.d}
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
                              Date:{' '}
                              <span className="text-gray-600">
                                {convertToActualDate(complain.createdAt)}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

              {completedData &&
              completedData.completedComplainsByUser.hasMore ? (
                <div className="flex my-4">
                  <div className="m-auto my-4">
                    <StandardButton
                      onClick={() =>
                        fetchMore({
                          variables: {
                            limit: variables!.limit,
                            cursor:
                              completedData.completedComplainsByUser.complains[
                                completedData.completedComplainsByUser.complains
                                  .length - 1
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
        );
      }
    }
  };

  return (
    <div>
      <Navbar />

      <HeaderText>User Profile</HeaderText>
      <div className="flex  border-b-2 border-t-2 border-black mt-4">
        <div className="mr-4 mb-10 mt-10">
          <h3 className="text-lg font-semibold">Username:</h3>
          <h3 className="text-lg font-semibold">Name:</h3>
          <h3 className="text-lg font-semibold">Email:</h3>
          <h3 className="text-lg font-semibold">Phone Number:</h3>
          <h3 className="text-lg font-semibold">Ward Number:</h3>
        </div>
        <div className="mt-10">
          <h3 className="text-lg font-semibold">
            {userData.user.user.username}
          </h3>
          <h3 className="text-lg font-semibold">
            {userData.user.user.firstname + ' ' + userData.user.user.lastname}
          </h3>
          <h3 className="text-lg font-semibold">{userData.user.user.email}</h3>
          <h3 className="text-lg font-semibold">
            {userData.user.user.phonenumber}
          </h3>
          <h3 className="text-lg font-semibold">{userData.user.user.wardNo}</h3>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex">
          <div
            className="
                ml-11 
                
              "
          >
            <h4>Active Complains:</h4>
            {/* <p> Total: {complainCountData?.complainsCount}</p> */}
            <div
              className="overflow-hidden 
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
                supports-scrollbars:pr-2 "
            >
              {data &&
                data.complainsByUser.complains.map((complain) => {
                  // setYellowDotMarker(complain.latitude, complain.longitude);
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
                            Date:{' '}
                            <span className="text-gray-600">
                              {convertToActualDate(complain.createdAt)}
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {data && data.complainsByUser.hasMore ? (
                <div className="flex my-4">
                  <div className="m-auto my-4">
                    <StandardButton
                      onClick={() =>
                        fetchMore({
                          variables: {
                            limit: variables!.limit,
                            cursor:
                              data.complainsByUser.complains[
                                data.complainsByUser.complains.length - 1
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
          </div>{' '}
          {renderCompletedComplains()}
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
