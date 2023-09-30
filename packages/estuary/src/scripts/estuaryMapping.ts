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
    'background': 'base',
    'text-foreground': 'text-label',
    'muted': 'base-shade',
    'text-muted-foreground': 'text-label-faint',
    'card': 'base',
    'text-card-foreground': 'text-label',
    'popover': 'base',
    'text-popover-foreground': 'text-label',
    'accent': 'base-hover',
    'text-accent-foreground': 'text-label',
    'shadow-sm': 'shadow-soft',
    'shadow-md': 'shadow-soft-1',
    'shadow-lg': 'shadow-soft-2'
  });