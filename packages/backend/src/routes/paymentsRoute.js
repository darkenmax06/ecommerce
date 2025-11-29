import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

function paymentsRoute() {
  const router = Router();

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN // DEBE ser TEST-xxxxxx
  });

  const preference = new Preference(client);

  router.get("/", async (req, res) => {
    try {
      const result = await preference.create({
        body: {
          items: [
            {
              title: "Producto de prueba",
              unit_price: 10.2,
              quantity: 2,
              id: 2
            }
          ],

          payment_methods: {
            excluded_payment_types: [
              { id: "ticket" },
              { id: "atm" },
              { id: "bank_transfer" },
              { id: "digital_currency" },
              { id: "prepaid_card" },
              { id: "voucher_card" }
            ],
            installments: 1
          },

          back_urls: {
            success: "https://youtube.com",
            failure: "https://x.com",
            pending: "https://pinterest.com"
          },
          metadata: {
            name: "Ramses"
          }
        }
      });

      

      res.json({ url: result.init_point });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Hubo un error" });
    }
  });

  return router;
}

export default paymentsRoute;
