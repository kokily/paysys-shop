// Clean All Null in Args
export const cleanAllNullArgs = (args: object): object => {
  const notNull = {};

  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });

  return notNull;
};

// Masking Name
export const masking = (name: string): string => {
  if (name.length > 2) {
    let originName = name.split('');

    originName.forEach((name, i) => {
      if (i === 0 || i === originName.length - 1) return;

      originName[i] = 'O';
    });

    let combineName = originName.join();

    return combineName.replace(/,/g, '');
  } else {
    return name.replace(/.$/, 'O');
  }
};
