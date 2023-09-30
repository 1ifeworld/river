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
    'foreground': 'label',
    'muted': 'base-shade',
    'muted-foreground': 'label-faint',
    'card': 'base',
    'card-foreground': 'label',
    'popover': 'base',
    'popover-foreground': 'label',
    'accent': 'base-hover',
    'accent-foreground': 'label',
    'shadow-sm': 'shadow-soft',
    'shadow-md': 'shadow-soft-1',
    'shadow-lg': 'shadow-soft-2'
  });