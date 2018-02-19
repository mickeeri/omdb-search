import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const bgColor = '#eee';
const borderColor = '#efd2d2';
const fontColor = '#333';

export const Main = styled.main`
  background: white;
  width: 50%;
  margin: 20px auto;
  padding: 30px;
  border: 1px solid ${borderColor};

  ${media.lessThan('medium')`
    width: 100%;
    margin: 0;
    padding: 30px 15px;
  `};
`;

export const Header = styled.h1`
  margin: 0;
  letter-spacing: 1px;
  color: ${fontColor};
`;

export const Form = styled.form`
  margin: 45px 0;
  display: flex;
`;

export const Input = styled.input`
  padding: 9px;
  box-shadow: none;
  outline: none;
  border: 1px solid #e7e7e7;
  width: 80%;
  font-size: 18px;

  &:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }
`;

export const SearchButton = styled.button`
  margin-left: 2px;
  padding: 10px 40px;
  cursor: pointer;
  background: #15cd72;
  border: 0;
  color: white;
  font-weight: 600;
  border-radius: 0 3px 3px 0;
  transition: opacity 0.4s;
  font-size: 18px;
  white-space: nowrap;

  &:hover {
    background: #0cb863;
  }
`;

export const List = styled.ul`
  margin: 40px 0;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li``;

export const MovieLink = styled.a`
  padding: 20px 10px;
  display: flex;
  cursor: pointer;
  color: ${fontColor};
  text-decoration: none;

  &:hover {
    background: ${bgColor};
  }
`;

export const Poster = styled.img`
  height: 100px;
  margin-right: 20px;
`;

export const PosterPlaceholder = styled.div`
  height: 100px;
  background: ${bgColor};
  width: 73px;
  margin-right: 20px;
  color: grey;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const MovieDetails = styled.div`
  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

export const Alert = styled.div`
  width: 100%;
  border: 1px solid ${borderColor};
  background: ${bgColor};
  padding: 20px;
  border-radius: 3px;
  color: ${fontColor};

  ${props =>
    props.danger &&
    css`
      border: 1px solid #db2828;
      color: #db2828;
      background: #ffecde;
    `};
`;

export const SortItem = styled.span`
  color: white;
  background: #90caf9;
  margin-right: 15px;
  padding: 5px 12px 5px 5px;
  border-radius: 4px;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      background: #42a5f5;
    `};

  &::after {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    content: '';
    position: relative;

    ${props =>
      props.asc
        ? css`
            border-top: 4px solid #2e2e2e;
            top: 11px;
            right: -4px;
          `
        : css`
            border-bottom: 4px solid #2e2e2e;
            top: -10px;
            right: -4px;
          `};
  }
`;
