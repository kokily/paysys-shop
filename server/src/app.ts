import { ApolloServer } from 'apollo-server-koa';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import serve from 'koa-static';
import send from 'koa-send';
import path from 'path';
import jwt from 'jsonwebtoken';
import schema from './schema';
import { ENV, PROD_MODE } from './constants';
import { getRepository } from 'typeorm';
import User from './entities/User';
import { createAccessToken, createRefreshToken, sendRefreshToken } from './libs/token';

const app = new Koa();
const router = new Router();
const rootDir = path.resolve(process.cwd(), './../client/build');

app.use(
  cors({
    origin: PROD_MODE ? 'https://paysys.shop' : 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(rootDir));
app.use(async (ctx: Context) => {
  if (
    ctx.status === 404 &&
    ctx.path.indexOf('/graphql') !== 0 &&
    ctx.path.indexOf('/refresh_token') !== 0
  ) {
    await send(ctx, 'index.html', {
      root: rootDir,
    });
  }
});

const apollo = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: Context }) => {
    return {
      ctx,
    };
  },
});

router.get('/graphql', apollo.getMiddleware());
router.post('/graphql', apollo.getMiddleware());
router.post('/refresh_token', async (ctx: Context) => {
  const token = ctx.cookies.get('paysys_token');

  let access_token = '';

  if (!token) {
    ctx.body = {
      ok: false,
      access_token: '',
    };
  } else {
    let payload: any = null;

    try {
      payload = jwt.verify(token, ENV.REFRESH_SECRET!);

      console.log(payload)

      // token 이 일치하면 access_token 재 전송
      const user = await getRepository(User).findOne({ id: payload.user_id });

      if (!user) {
        ctx.body = {
          ok: false,
          access_token: '',
        };
      } else {
        if (user.token_version !== payload.token_version) {
          ctx.cookies.set('paysys_token');

          ctx.body = {
            ok: false,
            access_token: '',
          };
        } else {
          sendRefreshToken(ctx, createRefreshToken(user));
          access_token = createAccessToken(user);

          ctx.body = {
            ok: true,
            access_token,
          };
        }
      }
    } catch (err) {
      console.error(err);

      ctx.body = {
        ok: false,
        access_token: '',
      };
    }
  }
});

apollo.applyMiddleware({ app, cors: false });

export default app;
