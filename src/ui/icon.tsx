import Account from 'assets/icons/account.svg';
import AccountO from 'assets/icons/account-o.svg';
import Alert from 'assets/icons/alert.svg';
import Attractions from 'assets/icons/attractions.svg';
import Back from 'assets/icons/back.svg';
import Categories from 'assets/icons/categories.svg';
import Check from 'assets/icons/check.svg';
import Church from 'assets/icons/church.svg';
import Close from 'assets/icons/close.svg';
import DarkMode from 'assets/icons/darkMode.svg';
import Dates from 'assets/icons/dates.svg';
import Dollar from 'assets/icons/dollar.svg';
import Edit from 'assets/icons/edit.svg';
import Explore from 'assets/icons/explore.svg';
import ExploreO from 'assets/icons/explore-o.svg';
import Forward from 'assets/icons/forward.svg';
import Info from 'assets/icons/info.svg';
import Lock from 'assets/icons/lock.svg';
import LockO from 'assets/icons/lock-o.svg';
import LogOut from 'assets/icons/logout.svg';
import Mail from 'assets/icons/mail.svg';
import MailO from 'assets/icons/mail-o.svg';
import Market from 'assets/icons/market.svg';
import Monument from 'assets/icons/monument.svg';
import Museum from 'assets/icons/museum.svg';
import Neighborhood from 'assets/icons/neighborhood.svg';
import Park from 'assets/icons/park.svg';
import Search from 'assets/icons/search.svg';
import Street from 'assets/icons/street.svg';
import Time from 'assets/icons/time.svg';
import Travel from 'assets/icons/travel.svg';
import TravelO from 'assets/icons/travel-o.svg';
import User from 'assets/icons/user.svg';
import UserO from 'assets/icons/user-o.svg';
import Visibility from 'assets/icons/visibility.svg';
import VisibilityO from 'assets/icons/visibility-o.svg';
import type { FC } from 'react';
import React from 'react';
import type { SvgProps } from 'react-native-svg';

import { useThemeConfig } from '@/core/use-theme-config';

type Props = {
  name: string;
  isFocused?: boolean;
  fill?: string;
  [key: string]: any;
};

interface Icons {
  [key: string]: {
    focused?: FC<SvgProps>;
    unfocused: FC<SvgProps>;
  };
}

const icons: Icons = {
  email: {
    focused: Mail,
    unfocused: MailO,
  },
  password: {
    focused: Lock,
    unfocused: LockO,
  },
  confirmPassword: {
    focused: Lock,
    unfocused: LockO,
  },
  fullName: {
    focused: User,
    unfocused: UserO,
  },
  visibility: {
    unfocused: VisibilityO,
    focused: Visibility,
  },
  Explore: {
    focused: Explore,
    unfocused: ExploreO,
  },
  Travels: {
    focused: Travel,
    unfocused: TravelO,
  },
  Account: {
    focused: Account,
    unfocused: AccountO,
  },
  edit: {
    unfocused: Edit,
  },
  forward: {
    unfocused: Forward,
  },
  logout: {
    unfocused: LogOut,
  },
  alert: {
    unfocused: Alert,
  },
  back: {
    unfocused: Back,
  },
  close: {
    unfocused: Close,
  },
  darkMode: {
    unfocused: DarkMode,
  },
  info: {
    unfocused: Info,
  },
  search: {
    unfocused: Search,
    focused: Search,
  },
  dollar: {
    unfocused: Dollar,
  },
  check: {
    unfocused: Check,
  },
  date: {
    unfocused: Dates,
    focused: Dates,
  },
  Categories: {
    unfocused: Categories,
  },
  park: {
    unfocused: Park,
  },
  attractions: {
    unfocused: Attractions,
  },
  museum: {
    unfocused: Museum,
  },
  church: {
    unfocused: Church,
  },
  market: {
    unfocused: Market,
  },
  neighborhood: {
    unfocused: Neighborhood,
  },
  monument: {
    unfocused: Monument,
  },
  street: {
    unfocused: Street,
  },
  time: {
    unfocused: Time,
    focused: Time,
  },
};

export function Icon({ name, isFocused = false, fill, ...rest }: Props) {
  const theme = useThemeConfig();
  const IconComponent = isFocused
    ? icons[name]?.focused
    : icons[name]?.unfocused;
  const color = isFocused ? theme.colors.primary : theme.colors.placeholder;
  const fillColor = fill ? fill : color;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent fill={fillColor} {...rest} />;
}
