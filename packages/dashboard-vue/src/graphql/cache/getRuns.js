import gql from 'graphql-tag';

export default gql`
  {
    runs @client {
      runId
    }
  }
`;
