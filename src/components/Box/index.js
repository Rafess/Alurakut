import styled from 'styled-components';


const Box = styled.div`
  background: #000;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #FFF;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #FFF;
  }
  .subTitle {
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #333333;
    color: #FFF;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #FFF;
      opacity: 50%;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-image: linear-gradient(to bottom right, #AE44C8, #D81D99);
  }
  `;

  export default Box;