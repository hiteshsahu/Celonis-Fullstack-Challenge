import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
import { User, Tenant } from "./types"

const app = express();
const dbclient = new PrismaClient()
const port = process.env.SERVER_PORT || 3000;


app.get('/', (req: Request, res: Response) => {
    res.send('Successful response.');
});

// ------------User Endpoints-------------

app.get('/make-user/:email', (req: Request, res: Response) => {
    const user = {
        email: req.params.email,
        name: req.query.name as string
    };
    console.log("add user", user);

    dbclient.user.create({ data: user }).then(() => res.json({ status: "success" }))
});

app.get('/list-users', (req: Request, res: Response) => {
    dbclient.user.findMany().then((users: User[]) => res.json(users));
});

app.get('/list-users/:name', (req: Request, res: Response) => {
    dbclient.user.findMany({ where: { Tenant: { name: req.params.name } } }).
        then((users: User[]) => res.json(users));
});

app.get('/show-user/:id', (req: Request, res: Response) => {
    dbclient.user.findUnique({ where: { id: req.params.id } }).
        then((user?: User | null) => res.json(user));
});

app.get('/send-user/:email', (req: Request, res: Response) => {
    dbclient.user.findUnique({ where: { email: req.params.email } }).
        then((user?: User | null) => res.json(user));
});

app.put('/update-user/:id', (req: Request, res: Response) => {
    dbclient.user.update({ where: { id: req.params.id }, data: { name: req.query.name as string } }).
        then(() => res.json({ status: "success" }))
});

app.post('/delete-user', (req: Request, res: Response) => {
    dbclient.user.delete({ where: { email: req.query.email as string } }).
        then(() => res.json({ status: "success" }))
});

// ------------Tenant Endpoints-------------

app.get('/make-tenant/:name', (req: Request, res: Response) => {
    const tenant = { name: req.params.name };
    console.log("add tenant", tenant);

    dbclient.tenant.create({ data: tenant }).
        then(() => res.json({ status: "success" }))
});

app.get('/show-tenants', (req: Request, res: Response) => {
    dbclient.tenant.findMany().then((tenants: Tenant[]) => res.json(tenants));
});

app.post('/delete-tenant', (req: Request, res: Response) => {
    const tenantName = req.query.name as string;
    console.log("delete tenant", tenantName);

    dbclient.tenant.deleteMany({ where: { name: tenantName } }).
        then(() => res.json({ status: "success" }))
});

// ------------User to Tenant Endpoints-------------

app.get('/send-user-tenant/:email', (req: Request, res: Response) => {
    dbclient.user.findUnique({ where: { email: req.params.email } }).
        then((user) => dbclient.tenant.findUnique({
            // @ts-ignore
            where: { id: user.tenantId }
        }).
            then((tenant: Tenant) => res.json(tenant)).
            catch((err: Error) => res.json({ status: "error", error: err })));
});

app.put('/put-user-to-tenant/:email/:name', async (req: Request, res: Response) => {
    const tenant = await dbclient.tenant.findFirst({
        where: { name: req.params.name }
    });
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

