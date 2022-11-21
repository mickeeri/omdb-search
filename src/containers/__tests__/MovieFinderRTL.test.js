import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieFinder from '../MovieFinder';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks';
import { rest } from 'msw';
import { API_URL } from '../../services/api';
