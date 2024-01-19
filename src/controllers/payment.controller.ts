import { TryCatch } from "../middlewares/error";
import { Coupon } from "../models/coupon";
import ErrorHandler from "../utils/utilityClass";

export const newCoupon = TryCatch(async (req, res, next) => {
  const { coupon, amount } = req.body;

  if (!coupon || !amount) {
    return next(
      new ErrorHandler("Please Enter the Coupon Code and Discount Amount", 400)
    );
  }

  await Coupon.create({ code: coupon, amount });

  return res.status(201).json({
    success: true,
    message: `Coupon ${coupon} Created Successfully`,
  });
});

export const applyDiscount = TryCatch(async (req, res, next) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const allCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});

  if (!coupons) return next(new ErrorHandler("No Coupons Avaliable", 400));

  return res.status(200).json({
    success: true,
    coupons,
  });
});

export const deleteCoupons = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  await Coupon.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Coupon Deleted Successfully",
  });
});
