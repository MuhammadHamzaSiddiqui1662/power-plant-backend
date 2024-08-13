import { CustomRequestHandler } from "../../types/common";
import { Package } from "../package/package.entity";
import { stripe } from "./stripe.config";

export const createStripePaymentIntent: CustomRequestHandler = async (
  req,
  res
) => {
  const { packageType, currency } = req.params;

  try {
    const packageDetails = await Package.findOne({ type: packageType });
    if (!packageDetails) {
      return res.status(404).send({ message: "Package not found" });
    }

    const amount = parseFloat(packageDetails.amount) * 100; // convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      packageDetails,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
