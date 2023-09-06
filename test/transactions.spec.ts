import supertest from 'supertest'
import { beforeAll, afterAll, test, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('User can created a new transaction!', async () => {
    await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 1000,
        type: 'credit',
      })
      .expect(201)
  })

  test('User can get all transactions!', async () => {
    const createTransaction = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 1000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransaction.get('Set-Cookie')

    const listTransactions = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactions.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Teste',
        amount: 1000,
      }),
    ])
  })

  test('User can get transaction by ID!', async () => {
    const createTransaction = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 1000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransaction.get('Set-Cookie')

    const listTransactions = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const id = listTransactions.body.transactions[0].id

    const getTransactionById = await supertest(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionById.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Teste',
        amount: 1000,
      }),
    )
  })

  test('User can get the summary!', async () => {
    const createTransaction = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 1000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransaction.get('Set-Cookie')

    await supertest(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Teste',
        amount: 500,
        type: 'debit',
      })

    const summaryResponse = await supertest(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 500,
    })
  })
})
