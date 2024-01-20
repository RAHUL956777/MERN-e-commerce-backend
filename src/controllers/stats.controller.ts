import { myCache } from "../app";
import { TryCatch } from "../middlewares/error";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { calculatePercentage, getInventories } from "../utils/features";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats;

  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get("admin-stats") as string);
  else {
    const today = new Date();

    //to get the date 6 months ago
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };

    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });

    //to get last month product
    const lastMonthProductsPromise = User.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    //to get this month users
    const thisMonthUsersPromise = User.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });

    //to get last month users
    const lastMonthUsersPromise = await Product.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    //to get this month orders
    const thisMonthOrdersPromise = Order.find({
      createdAt: { $gte: thisMonth.start, $lte: thisMonth.end },
    });

    //to get last month orders
    const lastMonthOrdersPromise = Order.find({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    //to get last 6 months orders
    const lastSixMonthOrdersPromise = Order.find({
      createdAt: { $gte: sixMonthAgo, $lte: today },
    });

    const latestTransactionPromise = Order.find({})
      .select(["orderItems", "discount", "total", "status"])
      .limit(4);

    const [
      thisMonthProducts,
      thisMonthUsers,
      thisMonthOrders,
      lastMonthProducts,
      lastMonthUsers,
      lastMonthOrders,
      productsCount,
      usersCount,
      allOrders,
      lastSixMonthOrders,
      categories,
      femaleUsersCount,
      latestTransaction,
    ] = await Promise.all([
      thisMonthProductsPromise,
      thisMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthProductsPromise,
      lastMonthUsersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ gender: "female" }),
      latestTransactionPromise,
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercent = {
      revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
      product: calculatePercentage(
        thisMonthProducts.length,
        lastMonthProducts.length
      ),
      user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
      order: calculatePercentage(
        thisMonthOrders.length,
        lastMonthOrders.length
      ),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const count = {
      revenue,
      user: usersCount,
      product: productsCount,
      order: allOrders.length,
    };

    const orderMonthCounts = new Array(6).fill(0);
    const orderMonthlyRevenew = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthDifference = today.getMonth() - creationDate.getMonth();

      if (monthDifference < 6) {
        orderMonthCounts[6 - monthDifference - 1] += 1;
        orderMonthlyRevenew[6 - monthDifference - 1] += order.total;
      }
    });

    const categoryCount: Record<string, number>[] = await getInventories({
      categories,
      productsCount,
    });

    const userRatio = {
      male: usersCount - femaleUsersCount,
      frmale: femaleUsersCount,
    };

    const modifiedLatestTransaction = latestTransaction.map((order) => ({
      _id: order._id,
      discount: order.discount,
      amount: order.total,
      quantity: order.orderItems.length,
      status: order.status,
    }));

    stats = {
      categoryCount,
      changePercent,
      count,
      chart: {
        order: orderMonthCounts,
        revenue: orderMonthlyRevenew,
      },
      userRatio,
      latestTransaction: modifiedLatestTransaction,
    };

    myCache.set("admin-stats", JSON.stringify(stats));
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieCharts = TryCatch(async (req, res, next) => {
  let charts;
  if (myCache.has("admin-pie-charts"))
    charts = JSON.parse(myCache.get("admin-pie-charts") as string);
  else {
    const [
      processingOrder,
      shippedOrder,
      deliveredOrder,
      categories,
      productsCount,
    ] = await Promise.all([
      Order.countDocuments({ status: "Processing" }),
      Order.countDocuments({ status: "Shipped" }),
      Order.countDocuments({ status: "Delivered" }),
      Product.distinct("category"),
      Product.countDocuments(),
    ]);

    const orderFullfillment = {
      pocessing: processingOrder,
      shipped: shippedOrder,
      delivered: deliveredOrder,
    };

    const productCategories = await getInventories({
      categories,
      productsCount,
    });

    charts = {
      orderFullfillment,
      productCategories,
    };

    myCache.set("admin-pie-charts", JSON.stringify(charts));
  }

  return res.status(200).json({
    success: true,
    charts,
  });
});

export const getBarCharts = TryCatch(async (req, res, next) => {});

export const getLineCharts = TryCatch(async (req, res, next) => {});
