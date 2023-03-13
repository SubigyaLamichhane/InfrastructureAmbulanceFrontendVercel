import React from 'react';
import Link from 'next/link';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';
import BalenChasma from '../assests/Asset 2.png';
import Image from 'next/image';
import LinkButton from './buttons/LinkButton';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import StandardButton from './buttons/StandardButton';
import LinkButtonTwo from './buttons/LinkButtonTwo';
import SidemenuMobile from './SideMenuMobile';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const onLogout = async () => {
    await logout({});
    await apolloClient.resetStore();
    router.push('/');
  };

  const renderDashboardButton = () => {
    if (data?.me?.isAdmin) {
      return (
        <div className="mr-2">
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
          <div className="mr-2">
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
      <div className="hidden lg:visible lg:flex">
        <div className="mr-2">
          <LinkButton href="/login">Login</LinkButton>
        </div>

        <LinkButtonTwo href="/register">Register</LinkButtonTwo>
      </div>
    );
  } else {
    buttons = (
      <div>
        <div className="hidden lg:visible lg:flex">
          <div className="mr-2">{renderDashboardButton()}</div>
          <div className="mr-2">{renderProfileButton()}</div>
          <div className="mr-2">
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
    <div className="flex justfy-between mb-6 py-3 md:pt-4 bg-gradient-to-r to-[#f6f9be] from-[#f2efe9] justify-between items-center md:pb-4 pr-2 shadow-xl">
      <Link href="/">
        <div className="flex items-center">
          <div className="hidden md:visible md:block scale-50 md:scale-75">
            <Image src={BalenChasma} alt="Logo" />
          </div>
          <div className="">
            <h1 className="ml-3 text-xl md:text-2xl mr-auto">
              Infrastructure
              <br />
              Ambulance
            </h1>
          </div>
        </div>
      </Link>{' '}
      <SidemenuMobile />
      {buttons}
    </div>
  );
};

export default Navbar;
