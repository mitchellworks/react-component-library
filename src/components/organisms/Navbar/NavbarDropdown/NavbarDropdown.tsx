import React, { useEffect, useState, useRef, RefObject } from 'react';
import styled from 'styled-components';
import { isArrowDown, isArrowUp, isEnter, isEscape, isSpace } from '../../../../helpers/keyboard-keys';
import { mod } from '../../../../helpers/utils';
import NavbarDropdownList from './NavbarDropdownList/NavbarDropdownList';
import NavbarLink from '../NavbarLink/NavbarLink';

const NavbarDropdownContainer = styled.li`
  position: relative;
  display: inline-block;
`;

export type ButtonLinkElement = HTMLButtonElement | HTMLAnchorElement;

export interface NavbarDropdownListContainer extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}
export interface OpenerProps {
  'aria-expanded': boolean;
  'aria-haspopup': true;
  ref: React.RefObject<ButtonLinkElement>;
  onClick: React.EventHandler<React.MouseEvent>;
  onKeyDown: React.EventHandler<React.KeyboardEvent>;
  tabIndex: number;
}

export type Item = any;

export interface ItemProps {
  ref: React.RefObject<HTMLLIElement>;
  onKeyDown: React.EventHandler<React.KeyboardEvent>;
  tabIndex: number;
}

export type GetItemProps = () => ItemProps;

export type Close = () => void;

export interface RenderItemProps {
  item: Item;
  getItemProps: GetItemProps;
  close: Close;
}
export interface DefaultNavbarDropdownProps {
  /** Function getting all the props and aria attributes meant to be spread on the dropdown item links */
  renderItem: ({ item, getItemProps, close }: RenderItemProps) => React.ReactNode;
}
export interface NavbarDropdownProps extends DefaultNavbarDropdownProps {
  /** unique id */
  id: string;
  /** dropdown label */
  label: React.ReactNode;
  /** array of data representing the dropdown items (e.g links) */
  items: Item[];
  'aria-label'?: string;
  'data-automation'?: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  id,
  label,
  items,
  renderItem = ({ item: { label, href, ['data-automation']: dataAutomation = 'ZA.navbar-item' }, getItemProps }) => (
    <NavbarLink href={href} {...getItemProps()} isDropdownLink data-automation={dataAutomation}>
      {label}
    </NavbarLink>
  ),
  'aria-label': ariaLabel,
  'data-automation': dataAutomation,
}) => {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const openerRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const itemsRefs: RefObject<HTMLLIElement>[] = items.map(() => useRef<HTMLLIElement>(null));

  const handleFocusOutside = (e: Event) => {
    if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setCursor(0);
      setOpen(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (open && isEscape(e)) {
      setOpen(false);
      setCursor(0);
      if (openerRef && openerRef.current) {
        openerRef.current.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('focus', handleFocusOutside, true);
    document.addEventListener('mousedown', handleFocusOutside, true);
    document.addEventListener('keydown', handleEscapeKey, true);
    return () => {
      document.addEventListener('focus', handleFocusOutside, true);
      document.addEventListener('mousedown', handleFocusOutside, true);
      document.addEventListener('keydown', handleEscapeKey, true);
    };
  }, [handleFocusOutside, handleEscapeKey]);

  const handleOpenerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prevState) => !prevState);
  };

  const focusOnItem = () => {
    const itemRef = itemsRefs[cursor];
    if (itemRef && itemRef.current) {
      itemRef.current.focus();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent<ButtonLinkElement>) => {
    const { length } = itemsRefs;

    if (isArrowUp(e)) {
      e.preventDefault();
      setCursor((prevState) => {
        itemsRefs[mod(prevState - 1, length)].current?.focus();
        return mod(prevState - 1, length);
      });
    } else if (isArrowDown(e)) {
      e.preventDefault();
      setCursor((prevState) => {
        itemsRefs[mod(prevState + 1, length)].current?.focus();
        return mod(prevState + 1, length);
      });
    }
  };

  const handleOpenerKeyDown = (e: React.KeyboardEvent<ButtonLinkElement>) => {
    if (isArrowUp(e)) {
      e.preventDefault();
      setCursor(itemsRefs.length - 1);
      setOpen(true);
      focusOnItem();
    } else if (isArrowDown(e) || isEnter(e) || isSpace(e)) {
      e.preventDefault();
      setCursor(0);
      setOpen(true);
      focusOnItem();
    }
  };

  const getOpenerProps = (): OpenerProps => ({
    'aria-expanded': open,
    'aria-haspopup': true,
    onClick: handleOpenerClick,
    onKeyDown: handleOpenerKeyDown,
    ref: openerRef,
    tabIndex: 0,
  });

  const getItemProps = (index: number) => () => ({
    onKeyDown: handleItemKeyDown,
    ref: itemsRefs[index],
    tabIndex: -1,
  });

  const close = () => {
    setOpen(false);
  };

  return (
    <NavbarDropdownContainer ref={dropdownRef}>
      <NavbarLink
        open={open}
        withChevron={true}
        href="#"
        {...getOpenerProps()}
        data-automation={dataAutomation ?? 'ZA.navbar-item'}
      >
        {label}
      </NavbarLink>
      {/* To avoid an undefined aria-label the fallback to label was added when aria-label property is not defined */}
      {/* TODO remove fallback to label */}
      <NavbarDropdownList
        aria-label={ariaLabel ? ariaLabel : typeof label === 'string' ? label : undefined}
        open={open}
      >
        {items.map((item, index) => (
          <li key={`${id}-${index}`}>
            {renderItem({
              close,
              getItemProps: getItemProps(index),
              item,
            })}
          </li>
        ))}
      </NavbarDropdownList>
    </NavbarDropdownContainer>
  );
};

export default NavbarDropdown;
