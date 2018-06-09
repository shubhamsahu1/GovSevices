const request = require('supertest');
const { Userdata } = require('../routers/router');
const mongoose = require('mongoose');

let server;

  describe('/api/save', () => {

      beforeEach(() => { server = require('../index'); })
      afterEach(async () => {
        server.close();
        await Userdata.remove({});
      });


describe('POST:/', () => {
  let userdata;
  beforeEach(() => {
  userdata =   {name:"shubham",
                sex:"Male",
                age:26,
                country:"india"}
  })

  const exec = async () => {
    return await request(server)
      .post('/api/save')
      .send(userdata);
  }



    it('should return 400 if name is blank ', async () => {
      userdata.name = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if name is more than 30 characters', async () => {
      userdata.name = new Array(33).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('should return 400 if sex is not valid', async () => {
      userdata.sex = ""

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('should return 400 if age is not valid', async () => {
      userdata.age = "ww"

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('should return 400 if country is not valid', async () => {
      userdata.country = ""

      const res = await exec();

      expect(res.status).toBe(400);
    });


    it('should save the userData if it is valid', async () => {

      const res = await exec();

      expect(res.status).toBe(200);

      const data = await Userdata.find({ name: 'shubham' });
      expect(data[0].name).toBe("shubham");
    });

  });

});
describe('checking country data', () => {
  it('should get contry data successfully', async () => {
  const res = await request('https://restcountries.eu').get('/rest/v1/region/Europe');
  expect(res.status).toBe(200);
  })
})
