import axios from 'axios';

let source = axios.CancelToken.source();

export const getData = async () => {
  try {
    const { data, status } = await axios.get('https://swapi.dev/api//people', { cancelToken: source.token });
    if (status === 200) return data?.results;
    return [];
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error(error);
    }
  }
};

export const cancelRequest = () => {source.cancel("Cancelled by user"); source = axios.CancelToken.source()};
