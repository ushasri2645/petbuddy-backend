import { Schema } from "mongoose";
import {
    IBoardingServiceType,
    IServiceType,
    IServicesType,
} from "../Types/types";
import { config } from "../Config/Config";

const serviceSchema = new Schema<IServiceType>({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    no_of_reviews: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    min_fee: {
        type: Number,
        required: true,
    },
    startDay: {
        type: String,
        required: true,
    },
    endDay: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    image_uri: {
        type: String,
    },
});

const boardingServiceSchema = new Schema<IBoardingServiceType>({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    no_of_reviews: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    min_fee: {
        type: Number,
        required: true,
    },
    image_uri: {
        type: String,
    },
});

const servicesSchema = new Schema<IServicesType>({
    grooming: {
        type: [serviceSchema],
        required: true,
        default: [],
    },
    boarding: {
        type: [boardingServiceSchema],
        required: true,
        default: [],
    },
    training: {
        type: [serviceSchema],
        required: true,
        default: [],
    },
    veternity: {
        type: [serviceSchema],
        required: true,
        default: [],
    },
});
export const ServiceModel = config.model<IServicesType>(
    "services",
    servicesSchema
);
