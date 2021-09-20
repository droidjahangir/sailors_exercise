import mongoose from 'mongoose';

const { Schema } = mongoose;

const shoppingCardSchema = new Schema(
  {
    price: {
      type: Number,
      required: [true, 'Shopping card Price required !'],
    },
    discount: {
      type: Number,
      required: [true, 'Discount price required !'],
    },
    image: {
      type: String,
      required: [true, 'Image url required !'],
    },
    cardNumber: {
      type: String,
      required: [true, 'Generate Card Number error !'],
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    cardType: {
      type: String,
      required: [true, 'Card type required or not matched'],
      enum: ['premium', 'gold', 'silver'],
    },
    pin: {
      type: String,
      required: [true, 'pin error'],
    },
    userType: {
      type: String,
      required: [true, 'user type error'],
      enum: ['superAdmin', 'admin', 'incharge'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    validity: {
      type: String,
      required: [true, 'access date error'],
    },
  },
  {
    timestamps: true,
  }
);

const ShoppingCard = mongoose.model('ShoppingCard', shoppingCardSchema);

export default ShoppingCard;
