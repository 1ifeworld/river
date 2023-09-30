const processKeys = (obj: {[key: string]: string}) => {
  const newObj: {[key: string]: string} = {};
  for (let key in obj) {
      if (key.startsWith('border-')) {
          newObj[key] = 'base-border';
      } else {
          newObj[key] = obj[key];
      }
  }
  return newObj;
}

export const estuaryMapping = processKeys({
    'bg-background': 'bg-base',
    'text-foreground': 'text-label',
    'bg-muted': 'bg-base-shade',
    'text-muted-foreground': 'text-label-faint',
    'bg-card': 'bg-base',
    'text-card-foreground': 'text-label',
    'bg-popover': 'bg-base',
    'text-popover-foreground': 'text-label',
    'bg-accent': 'bg-base-hover',
    'text-accent-foreground': 'text-label',
    'shadow-sm': 'shadow-soft',
    'shadow-md': 'shadow-soft-1',
    'shadow-lg': 'shadow-soft-2'
  });