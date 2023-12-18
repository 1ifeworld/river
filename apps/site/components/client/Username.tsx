import React from 'react';
import { Typography, cn } from '@/design-system';
import { useUsernames } from 'app/providers';

interface UsernameProps {
  id: string
  className?: string
}

export function Username({id, className}: UsernameProps) {
  const usernames = useUsernames([id]);
  const username = usernames[id] || 'undefined'

  return <Typography className={cn(className)}>{username}</Typography>;
}
