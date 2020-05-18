import styled from 'styled-components';
import { colors } from '../../../constants/colors';

export interface IOptionsListProps {
  optionsListMaxHeight?: string;
}

const Options = styled.div<IOptionsListProps>`
  z-index: 1;
  width: 100%;
  background: ${colors.white};
  border: 1px solid ${colors.brand};
  border-top: 0;
  position: absolute;
  overflow: auto;
  border-radius: 0 0 8px 8px;
  max-height: ${({ optionsListMaxHeight = 'auto' }) => optionsListMaxHeight};
  box-shadow: 0 0 4px 0 ${colors.brand};
`;

export default Options;
