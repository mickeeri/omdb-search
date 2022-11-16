import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

jest.mock('./services/api', () => ({
  fetchMovies: jest.fn((query) => {
    if (!query) {
      throw new Error();
    }

    if (query === 'godfather') {
      return [
        {
          Title: 'The Godfather',
          Year: '1972',
          imdbID: 'tt0068646',
        },
      ];
    }

    return [];
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});
