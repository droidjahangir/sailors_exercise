import asyncHandler from 'express-async-handler';
import ShoppingCard from '../models/shoppingCardModel.js';
import voucher_codes from 'voucher-code-generator';
import moment from 'moment';

// @desc    Fetch all shoppingCard
// @route   GET /api/shoppingCard
// @access  Public
export const getAllShoppingCard = asyncHandler(async (req, res) => {
  const card = await ShoppingCard.find({}).sort({ createdAt: -1 });

  const count = card.length;

  res.json({ count, card });
});

// @desc    Fetch single card information
// @route   GET /api/shoppingCard/:id
// @access  Public
export const getCardById = asyncHandler(async (req, res) => {
  const shoppingCard = await ShoppingCard.findById(req.params.id);

  if (shoppingCard) {
    res.json(shoppingCard);
  } else {
    res.status(404);
    throw new Error('Shopping card not found');
  }
});

// @desc  Create a Shopping card
// @route POST /api/shoppingCard
// @access Public
export const createShoppingCard = asyncHandler(async (req, res) => {
  const { price, discount, image, cardType, userType } = req.body;

  let cardNum = voucher_codes.generate({
    length: 16,
    count: 1,
    charset: voucher_codes.charset('numbers'),
    pattern: '####-####-####-####',
    prefix: 'SE-',
  });
  let cardNumber = cardNum[0];

  // generate pin
  let pinArr = voucher_codes.generate({
    length: 6,
    count: 1,
    charset: voucher_codes.charset('numbers'),
  });
  let pin = pinArr[0];

  let validity = moment().add(30, 'days');
  // let expirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)

  const shoppingCard = new ShoppingCard({
    price,
    discount,
    image,
    cardNumber,
    cardType,
    pin,
    userType,
    validity,
  });

  const createShoppingCard = await shoppingCard.save();

  res.status(201).json(createShoppingCard);
});

// @desc    Delete a shopping card
// @route   DELETE /api/shoppingCard/:id
// @access  public
export const deleteShoppingCard = asyncHandler(async (req, res) => {
  const shoppingCard = await ShoppingCard.findById(req.params.id);

  if (shoppingCard) {
    await shoppingCard.remove();
    res.json({ message: 'Shopping card removed' });
  } else {
    res.status(404);
    throw new Error('Shopping card not found');
  }
});

// @desc    Update a shopping card
// @route   PUT /api/shoppingCard/:id
// @access  Public
export const updateShoppingCard = asyncHandler(async (req, res) => {
  const { price, discount, image, cardType, userType } = req.body;

  let validity = moment().add(30, 'days');

  const shoppingCard = await ShoppingCard.findById(req.params.id);

  if (shoppingCard) {
    shoppingCard.price = price;
    shoppingCard.discount = discount;
    shoppingCard.image = image;
    shoppingCard.cardType = cardType;
    shoppingCard.validity = validity;
    shoppingCard.userType = userType;

    const updatedCard = await shoppingCard.save();
    res.json(updatedCard);
  } else {
    res.status(404);
    throw new Error('Shopping card not found');
  }
});
