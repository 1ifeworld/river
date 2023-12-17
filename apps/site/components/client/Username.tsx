import React from 'react';
import { Typography } from '@/design-system';
import { useUsernames } from '@/client';
import { cn } from '@/design-system';

interface UsernameProps {
  id: string
  className?: string
}

export function Username({id, className}: UsernameProps) {
  const usernames = useUsernames([id]);
  const username = usernames[id] || 'undefined'

  return <Typography className={cn(className)}>{username}</Typography>;
}
