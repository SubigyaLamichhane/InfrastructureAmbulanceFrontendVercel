import { useRouter } from 'next/router';
import React from 'react';
import HeaderText from '../../components/Base/HeaderText';
import StandardButton from '../../components/buttons/StandardButton';
import Navbar from '../../components/Navbar';
import { Modal } from '@mui/material';

import {
  useComplainsByUserQuery,
  useUserQuery,
  useCompletedComplainsByUserQuery,
} from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { withApollo } from '../../utils/withApollo';
import { Image, CloudinaryContext } from 'cloudinary-react';
import ComplainsDisplayer from '../../components/ComplainsDisplayer';

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

  const [activeComplainModal, setActiveComplainModal] = React.useState(false);
  const [completedComplainModal, setCompletedComplainModal] =
    React.useState(false);
  const [loadingLoadMore, setLoadingMore] = React.useState(false);

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
              className="overflow-auto 
                lg:overflow-auto 
               scrollbar
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
                        key={complain.id}
                        id={complain.id.toString()}
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

  const onLoadMore = async () => {
    setLoadingMore(true);
    await fetchMore({
      variables: {
        limit: variables?.limit,
        cursor:
          data.complainsByUser.complains[
            data.complainsByUser.complains.length - 1
          ].createdAt,
      },
    });
    setLoadingMore(false);
  };

  const onCompletedLoadMore = async () => {
    setLoadingMore(true);
    await fetchMore({
      variables: {
        limit: variables?.limit,
        cursor:
          data.complainsByUser.complains[
            data.complainsByUser.complains.length - 1
          ].createdAt,
      },
    });
    setLoadingMore(false);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 overflow-auto scrollbar">
        <HeaderText>User Profile</HeaderText>
        <div className="flex border-b-2 border-t-2 border-black mt-4">
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
            <h3 className="text-lg font-semibold">
              {userData.user.user.email}
            </h3>
            <h3 className="text-lg font-semibold">
              {userData.user.user.phonenumber}
            </h3>
            <h3 className="text-lg font-semibold">
              {userData.user.user.wardNo}
            </h3>
          </div>
        </div>
        <div className="mt-4 justify-between ">
          <div>
            <StandardButton
              onClick={() => {
                setActiveComplainModal(true);
              }}
            >
              Active Complains
            </StandardButton>
          </div>

          <div className="w-full mt-2">
            <StandardButton
              onClick={() => {
                setCompletedComplainModal(true);
              }}
            >
              Completed Complains
            </StandardButton>
          </div>
        </div>

        {activeComplainModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="lg:hidden flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl text-center font-semibold">
                      Active Complains
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setActiveComplainModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {data && (
                      <ComplainsDisplayer
                        complains={data.complainsByUser.complains}
                        hasMore={data.complainsByUser.hasMore}
                        onLoadMore={onLoadMore}
                        loadingLoadMore={loadingLoadMore}
                      />
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setActiveComplainModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {completedComplainModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="lg:hidden flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl text-center font-semibold">
                      Completed Complains
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setCompletedComplainModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {data && (
                      <ComplainsDisplayer
                        complains={
                          completedData.completedComplainsByUser.complains
                        }
                        hasMore={completedData.completedComplainsByUser.hasMore}
                        onLoadMore={onCompletedLoadMore}
                        loadingLoadMore={loadingLoadMore}
                      />
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setCompletedComplainModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* {renderCompletedComplains()} */}
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
