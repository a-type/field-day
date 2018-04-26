import styled from 'styled-components';

const FieldRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > div:not(:last-child) {
    margin-bottom: ${props => props.rowSpacing || '20px'};
  }
`;

export default FieldRowContainer;
