import request from 'supertest';
import app from '../app';

describe('API Health Check', () => {
  it('should return 200 OK for /api/v1/health', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('API is running smoothly');
  });
});
