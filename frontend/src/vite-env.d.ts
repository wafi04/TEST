/// <reference types="vite/client" />
// src/heroicons.d.ts atau types/heroicons.d.ts
declare module '@heroicons/react/outline' {
  import { IconProps } from 'react';
  import { FC } from 'react';

  export const HomeIcon: FC<IconProps>;
  export const ChartBarIcon: FC<IconProps>;
  export const CogIcon: FC<IconProps>;
  export const UserIcon: FC<IconProps>;
  export const DocumentTextIcon: FC<IconProps>;
  export const LogoutIcon: FC<IconProps>;
  export const ChevronLeftIcon: FC<IconProps>;
  export const ChevronRightIcon: FC<IconProps>;
}