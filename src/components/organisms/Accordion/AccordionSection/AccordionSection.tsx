import React, { FC } from 'react';
import styled from 'styled-components';

import { useAccordionContext } from '../context';

interface AccordionSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  index: number;
}

const AccordionContent = styled.div<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? 'hidden' : 'visible')};
  transition: visibility 200ms;
`;

const AccordionSection: FC<AccordionSectionProps> = ({ children, id, index, ...rest }) => {
  const { getSectionProps } = useAccordionContext();
  const { ref, ...sectionPropsRest } = getSectionProps(id, index);
  return (
    <div {...sectionPropsRest} {...rest}>
      <AccordionContent
        ref={ref}
        tabIndex={sectionPropsRest['aria-hidden'] ? -1 : undefined}
        visible={sectionPropsRest['aria-hidden']}
      >
        {children}
      </AccordionContent>
    </div>
  );
};

export default AccordionSection;
