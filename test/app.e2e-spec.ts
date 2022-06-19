import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // 테스트 할때, main.ts의 설정을 그대로 써야 한다.
    // 이게 좀 불편불편;;
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Movie' , () => {
    it('Get All', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([])
    })

    it('Create Movie', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'GGU',
          year: 2021,
          genres: ["cute"]
        })
        .expect(201)
    })

    it('Create Movie Fail', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'GGU',
          year: 2021,
          genres: ["cute"],
          other: 'thing'
        })
        .expect(400)
    })

    it('Delete Movie', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  });

  describe('movie/:id', () => {
    it('Get Movie', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    })

    it('Get Movie Failed', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404)
    })

    it('Update Movie', () => {
      return request(app.getHttpServer())
        .put('/movies/1')
        .send({
          title: 'Update'
        })
        .expect(200)
    })

    it('Update Movie Failed', () => {
      return request(app.getHttpServer())
        .patch('/movies/100')
        .send({
          title: 'Update'
        })
        .expect(404)
    })

    it('Delete Movie Fail', () => {
      return request(app.getHttpServer())
        .delete('/movies/100')
        .expect(404)
    })

    it('Delete Movie', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    })
  })
});
