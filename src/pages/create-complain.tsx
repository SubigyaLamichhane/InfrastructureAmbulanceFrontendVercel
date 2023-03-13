import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderText from '../components/Base/HeaderText';
import NextButton from '../components/buttons/NextButton';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';
import { FileUploader } from 'react-drag-drop-files';
import { ArrowRightIcon } from '@chakra-ui/icons';
// import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {
  ComplainInput,
  ComplainsByUserDocument,
  ComplainsDocument,
  ComplainsQuery,
  useCreateComplainMutation,
} from '../generated/graphql';
import { client, withApollo } from '../utils/withApollo';

import { Form, Formik } from 'formik';
import Router from 'next/router';
import { Provider } from 'react-redux';
import SelectCategory from '../components/SelectCategory';
import SelectWard from '../components/SelectWard';
import TextArea from '../components/TextArea';
import { store } from '../store/store';
import { Image, CloudinaryContext } from 'cloudinary-react';
import dynamic from 'next/dynamic';
import ComplainsDisplayer from '../components/ComplainsDisplayer';
import StandardButton from '../components/buttons/StandardButton';
import { gql } from 'urql';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface CreateComplainProps {}

interface FormValuesType {
  category: 'Category' | 'Sewage' | 'Road' | 'Electricity' | 'Water';
  title: string;
  description: string;
  wardNo: 'Ward No.' | number;
}

interface CloudinaryResponse {
  public_id: string;
  height: number;
  url: string;
  placeholder: string | false;
  original_filename: string;
}

let latitudeAndLongitudeActual: {
  latitude: number | null;
  longitude: number | null;
} = {
  latitude: null,
  longitude: null,
};

const CreateComplain: React.FC<CreateComplainProps> = ({}) => {
  const [createComplain] = useCreateComplainMutation();
  const [imagePublicId, setImagePublicId] = useState('');
  const [imageSelected, setImageSelected] = useState<FileList[0]>();
  const [loading, setLoading] = useState(false);
  const [mapModal, setMapModal] = useState(false);

  // useEffect(() => {

  // })

  const uploadImage = async (e) => {
    console.log(e);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', e);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY);
    const response: { data: CloudinaryResponse } = await axios.post(
      'https://api.cloudinary.com/v1_1/infrastructure-ambulance/image/upload',
      formData
    );

    setImagePublicId(response.data.public_id);
    setLoading(false);
  };

  const [latitudeAndLongitude, setLatitudeAndLongitude] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        setLatitudeAndLongitude({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        latitudeAndLongitudeActual = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      {/* <HeaderText>Report a problem</HeaderText> */}
      <div className="flex justify-between mt-4 px-4 overflow-auto">
        <div className="hidden lg:visible lg:block p-0.5 border-2 border-[#374151] rounded-lg bg-white">
          {/* @ts-ignore */}
          <Map
            // @ts-ignore
            complains={[
              {
                id: 'create-complain',
              },
            ]}
            latlng={[
              latitudeAndLongitude.latitude,
              latitudeAndLongitude.longitude,
            ]}
            onClick={(e: any) => {
              latitudeAndLongitudeActual = {
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
              };
              setLatitudeAndLongitude({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
              });
              console.log(latitudeAndLongitudeActual);
            }}
          />
        </div>

        <div className="w-full md:w-3/6 lg:ml-10">
          <Formik
            initialValues={
              {
                category: 'Category',
                wardNo: 'Ward No.',
                title: '',
                description: '',
              } as FormValuesType
            }
            onSubmit={async (values: FormValuesType, { setErrors }) => {
              // console.log(values);
              if (values.category === 'Category') {
                console.log('ran');
                setErrors({
                  category: 'This field is required.',
                });
              } else if (!values.title) {
                setErrors({
                  title: 'Please enter the title.',
                });
              } else if (!values.description) {
                setErrors({
                  description: 'Please enter the description.',
                });
              } else if (values.wardNo === 'Ward No.') {
                setErrors({
                  wardNo: 'Please enter the Ward No.',
                });
                //@ts-ignore
                // } else if (!window.latitude && !window.longitude) {
                //   setErrors({
                //     description: 'Please enter the location on the map',
                //   });
              } else if (!imagePublicId) {
                setErrors({
                  description: 'Select an image',
                });
              } else if (!latitudeAndLongitudeActual.latitude) {
                setErrors({
                  description: 'Select the location on the map',
                });
              } else {
                const response = await createComplain({
                  variables: {
                    input: {
                      category: values.category,
                      description: values.description,
                      //@ts-ignore
                      // latitude: window.latitude,
                      //@ts-ignore
                      // longitude: window.longitude,
                      latitude: latitudeAndLongitudeActual.longitude,
                      longitude: latitudeAndLongitudeActual.latitude,
                      title: values.title,
                      wardNo: parseInt(values.wardNo.toString()),
                      imagePublicId,
                    } as ComplainInput,
                  },

                  // update: (store, { data }) => {
                  //   // const complainsData = store.readQuery<ComplainsQuery>({
                  //   //   query: ComplainsDocument,
                  //   // });
                  //   let complainsData = store.readQuery<ComplainsQuery>({
                  //     query: ComplainsDocument,
                  //     variables: {
                  //       limit: 15,
                  //       cursor: null,
                  //     },
                  //   });
                  //   console.log('1', complainsData);
                  //   if (complainsData) {
                  //     const array = [];
                  //     array.push(data.createComplain);

                  //     complainsData.complains.complains.forEach((complain) => {
                  //       array.push(complain);
                  //     });
                  //     console.log(array);
                  //     store.writeQuery<ComplainsQuery>({
                  //       query: ComplainsDocument,
                  //       data: {
                  //         complains: {
                  //           ...complainsData.complains,
                  //           complains: array,
                  //         },
                  //       },
                  //       variables: {
                  //         limit: 15,
                  //         cursor: null,
                  //       },
                  //     });
                  //     complainsData = store.readQuery<ComplainsQuery>({
                  //       query: ComplainsDocument,
                  //       variables: {
                  //         limit: 15,
                  //         cursor: null,
                  //       },
                  //     });
                  //     console.log('2', complainsData);
                  //   }
                  // },
                  update: (cache, { data }) => {
                    console.log(data);
                    cache.modify({
                      fields: {
                        complains(existingComplains = []) {
                          const newComplainRef = cache.writeFragment({
                            data: data.createComplain,
                            fragment: gql`
                              fragment NewComplain on Complain {
                                id
                                title
                                description
                                category
                                wardNo
                                createdAt
                                updatedAt
                                imagePublicId
                                latitude
                                longitude
                                user {
                                  id
                                  username
                                }
                              }
                            `,
                          });
                          return [newComplainRef, ...existingComplains];
                        },
                      },
                    });
                  },
                });
                Router.push('/');

                if (response.data.createComplain.id) {
                } else {
                  setErrors({
                    description: 'An error occured.',
                  });
                }
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => {
              return (
                <Form autoComplete="off">
                  <div>
                    <div className="mt-4">
                      <h1 className="text-4xl mb-2">Create Complain</h1>
                      <div className="flex justify-between ">
                        <div className="w-full mr-2">
                          <SelectCategory name="category" />
                        </div>

                        <div className="w-full">
                          <SelectWard name="wardNo" />
                        </div>
                      </div>

                      <InputField
                        name="title"
                        key="title"
                        label="Title"
                        placeholder="Enter Title..."
                      />
                      <TextArea
                        name="description"
                        type="text-area"
                        key="description"
                        label="Description"
                        placeholder="Enter Description..."
                      />
                      <div className="lg:flex justify-between">
                        {/* <label id="file_uploader">
                          <input
                            type="file"
                            name="upload"
                            onChange={(e) =>
                              setImageSelected(e.target.files[0])
                            }
                            accept="image/*"
                            id="file_uploader"
                            placeholder="Pictures can help us identify issues"
                          ></input>
                          <button type="button" onClick={uploadImage}>
                            Upload Image
                          </button>
                        </label> */}
                        {loading && (
                          <div className="flex items-center justify-center space-x-2">
                            <div
                              className="spinner-border border-gray-700 animate-spin2 inline-block w-12 h-12 border-4 rounded-full"
                              style={{
                                borderRightColor: 'transparent',
                              }}
                              role="status"
                            >
                              {/* <span className="visually-hidden">
                                Loading...
                              </span> */}
                            </div>
                          </div>
                        )}
                        {!imagePublicId && !loading && (
                          <FileUploader
                            label="Drag and Drop or Click to Upload"
                            className="h-40"
                            onClick={(e) => {
                              e.target.value = null;
                            }}
                            handleChange={uploadImage}
                            name="file"
                            types={[
                              'JPEG',
                              'JPG',
                              'PNG',
                              'GIF',
                              'BMP',
                              'TIFF',
                              'PSD',
                              'AI',
                              'EPS',
                              'SVG',
                              'ICO',
                              'PDF',
                              'RAW',
                            ]}
                          />
                        )}
                        <CloudinaryContext cloudName="infrastructure-ambulance">
                          <div>
                            {!loading && imagePublicId && (
                              <div className="flex">
                                <Image
                                  publicId={imagePublicId}
                                  width="200"
                                  alt="complain-picture"
                                />
                                <button
                                  className="p-2 bg-gray-700
                                  ml-2
                                  rounded-xl text-white
                                  h-10
                                  hover:bg-gray-600"
                                  onClick={() => {
                                    setImagePublicId('');
                                  }}
                                >
                                  Change
                                </button>
                              </div>
                            )}
                          </div>
                        </CloudinaryContext>{' '}
                        <div className="mt-2 lg:hidden">
                          <StandardButton
                            onClick={() => {
                              setMapModal(true);
                            }}
                          >
                            Select Location
                          </StandardButton>
                        </div>
                        <div className="mt-2 lg:mt-2">
                          <NextButton>
                            <span className="mr-16 group-hover:mr-32">
                              Submit
                            </span>
                            <ArrowRightIcon></ArrowRightIcon>
                          </NextButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {mapModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className="p-0.5 border-2 border-[#374151] rounded-lg bg-white">
                        {/* @ts-ignore */}
                        <Map
                          // @ts-ignore
                          complains={[
                            {
                              id: 'modal',
                            },
                          ]}
                          latlng={[
                            latitudeAndLongitude.latitude,
                            latitudeAndLongitude.longitude,
                          ]}
                          onClick={(e: any) => {
                            latitudeAndLongitudeActual = {
                              latitude: e.latlng.lat,
                              longitude: e.latlng.lng,
                            };
                            setLatitudeAndLongitude({
                              latitude: e.latlng.lat,
                              longitude: e.latlng.lng,
                            });
                            console.log(latitudeAndLongitudeActual);
                          }}
                        />
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setMapModal(false)}
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
        </div>
      </div>
    </div>
  );
};

const WithProvider: React.FC<CreateComplainProps> = ({}) => {
  return (
    <Provider store={store}>
      <CreateComplain />
    </Provider>
  );
};

export default withApollo({ ssr: false })(WithProvider);
