
import { describe, expect, it } from 'vitest';
import { authorizedTestAgent, unAuthorizedTestAgent } from '../../../tests/helper/supertest.helper.js';
import { date, object, success } from 'zod/v4';

describe('We test user and cheak' , () => {
  it('should return 200 ok on get user.' , async () => {
      const response = await authorizedTestAgent.get('/users/me')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        success:true , 
        date: expect.any(Object)
      })
  })
})