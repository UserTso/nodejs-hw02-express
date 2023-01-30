const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {validateBody, isValidId} = require('../../middlewares');

const {schemas} = require('../../models/contact');

const {ctrlWrapper} = require('../../helpers');


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.contactSchema), ctrlWrapper(ctrl.add));

router.put('/:contactId', isValidId, validateBody(schemas.contactSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));


module.exports = router;
