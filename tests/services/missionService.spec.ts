import axios from 'axios';
import { getMissions, createMission } from '../../src/services/missionService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('missionService', () => {
  const mockResponse = { data: [{ id: 'MIS_123' }] };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMissions', () => {
    it('should get all missions when no dates are provided', async () => {
      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await getMissions();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/get-ressource'),
        expect.objectContaining({
          limo: 'dev',
          authentication: expect.any(Object),
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should include only minDate in query string', async () => {
      mockedAxios.post.mockResolvedValue(mockResponse);

      await getMissions('2025-06-01');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('?MIS_DATE_DEBUT#MIN=2025-06-01'),
        expect.any(Object)
      );
    });

    it('should include only maxDate in query string', async () => {
      mockedAxios.post.mockResolvedValue(mockResponse);

      await getMissions(undefined, '2025-07-01');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('?MIS_DATE_DEBUT#MAX=2025-07-01'),
        expect.any(Object)
      );
    });

    it('should include both minDate and maxDate in query string', async () => {
      mockedAxios.post.mockResolvedValue(mockResponse);

      await getMissions('2025-06-01', '2025-07-01');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('?MIS_DATE_DEBUT#MIN=2025-06-01&MIS_DATE_DEBUT#MAX=2025-07-01'),
        expect.any(Object)
      );
    });
  });

  describe('createMission', () => {
    it('should send correct payload to /set-ressource-v2', async () => {
      const fakePayload = {
        C_Gen_Mission: [{
          MIS_TSE_ID: 'TSE1',
          MIS_TVE_ID: 'TVE1',
          MIS_DATE_DEBUT: '2025-06-22',
          MIS_HEURE_DEBUT: '08:00',
          MIS_HEURE_FIN: '10:00'
        }]
      };

      mockedAxios.post.mockResolvedValue({ data: { id: 'created-mission' } });

      const result = await createMission(fakePayload);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/set-ressource-v2'),
        expect.objectContaining({
          limo: 'dev',
          authentication: expect.any(Object),
          params: fakePayload,
        })
      );

      expect(result).toEqual({ id: 'created-mission' });
    });
  });
});
