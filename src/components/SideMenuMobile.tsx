import { Drawer } from '@mui/material';
import { useState } from 'react';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';
import LinkButton from './buttons/LinkButton';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import StandardButton from './buttons/StandardButton';
import LinkButtonTwo from './buttons/LinkButtonTwo';

function SidemenuMobile() {
  const [toggleHam, setToggleHam] = useState(false);
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const router = useRouter();

  const onLogout = async () => {
    await logout({});
    await apolloClient.resetStore();
    router.push('/');
  };

  const renderDashboardButton = () => {
    if (data?.me?.isAdmin) {
      return (
        <div className="mb-2">
          <LinkButton href="/dashboard">Dashboard</LinkButton>
        </div>
      );
    }
  };

  const renderProfileButton = () => {
    // console.log(data?.me);
    if (data?.me) {
      if (!data.me.isAdmin) {
        return (
          <div className="mb-2">
            <LinkButton href={'/profile/' + data.me.id}>My Profile</LinkButton>
          </div>
        );
      }
    }
  };

  let buttons: any = null;

  if (loading) {
    buttons = <div>Loading</div>;
  } else if (!data?.me) {
    buttons = (
      <div className="lg:flex">
        <div className="mb-2">
          <LinkButton href="/login">Login</LinkButton>
        </div>

        <LinkButtonTwo href="/register">Register</LinkButtonTwo>
      </div>
    );
  } else {
    buttons = (
      <div>
        <div className="lg:flex">
          <div className="mb-2 ">{renderDashboardButton()}</div>
          <div className="mb-2">{renderProfileButton()}</div>
          <div className="mb-2">
            <LinkButton href="/create-complain">Create Complain</LinkButton>
          </div>
          <div>
            <StandardButton onClick={onLogout}>Logout</StandardButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="z-10 pt-4">
      <div
        className="absolute right-4 top-5 ml-2 bg-gray-700 rounded-md md:hidden"
        onClick={() => {
          setToggleHam(true);
        }}
      >
        <button className="flex items-center px-3 py-2 rounded text-teal-lighter border-teal-light text-white hover:border-white">
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="mt-10 ">
        <Drawer
          anchor="right"
          open={toggleHam}
          onClose={() => setToggleHam(false)}
        >
          <div className="pt-4 p-2">{buttons}</div>
        </Drawer>
      </div>
    </div>
  );
}

export default SidemenuMobile;
