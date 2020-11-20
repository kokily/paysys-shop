const mediaQuery = (max_width: number) => `
  @media (max-width: ${max_width}px)
`;

export const media = {
  large: mediaQuery(1200),
  medium: mediaQuery(992),
  small: mediaQuery(768),
  xsmall: mediaQuery(376),
};
