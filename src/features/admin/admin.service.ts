import { CustomRequestHandler } from "../../types/common";
import { IP } from "../ip/ip.entity";
import { User } from "../user/user.entity";

const generateMatchQueryForIpAggregation = (filterQuery: {
  [key: string]: string | string[];
}) => {
  const matchStage: any = {};

  if (filterQuery.categories && filterQuery.categories.length > 0) {
    matchStage.categories = {};
    matchStage.categories.$in = Array.isArray(filterQuery.categories)
      ? filterQuery.categories
      : [filterQuery.categories];
  }

  if (filterQuery.min && filterQuery.min !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$gte = parseFloat(filterQuery.min as string);
  }

  if (filterQuery.max && filterQuery.max !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$lte = parseFloat(filterQuery.max as string);
  }

  console.log(matchStage);

  return matchStage;
};

const generateMatchQueryForUserAggregation = (filterQuery: {
  [key: string]: string | string[];
}) => {
  const matchStage: any = {};

  if (filterQuery.categories && filterQuery.categories.length > 0) {
    matchStage.interests = {};
    matchStage.interests.$in = Array.isArray(filterQuery.categories)
      ? filterQuery.categories
      : [filterQuery.categories];
  }

  if (filterQuery.min && filterQuery.min !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$gte = parseFloat(filterQuery.min as string);
  }

  if (filterQuery.max && filterQuery.max !== "") {
    if (!matchStage.price) matchStage.price = {};
    matchStage.price.$lte = parseFloat(filterQuery.max as string);
  }

  console.log(matchStage);

  return matchStage;
};

export const getAllIPs: CustomRequestHandler = async (req, res) => {
  try {
    const ips = await IP.aggregate([
      {
        $match: generateMatchQueryForIpAggregation(req.query as any),
      },
    ]);

    res.status(200).json(ips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllUsers: CustomRequestHandler = async (req, res) => {
  try {
    const ips = await User.aggregate([
      {
        $match: generateMatchQueryForUserAggregation(req.query as any),
      },
    ]);

    res.status(200).json(ips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
