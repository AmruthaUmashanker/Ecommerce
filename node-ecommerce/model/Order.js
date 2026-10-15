const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.Mixed, required: true },
    paymentMethod: { type: String, required: true },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

// the frontend reads order.id (for /order-success/:id), not _id
orderSchema.virtual("id").get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);