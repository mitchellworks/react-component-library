import styled, { css } from 'styled-components';

import { colors, spacing } from '../../../../../constants';
import { minMedia } from '../../../../../helpers/responsiveness';
import { NavbarDropdownListContainer } from '../NavbarDropdown';

const NavbarDropdownList = styled.ul<NavbarDropdownListContainer>`
  position: relative;
  z-index: 1;
  margin: ${spacing[3]} 0 ${spacing[3]};
  padding: 0;
  list-style-type: none;
  border-bottom: 1px solid ${colors.greyLighter};

  ${minMedia.desktop`
    ${css`
      background-color: ${colors.white};
      box-shadow: 0px 1px 0px 1px ${colors.greyLight};
      border: 1px solid ${colors.greyLighter};
      border-top: 0;
      border-radius: 0px 0px 10px 10px;
      min-width: 70vw;
      height: 338px;
      margin: 0;
      padding: 48px 64px;
    `}

    position: absolute;
    left: 50%;
    top: 85px; //TODO: doesn't work in styleguidist properly between 1280px and 1500px width

    ${({ open }: NavbarDropdownListContainer) => css`
      ${
        open
          ? css`
              transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
              opacity: 1;
              visibility: visible;
              transform: translate(-50%, 0%);
            `
          : css`
              transition: opacity 0.3s, transform 0.3s, visibility 0.3s 0.3s;
              opacity: 0;
              visibility: hidden;
              transform: translate(-50%, -10%);
            `
      }}
    `}
  `}
`;

export default NavbarDropdownList;
