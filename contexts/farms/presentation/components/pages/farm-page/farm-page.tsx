import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import React from 'react';

interface FarmPageComponentProps {
  farm: Farm | null;
}

const FarmPageComponent = ({ farm }: FarmPageComponentProps) => {
  return <div>FarmPage</div>;
};

export default FarmPageComponent;
