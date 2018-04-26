import styled, { css } from 'styled-components';

const getSpacing = props => props.fieldContentSpacing || '5px';

const rightStyles = css`
  & > *:not(:first-child) {
    margin: auto 0 auto ${getSpacing};
  }
  & > *:first-child {
    margin: auto 0 auto auto;
  }
`;

const stretchStyles = css`
  & > *:not(:first-child):not(:last-child) {
    margin: auto 0 auto ${getSpacing};
  }
  & > *:first-child {
    margin: auto 0 auto ${getSpacing};
  }
  & > *:last-child {
    margin: auto 0;
  }
`;

const centerStyles = css`
  & > *:not(:first-child):not(:last-child) {
    margin: auto 0 auto ${getSpacing};
  }
  & > *:first-child {
    margin: auto auto auto ${getSpacing};
  }
  & > *:last-child {
    margin: auto auto auto 0;
  }
`;

const leftStyles = css`
  & > *:not(:last-child) {
    margin: auto ${getSpacing} auto 0;
  }
  & > *:last-child {
    margin: auto auto auto 0;
  }
`;

const FieldContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  ${props => {
    switch (props.align) {
      case 'right':
        return rightStyles;
      case 'stretch':
        return stretchStyles;
      case 'center':
        return centerStyles;
      default:
        return leftStyles;
    }
  }};
`;

export default FieldContent;
