'use client';

import FarmPageComponent from '@/contexts/farms/presentation/components/pages/farm-page/farm-page';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useFarm } from '@/contexts/farms/presentation/hooks/use-farm';
import React from 'react';

const FarmPage = () => {
  const { user } = useAuth();
  const { getFarmByIdQuery } = useFarm(user?.farms?.[0]?.farmId || '');

  console.log(getFarmByIdQuery.data);
  return <FarmPageComponent farm={getFarmByIdQuery.data || null} />;
};

export default FarmPage;
