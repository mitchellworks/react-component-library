import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { ProgressProps } from '../../../molecules/Progress/Progress';
import { ProductTemplateNavigation } from '../ProductTemplateNavigation/ProductTemplateNavigation';
import { ProductTemplateProgress } from '../ProductTemplateProgress/ProductTemplateProgress';

interface ProductTemplateHeaderProps {
  prevStep?: string | ReactNode;
  nextStep?: string | ReactNode;
  progress?: Pick<ProgressProps, 'currentStep' | 'totalSteps'>;
}

const ProductTemplateHeaderContainer = styled.div`
  position: relative;
  min-height: 30px;
`;

export function ProductTemplateHeader({ prevStep, nextStep, progress }: ProductTemplateHeaderProps) {
  return (
    <ProductTemplateHeaderContainer className="mb-4" data-automation="ZA.ProductTemplateHeader">
      {(prevStep || nextStep) && <ProductTemplateNavigation prevStep={prevStep} nextStep={nextStep} />}
      {progress && <ProductTemplateProgress progress={progress} />}
    </ProductTemplateHeaderContainer>
  );
}
