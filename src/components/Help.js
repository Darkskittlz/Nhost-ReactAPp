import styled from 'styled-components';

const HelpContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: flex-start;
  height: 100vh;
  margin-top: -550px;

  h1 {
    font-size: 50px;
  }
`

const Help = () => {
  return (
    <HelpContainer>
      <h1>Help Page</h1>
      <p>Laborum mollit excepteur exercitation sint velit excepteur labore velit velit ea. Et fugiat aliquip magna nisi veniam commodo cillum officia. Amet consectetur officia dolore tempor ex sint minim ullamco amet velit exercitation qui elit dolore.</p>
    </HelpContainer>
  );
};

export default Help;
