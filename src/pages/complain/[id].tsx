import React, { useEffect } from "react";
import HeaderText from "../../components/Base/HeaderText";

import {
  useComplainQuery,
  useMeQuery,
  useDeleteComplainMutation,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

import { useRouter } from "next/router";
import { setPulsatingMarker, setYellowDotMarker } from "../../utils/getMap";
import { connect, Provider } from "react-redux";
import { store } from "../../store/store";
import { StoreStateI } from "../../store/reducers";
import Navbar from "../../components/Navbar";
import ComplainHelper from "../../components/ComplainHelper";
import { isServer } from "../../utils/isServer";
import {
  useMarkCompletedMutation,
  useEstimateMutation,
} from "../../generated/graphql";
import { Image, CloudinaryContext } from "cloudinary-react";

interface ComplainProps {}

const Complain: React.FC<ComplainProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const [deleteComplain] = useDeleteComplainMutation();
  const [markCompleted] = useMarkCompletedMutation();
  const [estimate] = useEstimateMutation();
  const [estimateModal, setEstimateModal] = React.useState(false);
  const [estimatedCost, setEstimatedCost] = React.useState(0);
  const [estimatedTime, setEstimatedTime] = React.useState(0);
  // useEffect(() => {
  //   if (data && isMapLoaded) {
  //     setPulsatingMarker(data.complain.latitude, data.complain.longitude);
  //   }
  // }, [isMapLoaded]);

  const { data, loading } = useComplainQuery({
    variables: { id: parseInt(id as string) },
  });

  const { data: meData, loading: MeLoading } = useMeQuery({
    skip: isServer(),
  });
  const [showModal, setShowModal] = React.useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && !data) {
    return <div>The post does not exist</div>;
  }

  // if (data && isMapLoaded) {
  //   setPulsatingMarker(data.complain.latitude, data.complain.longitude);
  // }
  if (!data.complain) {
    return <div>An Error Occured</div>;
  }
  const convertToActualDate = (date: string) => {
    console.log(date);
    const newDate = new Date(parseInt(date));
    console.log(newDate);
    return newDate.toLocaleDateString();
  };

  const renderMarkCompletedButton = () => {
    if (meData.me) {
      if (meData.me.isAdmin) {
        return (
          <div className="flex">
            <button
              onClick={() => {
                markCompleted({
                  variables: { id: parseInt(id as string) },
                  update: (cache) => {
                    cache.evict({ id: "Complain:" + id });
                  },
                });
                router.push("/");
              }}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-4"
            >
              Mark Completed
            </button>
          </div>
        );
      }
    }
  };

  const renderDeleteButton = () => {
    if (meData.me && data.complain) {
      if (data.complain.user.user.id == meData.me.id || meData.me.isAdmin) {
        // console.log(data.complain.user.id, meData.me);
        return (
          <div className="flex">
            <button
              onClick={() => {
                deleteComplain({
                  variables: { id: parseInt(id as string) },
                  update: (cache) => {
                    cache.evict({ id: "Complain:" + id });
                  },
                });
                router.push("/");
              }}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded mr-4"
            >
              Delete
            </button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50000 outline-none focus:outline-none translate-x-4">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl text-gray-600 font-semibold">
                          Delete Complain?
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}

                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-red-500"
                          type="button"
                          onClick={async () => {
                            deleteComplain({
                              variables: { id: parseInt(id as string) },
                              update: (cache) => {
                                cache.evict({ id: "Complain:" + id });
                              },
                            });

                            setShowModal(false);
                            router.push("/");
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        );
      }
    }
  };

  const renderEstimateButton = () => {
    if (meData.me) {
      if (meData.me.isAdmin) {
        return (
          <div className="flex">
            <button
              onClick={() => {
                setEstimateModal(true);
              }}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-4"
            >
              Estimate
            </button>
            {estimateModal ? (
              <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50000 outline-none focus:outline-none translate-x-4">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl text-gray-600 font-semibold">
                          Estimate
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setEstimateModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="estimatedCost"
                          >
                            Estimated Cost
                          </label>
                          <input
                            value={estimatedCost}
                            type="number"
                            onChange={(e) =>
                              setEstimatedCost(parseInt(e.target.value))
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="estimatedCost"
                          ></input>
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="estimatedTime"
                          >
                            Estimated Time
                          </label>
                          <input
                            value={estimatedTime}
                            type="number"
                            onChange={(e) =>
                              setEstimatedTime(parseInt(e.target.value))
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="estimatedTime"
                          ></input>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setEstimateModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-blue-500 rounded-md text-white font-semibold py-2 px-4"
                          type="button"
                          onClick={async () => {
                            await estimate({
                              variables: {
                                id: parseInt(id as string),
                                estimatedCost: estimatedCost,
                                estimatedTime: estimatedTime,
                              },
                              update: (cache) => {
                                cache.evict({ id: "Complain:" + id });
                              },
                            });
                            setEstimateModal(false);
                            // router.push("/");
                          }}
                        >
                          Estimate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      }
    }
  };

  return (
    <div className="p-4">
      <div>
        <Navbar />
        <HeaderText>{data.complain.title}</HeaderText>
        <div className="flex">
          {data && (
            <ComplainHelper
              complain={[data.complain]}
              latitude={data.complain.latitude}
              longitude={data.complain.longitude}
            />
          )}

          <div className="w-full border-b-2  border-black ml-4">
            {" "}
            <CloudinaryContext
              theme="thumb"
              cloudName="infrastructure-ambulance"
            >
              <div>
                {data.complain.imagePublicId && (
                  <Image
                    publicId={data.complain.imagePublicId}
                    height="300"
                    width="400"
                    alt="complain-picture"
                  />
                )}
              </div>
            </CloudinaryContext>
            <div className="flex  border-t-2 border-black mt-4  w-full">
              <div className="mr-4 mb-10 mt-10">
                <h3 className="text-lg font-semibold">Ward Number:</h3>
                <h3 className="text-lg font-semibold">Category:</h3>
                <h3 className="text-lg font-semibold">Created At:</h3>
                <h3 className="text-lg font-semibold">Posted By:</h3>
                <h3 className="text-lg font-semibold">Username:</h3>
                <h3 className="text-lg font-semibold">Phone Number:</h3>
                <h3 className="text-lg font-semibold">Email:</h3>
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold">
                  {data.complain.wardNo}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.category}
                </h3>
                <h3 className="text-lg font-semibold">
                  {convertToActualDate(data.complain.createdAt.toString())}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.firstname}{" "}
                  {data.complain.user.user.lastname}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.username}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.phonenumber}
                </h3>
                <h3 className="text-lg font-semibold">
                  {data.complain.user.user.email}
                </h3>
              </div>
            </div>
            <p className="md:text-lg">{data.complain.description}</p>
            {data.complain.estimated === true ? (
              <div>
                <p>Estimated Cost: Rs.{data.complain.estimatedCost}</p>
                <p>Estimated Time: {data.complain.estimatedTime} hrs</p>
              </div>
            ) : (
              <div>
                <p className="text-red-600">
                  This Complain is awaiting to be verified and estimated.
                </p>
              </div>
            )}
            <div className="flex mb-4 ">
              {renderDeleteButton()}
              {renderMarkCompletedButton()}
              {renderEstimateButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithProvider: React.FC<ComplainProps> = ({}) => {
  return (
    <Provider store={store}>
      <Complain />
    </Provider>
  );
};

export default withApollo({ ssr: false })(WithProvider);
