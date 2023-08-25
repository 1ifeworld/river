'use client';

import { RiverIcon } from '@river/design-system';
import { AuthPlaceholder } from '../AuthPlaceholder';

export function Header() {
  return (
    <div className='flex justify-between items-center p-3'>
      {/* sidebar icon placeholder */}
      <div></div>

      <RiverIcon />

      {/* auth component placeholder */}
      <AuthPlaceholder />
    </div>
  );
}
