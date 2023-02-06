const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {validateBody, isValidId, authenticate} = require('../../middlewares');

const {schemas} = require('../../models/contact');

const {ctrlWrapper} = require('../../helpers');


router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(schemas.contactSchema), ctrlWrapper(ctrl.add));

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.contactSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById));


module.exports = router;
