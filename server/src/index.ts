import { PrismaClient } from "@prisma/client";
import express from 'express';

const dbclient = new PrismaClient()
const app = express();
const port = process.env.SERVER_PORT || 3000;

var bodyParser = require('body-parser')

app.get('/', (req: any, res: any) => {
    res.send('Successful response.');
});

// ------------User Endpoints-------------

app.get('/make-user/:email', (req: any, res: any) => {
    const user = { email: req.params.email, name: req.query.name };
    console.log("add user", user);

    dbclient.user.create({ data: user }).then(() => res.json({ status: "success" }))
});

app.get('/list-users', (req: any, res: any) => {
    dbclient.user.findMany().then((users) => res.json(users));
});

app.get('/list-users/:name', (req: any, res: any) => {
    dbclient.user.findMany({ where: { Tenant: { name: req.params.name } } }).
        then((users) => res.json(users));
});

app.get('/show-user/:id', (req: any, res: any) => {
    dbclient.user.findUnique({ where: { id: req.params.id } }).
        then((user) => res.json(user));
});

app.get('/send-user/:email', (req: any, res: any) => {
    dbclient.user.findUnique({ where: { email: req.params.email } }).
        then((user) => res.json(user));
});

app.put('/update-user/:id', (req: any, res: any) => {
    dbclient.user.update({ where: { id: req.params.id }, data: { name: req.query.name } }).
        then(() => res.json({ status: "success" }))
});

app.post('/delete-user', (req: any, res: any) => {
    dbclient.user.delete({ where: { email: req.query.email } }).
        then(() => res.json({ status: "success" }))
});

// ------------Tenant Endpoints-------------

app.get('/make-tenant/:name', (req: any, res: any) => {
    const tenant = { name: req.params.name };
    console.log("add tenant", tenant);

    dbclient.tenant.create({ data: tenant }).
        then(() => res.json({ status: "success" }))
});

app.get('/show-tenants', (req: any, res: any) => {
    dbclient.tenant.findMany().then((tenants) => res.json(tenants));
});

app.post('/delete-tenant', (req: any, res: any) => {
    const tenantName = req.query.name;
    console.log("delete tenant", tenantName);

    dbclient.tenant.deleteMany({ where: { name: tenantName } }).
        then(() => res.json({ status: "success" }))
});

// ------------User to Tenant Endpoints-------------

app.get('/send-user-tenant/:email', (req: any, res: any) => {
    dbclient.user.findUnique({ where: { email: req.params.email } }).
        then((user) => dbclient.tenant.findUnique({
            // @ts-ignore
            where: { id: user.tenantId }
        }).
            then((tenant) => res.json(tenant)).
            catch((err) => res.json({ status: "error", error: err })));
});

app.put('/put-user-to-tenant/:email/:name', async (req: any, res: any) => {
    const tenant = await dbclient.tenant.findFirst({
         where: { name: req.params.name } });
    dbclient.user.update({
        where: { email: req.params.email },
        // @ts-ignore
        data: { Tenant: { connect: { id: tenant.id } } }
    }).
        then(() => res.json({ status: "success" }))
});

app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`)
    logEndPoints();
});

const logEndPoints = () => {
    console.log("All API Endpoints:");
    app._router.stack.forEach((appRoute: any) => {
        if (appRoute.route && appRoute.route.path) {
            console.log(`http://localhost:${port}${appRoute.route.path}`);
        }
    });
}

