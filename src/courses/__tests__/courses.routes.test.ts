import { describe, expect, it } from "vitest";
import { authorizedTestAgent } from "../../../tests/helper/supertest.helper.js";
import { extractFields, removeFields } from "../../shared/utils/object.utils.js";
import { createRandomCourses } from "../../seeds/course.seed.js";

describe('Testing courses' , () => {
    it('GET /courses return all courses', async () => {
        const response = await authorizedTestAgent.get('/courses')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            success:true , 
            date:expect.any(Array)
        })
    })
   
    it("POST /courses/create should create courses and return course" , async() => {
        const createCourse = extractFields(createRandomCourses() , ['title' , 'description' , 'image'])
        const response = await authorizedTestAgent
         .post('/courses/create')
         .send(createCourse)

         expect(response.statusCode).toBe(201)
         expect(response.body).toEqual({
            success:true , 
            date:expect.any(Object)
         })
    })
})