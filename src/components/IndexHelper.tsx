import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import StandardButton from '../components/buttons/StandardButton';
import MapOG from '../components/Map';
import Navbar from '../components/Navbar';
import BalenChasma from '../assests/Asset 2.png';
import { convertToActualDate } from '../utils/convertToActualDate';

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
import Spinner from './Base/Spinner';
import LoadingPage from './LoadingPage';
import ComplainsDisplayer from './ComplainsDisplayer';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface IndexHelperProps {}

const IndexHelper: React.FC<IndexHelperProps> = ({}) => {
  const router = useRouter();
  const { data, loading, refetch, fetchMore, variables } = useComplainsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
  });
  const [loadingLoadMore, setLoadingMore] = useState(false);
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

  const [wardNo, setWardNo] = React.useState('Ward No.');

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (!MeLoading && meData) {
    const onLoadMore = async () => {
      setLoadingMore(true);
      await fetchMore({
        variables: {
          limit: variables?.limit,
          cursor:
            data.complains.complains[data.complains.complains.length - 1]
              .createdAt,
        },
      });
      setLoadingMore(false);
    };

    //if (meData.me) {
    return (
      <div className="bg-gray-300 overflow-hidden">
        <Navbar />

        <div className="flex justify-between px-4">
          {data && (
            <ComplainsDisplayer
              complains={data.complains.complains}
              hasMore={data.complains.hasMore}
              onLoadMore={onLoadMore}
              loadingLoadMore={loadingLoadMore}
            />
          )}
          {data && (
            <div className="p-0.5 border-2 border-[#374151] rounded-lg bg-white">
              {/* 
  // @ts-ignore */}
              <Map complains={data.complains.complains}></Map>
            </div>
          )}
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
