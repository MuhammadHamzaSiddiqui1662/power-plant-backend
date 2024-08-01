import { CustomRequestHandler } from "../../types/common";
import { Package } from "../package/package.entity";
import { stripe } from "./stripe.config";

export const createStripePaymentIntent: CustomRequestHandler = async (
  req,
  res
) => {
  const { packageId, currency } = req.body;

  try {
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      return res.status(404).send({ message: "Package not found" });
    }

    const amount = parseFloat(packageData.price) * 100; // convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
