import axios from 'axios';
import { api } from '../configs/config';

export default axios.create({
  baseURL: api
});
